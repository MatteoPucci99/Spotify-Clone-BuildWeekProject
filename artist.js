// RINTRACCIO LA ROW TARGET
const myRow = document.getElementById("mainRow");

fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=pop")
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Errore");
    }
  })
  .then((data) => {
    console.log("Search", data);
    generateCards(data);
  })
  .catch((err) => {
    console.log(err);
  });

// FUNCTION PER GENERARE LE CARDS
const generateCards = (album) => {
  album.data.forEach((el, index) => {
    if (index < 5) {
      const newCol = document.createElement("div");
      newCol.classList.add("col");
      newCol.innerHTML = `
    <div class="card h-100">
        <img src="${el.album.cover_big}" class="card-img-top" alt="img-${index}">
        <div class="card-body d-flex flex-column justify-content-between">
            <div>
            <h5 class="card-title"><a class="text-decoration-none text-white" href="#">${el.album.title}</a></h5>
            
            </div>
            <div>
            <p class="card-text"> <a class="text-white" href="#">${el.artist.name}</a></p>
            
            </div>
            
        </div>
    </div>
      `;
      myRow.appendChild(newCol);
    }
  });
};
