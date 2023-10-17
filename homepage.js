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
    if (index < 6) {
      const newCol = document.createElement("div");
      newCol.classList.add("col", "mt-5");
      newCol.innerHTML = `
    <div class="card h-100">
        <img src="${el.album.cover_big}" class="card-img-top" alt="img-${index}">
        <div class="card-body d-flex flex-column justify-content-between">
            <div>
            <h5 class="card-title"><a class="text-decoration-none text-white" href="/albumPage/album.html?albumId=${el.album.id}">${el.album.title}</a></h5>
            
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
const contentCol = document.getElementById("contentCol");

const closeFriendsPage = (e) => {
  // console.log(activityCol);
  activityCol.classList.add("d-none");
  contentCol.classList.remove("d-none", "d-md-none", "d-lg-block", "col-lg-8");
  contentCol.classList.add("col-lg-10");
};

const openFriendsPage = (e) => {
  // console.log(e.target);
  activityCol.classList.remove("d-none");
  contentCol.classList.remove("col-lg-10");
  contentCol.classList.add("d-none", "d-md-none", "d-lg-block", "col-lg-8");
};
