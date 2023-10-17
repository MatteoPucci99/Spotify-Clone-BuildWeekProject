// RINTRACCIO L'ID DALLA BARRA DI RICERCA
const addressBarContent = new URLSearchParams(location.search);
const albumId = addressBarContent.get("albumId");
console.log(albumId);

// RINTRACCIO L'ID DELLA MAIN ROW
const mainRow = document.getElementById("albumContent");
const secondRow = document.getElementById("secondContent");

// FUNCTION PER GENERARE ALBUM DETAILS
const generateDetails = (details) => {
  const detailsContent = document.createElement("div");
  secondRow.innerHTML = `
  <div class="d-flex justify-content-center mt-4">
    <img src="${details.cover_big}" alt="img" width="70%" />
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
};

// FUNCTION PER GENERARE LE TRACKS
const generateTracks = (tracks) => {
  tracks.tracks.data.forEach((el) => {
    let seconds = el.duration % 60;
    seconds = seconds.toString().padStart(2, "0");
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
         <p class="mb-0 d-none d-md-block">${el.rank}</p>
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
