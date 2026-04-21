const urlGenerale = "https://striveschool-api.herokuapp.com/api/deezer/"
const urlAlbum = "https://striveschool-api.herokuapp.com/api/deezer/album/"
const urlArtista = "https://striveschool-api.herokuapp.com/api/deezer/artist/"
const urlPlaylistLazza =
  "https://striveschool-api.herokuapp.com/api/deezer/artist/1288678/top?limit=50"
const urlPlaylistTheWeeknd =
  "https://striveschool-api.herokuapp.com/api/deezer/artist/4050205/top?limit=50"

// RIEMPO LA LIBRERIA
const libreria = () => {
  fetch(urlPlaylistLazza)
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error("problema nella response")
      }
    })
    .then((data) => {
      const spinner = document.querySelectorAll(".contenitore-spinner")
      spinner[0].classList.add("d-none")
      for (let i = 0; i < data.data.length; i++) {
        console.log("prova")
        const appendiAlbum = document.getElementById("appendi-album-libreria")
        appendiAlbum.innerHTML += `
        <a class="text-decoration-none text-light" href="albumView.html?id=${data.data[i].id}">
            <div class="d-flex my-2 align-items-center">
              <img
                src="${data.data[i].album.cover_small}"
                class="rounded-1 img-fluid"
              />
              <div class="ms-3 d-flex flex-column justify-content-center">
                <h6 class="mb-1">${data.data[i].album.title}</h6>
                <p class="mb-0">
                  ${data.data[i].album.type} &bull; ${data.data[i].artist.name}
                </p>
              </div>
            </div>
        </a>
      `
      }
    })
    .catch((err) => {
      console.log("errore durante la fetch", err)
    })
}
libreria()

// RIEMPO IL MAIN
const main8 = () => {
  fetch(urlPlaylistTheWeeknd)
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error("problema nella response")
      }
    })
    .then((data) => {
      console.log(data)

      const spinner = document.querySelectorAll(".contenitore-spinner")
      spinner[1].classList.add("d-none")
      for (let i = 0; i < 8; i++) {
        const appendiAlbum = document.getElementById("contenitore-main-prime-4")
        appendiAlbum.innerHTML += `
        <div class="col-6 col-xl-3 g-1">
        <a class="text-decoration-none text-light" href="albumView.html?id=${data.data[i].id}">
              <div
                class="d-flex align-items-center gap-1 bg-button rounded justify-content-between contenitore-card position-relative"
              >
                <div class="d-flex align-items-center gap-2">
                  <img
                    src="${data.data[i].album.cover_small}"
                    alt=""
                    class="img-fluid rounded-start"
                  />
                  <small class="">${data.data[i].album.title}</small>
                </div>
                </a>
                <a
                  class="btn btn-success flex mostra-al-passaggio rounded rounded-circle text-black shadow shadow-lg position-absolute end-0 m-1 px-1 py-0 d-flex"
                >
                  <i
                    class="bi bi-play-fill justify-content-center align-items-center"
                  ></i>
                </a>
              </div>
            </div>
        
      `
      }
    })
    .catch((err) => {
      console.log("errore durante la fetch", err)
    })
}
main8()

// CANZONE IN FASE DI RIPRODUZIONE
let canzoneInAscolto
