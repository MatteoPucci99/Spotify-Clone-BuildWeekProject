// RINTRACCIO L'ID DALLA BARRA DI RICERCA
const addressBarContent = new URLSearchParams(location.search);
const albumId = addressBarContent.get("albumId");
console.log(albumId);

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
  })
  .catch((err) => {
    console.log(err);
  });
