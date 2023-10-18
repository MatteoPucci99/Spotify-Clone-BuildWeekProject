const myForm = document.getElementById("ricerca");
const Input = document.getElementById("input");

myForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(Input.value);

  fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/search?q=${Input.value}`
  )
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
});
