// RINTRACCIO LA ROW TARGET
const myRow = document.getElementById("mainRow");

fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=hiphop")
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
    if (index < 12) {
      const newCol = document.createElement("div");
      newCol.classList.add("col", "my-2","p-1");
      newCol.innerHTML = `
    <div class="card h-100 border-0 p-2 bg-white-50" style="width:12rem;" >
        <img src="${el.album.cover_big}" class="card-img-top img-fluid" alt="img-${index}">
        <div class="card-body d-flex flex-column justify-content-between px-0">
            <div>
            <h6 class="card-title"><a class="text-decoration-none text-white" href="/albumPage/album.html?albumId=${el.album.id}">${el.album.title}</a></h6>
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

// RINTRACCIO LA COL TARGET
const activityCol = document.getElementById("activityCol");
const contentCol = document.getElementById("section");
const aside2 = document.getElementById('aside2')

const closeFriendsPage = (e) => {
  // console.log(activityCol);
  activityCol.classList.add("d-none");
  activityCol.classList.remove("new-width2");
  contentCol.classList.remove("new-width");
};

const openFriendsPage = (e) => {
  // console.log(e.target);
  activityCol.classList.remove("d-none");
  activityCol.classList.add("new-width2");
  contentCol.classList.add("new-width");
  aside2.classList.add('new-width2')
};
