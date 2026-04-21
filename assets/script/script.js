const urlGenerale = "https://striveschool-api.herokuapp.com/api/deezer/"
const urlAlbum = "https://striveschool-api.herokuapp.com/api/deezer/album/"
const urlArtista = "https://striveschool-api.herokuapp.com/api/deezer/artist/"
const urlSearch = "https://striveschool-api.herokuapp.com/api/deezer/search?q="
const urlPlaylistLazza =
  "https://striveschool-api.herokuapp.com/api/deezer/artist/1288678/top?limit=50"
const urlPlaylistTheWeeknd =
  "https://striveschool-api.herokuapp.com/api/deezer/artist/4050205/top?limit=50"

// RIEMPO LA LIBRERIA
const libreria = () => {
  fetch(urlSearch + "italia")
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
                  ${data.data[i].album.type} &bull; <a class="text-decoration-none text-light" href="artistView.html?id=${data.data[i].artist.id}"> ${data.data[i].artist.name}</a>
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
  fetch(urlSearch + "The weeknd")
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
                  <small class="">${data.data[i].title}</small>
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

// RIEMPO PRIMO CAROSELLO
const primoCarosello = () => {
  fetch(urlSearch + "american rap")
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error("errore nella response")
      }
    })
    .then((data) => {
      console.log(data)

      for (let i = 0; i < 12; i++) {
        const primoCarosello = document.querySelectorAll(".carosello-1")
        primoCarosello[i].innerHTML = `
        <a class="text-decoration-none text-light" href="albumView.html?id=${data.data[i].id}">
        <div class="position-relative">
                        <img
                          src="${data.data[i].album.cover_medium}"
                          class="d-block w-100"
                          alt="..."
                        />
                        <a
                          class="btn btn-success flex mostra-al-passaggio rounded rounded-circle text-black shadow shadow-lg position-absolute end-0 bottom-0 m-1 px-1 py-0 d-flex"
                        >
                          <i
                            class="bi bi-play-fill justify-content-center align-items-center"
                          ></i>
                        </a>
                      </div>
                      <p class="text-center">${data.data[i].title}</p>
        `
      }
    })
    .catch((err) => {
      console.log("errore nella fetch", err)
    })
}
primoCarosello()

// RIEMPO SECONDO CAROSELLO
const secondoCarosello = () => {
  fetch(urlSearch + "italian trap")
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error("errore nella response")
      }
    })
    .then((data) => {
      for (let i = 0; i < 12; i++) {
        const secondoCarosello = document.querySelectorAll(".carosello-2")
        secondoCarosello[i].innerHTML = `
        <a class="text-decoration-none text-light" href="albumView.html?id=${data.data[i].id}">
        <div class="position-relative">
                        <img
                          src="${data.data[i].album.cover_medium}"
                          class="d-block w-100"
                          alt="..."
                        />
                        <a
                          class="btn btn-success flex mostra-al-passaggio rounded rounded-circle text-black shadow shadow-lg position-absolute end-0 bottom-0 m-1 px-1 py-0 d-flex"
                        >
                          <i
                            class="bi bi-play-fill justify-content-center align-items-center"
                          ></i>
                        </a>
                      </div>
                      <p class="text-center">${data.data[i].title}</p>
        `
      }
    })
    .catch((err) => {
      console.log("errore nella fetch", err)
    })
}
secondoCarosello()

// RIEMPO TERZO CAROSELLO
const terzoCarosello = () => {
  fetch(urlSearch + "party")
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error("errore nella response")
      }
    })
    .then((data) => {
      for (let i = 0; i < 12; i++) {
        const terzoCarosello = document.querySelectorAll(".carosello-3")
        terzoCarosello[i].innerHTML = `
        <a class="text-decoration-none text-light" href="albumView.html?id=${data.data[i].id}">
        <div class="position-relative">
                        <img
                          src="${data.data[i].album.cover_medium}"
                          class="d-block w-100"
                          alt="..."
                        />
                        <a
                          class="btn btn-success flex mostra-al-passaggio rounded rounded-circle text-black shadow shadow-lg position-absolute end-0 bottom-0 m-1 px-1 py-0 d-flex"
                        >
                          <i
                            class="bi bi-play-fill justify-content-center align-items-center"
                          ></i>
                        </a>
                      </div>
                      <p class="text-center">${data.data[i].title}</p>
        `
      }
    })
    .catch((err) => {
      console.log("errore nella fetch", err)
    })
}
terzoCarosello()
