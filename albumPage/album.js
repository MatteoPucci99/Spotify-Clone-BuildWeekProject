// RINTRACCIO L'ID DALLA BARRA DI RICERCA
const addressBarContent = new URLSearchParams(location.search);
const albumId = addressBarContent.get("albumId");
console.log(albumId);

// RINTRACCIO L'ID DELLA MAIN ROW
const mainRow = document.getElementById("albumContent");
const secondRow = document.getElementById("secondContent");

// Funzione per calcolare il colore medio di un'immagine
const calculateAverageColorFromImage = (image) => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  // Imposta le dimensioni del canvas come le dimensioni dell'immagine
  canvas.width = image.width;
  canvas.height = image.height;

  // Disegna l'immagine sul canvas
  context.drawImage(image, 0, 0, image.width, image.height);

  // Ottieni i dati dell'immagine
  const imageData = context.getImageData(0, 0, image.width, image.height).data;

  // Calcola il colore medio
  const averageColor = calculateAverageColor(imageData);

  return averageColor;
};

// Funzione per calcolare il colore medio da un array di dati dell'immagine
const calculateAverageColor = (imageData) => {
  let sumRed = 0;
  let sumGreen = 0;
  let sumBlue = 0;
  const pixelCount = imageData.length / 4; // Ogni pixel ha 4 componenti: R, G, B, A

  for (let i = 0; i < imageData.length; i += 4) {
    sumRed += imageData[i];
    sumGreen += imageData[i + 1];
    sumBlue += imageData[i + 2];
  }

  const averageRed = Math.round(sumRed / pixelCount);
  const averageGreen = Math.round(sumGreen / pixelCount);
  const averageBlue = Math.round(sumBlue / pixelCount);

  return [averageRed, averageGreen, averageBlue];
};

// FUNCTION PER GENERARE ALBUM DETAILS
const generateDetails = (details) => {
  secondRow.innerHTML = `
  <div class="d-flex justify-content-center mt-4">
    <img src="${
      details.cover_big
    }" crossorigin="anonymous" alt="img" width="70%" id="myImg"/>
  </div>
  <div class="d-flex flex-column justify-content-end">
    <h1 class="mt-4 fs-md-4">${details.title}</h1>
    <div class="d-flex align-items-center">
      <img
        src="${details.artist.picture_big}"
        width="10%"
        class="rounded-5 me-2"
        alt="img"
      
      <p class="ms-2 mb-0 d-flex align-items-center">${details.artist.name}</p>
      <p class="ms-2 mb-0 d-flex align-items-center">${
        details.tracks.data.length
      } brani</p>
      <p class="ms-2 mb-0 d-flex align-items-center">${Math.floor(
        details.duration / 60
      )}:${details.duration % 60} </p>
    </div>
  </div>
  `;
  const myImg = document.getElementById("myImg");
  console.log(myImg);
  const bgTarget = document.getElementById("bgTarget");
  myImg.onload = function () {
    // Quando l'immagine è caricata, calcola il colore medio
    const averageColor = calculateAverageColorFromImage(myImg);
    console.log("Colore Medio:", averageColor);

    // bgTarget.style.background = `linear-gradient(to bottom, ${averageColor}, rgb(33,37,41))`;
    bgTarget.style.background = `linear-gradient(to bottom, rgb(${averageColor[0]},${averageColor[1]},${averageColor[2]}) calc(-30% + 0px), rgb(33,37,41))`;
    console.log(bgTarget);
  };

  const bgContent = document.getElementById("bgContent");
  bgContent.style.backgroundColor = "rgba(0,0,0, 0.2)";

  const currentHeight = bgTarget.offsetHeight;
  if (currentHeight < window.innerHeight) {
    bgTarget.style.height = "100vh";
  }
};

// FUNCTION PER GENERARE LE TRACKS
const generateTracks = (tracks) => {
  tracks.tracks.data.forEach((el) => {
    let seconds = el.duration % 60;
    seconds = seconds.toString().padStart(2, "0");
    const options = {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    };

    const content = document.createElement("div");
    content.classList.add("d-flex", "align-items-center");
    content.innerHTML = `
    <div class="col col-md-8 d-flex justify-content-between">
       <div>
         <h6 class="mb-0">${el.title}</h6>
         <p class='text-secondary'>${el.artist.name}</p>
       </div>
       <div class="d-flex align-items-center">
         <i
           style="font-size: 1.5em"
           class="bi bi-three-dots-vertical d-md-none"
         ></i>
         <p class="mb-0 d-none d-md-block">${el.rank.toLocaleString(
           "it-IT",
           options
         )}</p>
       </div>
      </div>
       <div class="col d-flex justify-content-end d-none d-md-flex">
          <p class="mb-0 d-none d-md-block">${Math.floor(
            el.duration / 60
          )}:${seconds}</p>
        </div>
    `;
    mainRow.appendChild(content);
  });
};

fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`)
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Errore");
    }
  })
  .then((data) => {
    console.log("Tracks", data);
    generateTracks(data);
    generateDetails(data);
  })
  .catch((err) => {
    console.log(err);
  });
