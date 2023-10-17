// RINTRACCIO L'ID DALLA BARRA DI RICERCA
const addressBarContent = new URLSearchParams(location.search);
const albumId = addressBarContent.get("albumId");
console.log(albumId);

// RINTRACCIO L'ID DELLA MAIN ROW
const mainRow = document.getElementById("albumContent");

// FUNCTION PER GENERARE LE TRACKS
const generateTracks = (tracks) => {
  tracks.tracks.data.forEach((el) => {
    const content = document.createElement("div");
    content.classList.add("d-flex", "align-items-center");
    content.innerHTML = `
    <div class="col col-md-8 d-flex justify-content-between">
       <div>
         <h3 class="mb-0">${el.title}</h3>
         <p>${el.artist.name}</p>
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
          <p class="mb-0 d-none d-md-block">${el.duration / 60}</p>
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
  })
  .catch((err) => {
    console.log(err);
  });
