const urlGenerale = "https://striveschool-api.herokuapp.com/api/deezer/"
const urlAlbum = "https://striveschool-api.herokuapp.com/api/deezer/album/"
const urlArtista = "https://striveschool-api.herokuapp.com/api/deezer/artist/"
const urlSearch = "https://striveschool-api.herokuapp.com/api/deezer/search?q="
const urlPlaylistLazza =
  "https://striveschool-api.herokuapp.com/api/deezer/artist/1288678/top?limit=50"
const urlPlaylistTheWeeknd =
  "https://striveschool-api.herokuapp.com/api/deezer/artist/4050205/top?limit=50"
const searchInput = document.getElementById("searchInput")
const searchResults = document.getElementById("searchResults")

// trovo l'id dall'indirizzo web
const parametri = new URLSearchParams(location.search)
const idArtista = parametri.get("id")

// assegno all'api la chiamata utilizzando dinamicamente l'id dell indirizzo
let urlApiArtista =
  "https://striveschool-api.herokuapp.com/api/deezer/artist/" + idArtista

fetch(urlApiArtista)
  .then((response) => {
    if (response.ok) {
      return response.json()
    } else throw new Error("errore nella fetch")
  })
  .then((artista) => {
    // cambiamo l'immagine del placeholder
    const stories = document.querySelector("#artistStories")
    if (stories) {
      stories.setAttribute("src", artista.picture_small)
    }
    // cambiamo il testo delle sezioni artista e numero ascoltatori
    const nomeArtista = document.getElementById("nome-artista")
    nomeArtista.innerText = artista.name
    nomeArtista.classList.add("text-shadow")

    const nFan = document.getElementById("fan-artista")
    nFan.innerText = artista.nb_fan.toLocaleString()

    // cambiamo l'immagine del banner
    const banner = document.getElementById("artist-banner")
    banner.style.backgroundImage = "url('" + artista.picture_xl + "')"
    banner.style.backgroundSize = "cover"
    banner.style.backgroundPosition = "center"
    banner.style.backgroundRepeat = "no-repeat"
    //Inserisco la parte per il colore dinamico
    coloraSfondoDinamico(artista.picture_xl, ".bg-linear")
    // cambiamo le canzoni (tracklist)
    fetch(artista.tracklist)
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else throw new Error("errore nella fetch")
      })
      .then((datiCanzoni) => {
        console.log("dddd", datiCanzoni)
        const canzoni = datiCanzoni.data
        const contenitore = document.getElementById("lista-canzoni")
        // Puliamo il contenitore prima di iniziare il ciclo
        contenitore.innerHTML = ""
        // Inizio un ciclo for per inserire le prime canzoni
        for (let i = 0; i < 10 && i < canzoni.length; i++) {
          const traccia = canzoni[i]
          // Calcolo minuti e secondi
          const minuti = Math.floor(traccia.duration / 60)
          const secondi = (traccia.duration % 60).toString().padStart(2, "0")
          const explicit = traccia.explicit_lyrics ? "" : "d-none"

          const featuring =
            traccia.contributors.length > 1
              ? traccia.contributors
                  .slice(1)
                  .map((c) => c.name)
                  .join(", ")
              : ""

          const feat = traccia.contributors.slice(1)
          const dropdown =
            feat.length > 0
              ? `
                <li class="dropdown-submenu position-relative">
                  <a class="dropdown-item d-flex justify-content-between align-items-center" href="#">
                    <span>
                      <i class="bi bi-person-lines-fill text-secondary me-2"></i>
                      Vai all'artista
                    </span>
                    <i class="bi bi-caret-right-fill small"></i>
                  </a>

                  <ul class="dropdown-menu">
                    ${feat
                      .map(
                        (c) => `
                      <li>
                        <a class="dropdown-item" href="./artistView.html?id=${c.id}">
                          ${c.name}
                        </a>
                      </li>
                    `,
                      )
                      .join("")}
                  </ul>
                </li>
              `
              : ``

          const rigaHTML = `

              <div class="row mt-3 align-items-center px-4 riga">
                <div class="col-1 cella">
                  <span class="numero-cella">${i + 1}</span>
                    <i 



                     onclick="riproduciCanzone(this, \`${datiCanzoni.data[i].preview}\`, \`${datiCanzoni.data[i].title}\`, \`${datiCanzoni.data[i].artist.name}\`, \`${datiCanzoni.data[i].album.cover_small}\`, \`${datiCanzoni.data[i].album.cover_big}\`, \`${datiCanzoni.data[i].artist.picture_big}\`, \`${datiCanzoni.data[i].artist.id}\`, \`${datiCanzoni.data[i].artist.tracklist}\`, \`${datiCanzoni.data[i].explicit_lyrics}\`, \`${datiCanzoni.data[i].duration}\`, \`${datiCanzoni.data[i].id}\`, \`${datiCanzoni.id}\`)"
                     class="fas fa-play text-light icona fs-4"></i>
                </div>
                <div class="col-1">
                  <img
                        class="w-75"
                        src="${datiCanzoni.data[i].album.cover_big}"
                        alt="foto album"
                        crossorigin="anonymous"
                      />
                </div>
                <div class="col">
                  <p class="m-0">
                    ${traccia.title}
                    ${featuring ? `<span>(feat. ${featuring})</span>` : ""}
                  </p>
                  <div class="d-flex align-items-center">
                    <i class="bi bi-explicit-fill me-1 ${explicit}"></i>
                    <span class="small ">
                      <i class="bi bi-play-btn"></i>
                      Video musicale
                    </span>
                  </div>
                </div>
                <div class="col-2">
                  <div class="col-auto d-none d-md-block text-secondary">
                    ${traccia.rank.toLocaleString()}
                  </div>
                </div>
                <div class="col-1 text-end">
                  <i class="bi bi-plus-circle icona fs-4"
                  onclick="salvaCanzone(this, \`${traccia.preview}\`, \`${traccia.title}\`, \`${traccia.artist.name}\`, \`${datiCanzoni.data[i].album.cover_small}\`, \`${datiCanzoni.data[i].album.cover_big}\`, \`${traccia.artist.picture_big}\`, \`${traccia.artist.id}\`, \`${traccia.artist.tracklist}\`, \`${traccia.explicit_lyrics}\`, \`${traccia.duration}\`, \`${traccia.album.id}\`)"
                  ></i>
                </div>
                <div class="col-1 text-center">
                  <p class="m-0">${minuti}:${secondi}</p>
                </div>
                <div class="col-1 text-end dropdown">
                  <a class="btn bg-transparent" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="bi bi-three-dots text-ligth icona fs-4"></i>
                  </a>

                  <ul class="dropdown-menu">

                   

                    


                    <li><a class="dropdown-item" href="./albumView.html?id=${traccia.album.id}"><i class="bi bi-vinyl-fill text-secondary  me-2"></i> Vai all'album</a></li>
                  </ul>
                </div>
              </div>
          `
          // Aggiungiamo la riga al contenitore
          contenitore.innerHTML += rigaHTML
        }
        preferitiEsistenti()
        // Attivo all'icona Play la riproduzione della prima canzone
        // RECUPERIAMO IL PLAYER AUDIO
        const inputAudio = document.querySelector("audio")
        // Attivo all'icona Play la riproduzione della prima canzone
        const primaCanzone = canzoni[0]
        const iconaPlay = document.querySelector(".bi-play-circle-fill")

        iconaPlay.onclick = function () {
          // Eseguiamo la funzione per far partire le canzoni
          riproduciCanzone(
            this,
            primaCanzone.preview,
            primaCanzone.title,
            primaCanzone.artist.name,
            primaCanzone.album.cover_small,
            primaCanzone.album.cover_big,
            primaCanzone.artist.picture_big,
            primaCanzone.artist.id,
            primaCanzone.artist.tracklist,
          )

          // Gestiamo il cambio icona dopo un delay
          setTimeout(() => {
            if (inputAudio.paused) {
              this.classList.remove("bi-pause-circle-fill")
              this.classList.add("bi-play-circle-fill")
            } else {
              this.classList.remove("bi-play-circle-fill")
              this.classList.add("bi-pause-circle-fill")
            }
          }, 100)
        }
      })
      .catch((error) => console.log("Errore connessione server", error))
  })

// RIEMPO LA LIBRERIA

// RIEMPO LA LIBRERIA

const aggiornaLibreria = () => {
  const spinner = document.querySelectorAll(".contenitore-spinner")
  spinner[0].classList.add("d-none")
  const appendiAlbum = document.getElementById("appendi-album-libreria")

  const libreria = JSON.parse(localStorage.getItem("libreria")) || []
  libreria.forEach((album) => {
    appendiAlbum.innerHTML += `
         <a class="text-decoration-none text-light" href="albumView.html?id=${album.idAlbum}">
             <div class="d-flex my-2 align-items-center">
               <img
                 src="${album.coverSmall}"
                 class="rounded-1 img-fluid"
               />
               <div class="ms-3 d-flex flex-column justify-content-center">
                 <h6 class="mb-1 ">${album.titolo}</h6>
                 <p class="mb-0">
                   ${album.tipo} &bull; <a class="text-decoration-none text-light" href="artistView.html?id=${album.idArtista}"> ${album.nomeArtista}</a>
                 </p>
               </div>
             </div>
         </a>
       `
  })
}
aggiornaLibreria()

// FUNZIONE ricerca

const performSearch = (query) => {
  if (query.length < 2) {
    searchResults.style.display = "none" // se il risultato ricerca è minore di 2 elementi avrà display none
    return
  }

  fetch(urlSearch + query)
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error("Errore nella chiamata")
      }
    })
    .then((data) => {
      renderDropdownResult(data.data)
    })
    .catch((error) => {
      console.log("Errore server", error)
    })
}

searchInput.addEventListener("input", (e) => performSearch(e.target.value))

const renderDropdownResult = (songs) => {
  searchResults.innerHTML = ""
  searchResults.style.display = "block"

  // Creo una lista verticale
  const listContainer = document.createElement("div")
  listContainer.className = "d-flex flex-column"

  songs.slice(0, 10).forEach((song) => {
    const item = document.createElement("div")
    item.className =
      "d-flex align-items-center p-2 song-card-container border-bottom border-secondary border-opacity-25 item-canzone"
    item.style.cursor = "pointer"

    item.innerHTML = `
    <div class="position-relative me-3" style="width: 50px; height: 50px; flex-shrink: 0;">
      <img src="${song.album.cover_small}" class="img-fluid rounded shadow-sm" alt="${song.title}">
      <div class="mostra-al-passaggio position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center rounded" 
           style="background: rgba(0,0,0,0.5)" 
            onclick="riproduciCanzone(this, \`${song.preview}\`, \`${song.title}\`, \`${song.artist.name}\`, \`${song.album.cover_small}\`, \`${song.album.cover_big}\`, \`${song.artist.picture_big}\`, \`${song.artist.id}\`, \`${song.artist.tracklist}\`, \`${song.explicit_lyrics}\`), \`${song.duration}\`, \`${song.id}\`, \`${song.album.id}\`"
           data-id="${song.id}">
          <i class="fas fa-play text-white fs-6"></i>
      </div>
    </div>
    <div class="flex-grow-1 text-truncate">
      <p class="mb-0 text-white fw-bold text-truncate titolo-canzone" style="font-size: 0.9rem;">${song.title}</p>
      <p class="mb-0 text-secondary text-truncate" style="font-size: 0.8rem;">${song.artist.name}</p>
    </div>
    <div class="music-animation me-2">
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
    </div>
    <div class="text-secondary small ms-2">
      ${Math.floor(song.duration / 60)}:${(song.duration % 60).toString().padStart(2, "0")}
    </div>
    `

    item.addEventListener("click", () => {
      // loadSong(song)
      searchResults.style.display = "none"
      searchInput.value = ""
    })

    listContainer.appendChild(item)
  })

  searchResults.appendChild(listContainer)
}

const riproduciCanzone = (
  iconaPlay,
  audioCanzone,
  titolo,
  nomeArtista,
  copertinaSmall,
  copertinaBig,
  fotoArtista,
  linkArtista,
  tracklist,
) => {
  const bottonePlay = document.getElementById("btn-play-canzone")
  // if (!bottonePlay) return; // Se il bottone non esiste, non provare a cambiargli classe
  const inputAudio = document.getElementById("audio")
  const playBtn = document.getElementById("playPauseBtn")

  if (inputAudio.src === audioCanzone) {
    if (inputAudio.paused) {
      inputAudio.play()
      iconaPlay.classList.replace("fa-play", "fa-pause")
      playBtn.classList.replace("bi-play-circle-fill", "bi-pause-circle-fill")
    } else {
      inputAudio.pause()
      iconaPlay.classList.replace("fa-pause", "fa-play")
      playBtn.classList.replace("bi-pause-circle-fill", "bi-play-circle-fill")
    }
  } else {
    inputAudio.src = audioCanzone
    inputAudio.play()
    iconaPlay.classList.replace("fa-play", "fa-pause")
    playBtn.classList.replace("bi-play-circle-fill", "bi-pause-circle-fill")
  }

  const placeholder = document.querySelectorAll(".placeholder")
  console.log(placeholder)
  for (let i = 0; i < placeholder.length; i++) {
    placeholder[i].classList.remove("placeholder")
    console.log(placeholder[i])
  }

  // RIEMPO BARRA FOOTER CON CNZONE IN RIPRODUZIONE
  const titoloCanzone = document.querySelectorAll(".titolo-barra-dx")
  const copertinaPiccola = document.querySelectorAll(
    ".copertina-small-barra-dx",
  )
  const copertinaGrande = document.querySelectorAll(".copertina-big-barra-dx")
  const nome = document.querySelectorAll(".autore-barra-dx")
  const fotoProfiloArtista = document.getElementById("foto-artista")
  const ascoltatoriMensili = document.querySelector(".ascoltatori")
  console.log(
    "cdf",
    titoloCanzone,
    copertinaPiccola,
    copertinaGrande,
    nome,
    fotoProfiloArtista,
    ascoltatoriMensili,
    fotoArtista,
  )

  for (let i = 0; i < nome.length; i++) {
    nome[i].innerHTML = `${nomeArtista}`
  }
  for (let i = 0; i < titoloCanzone.length; i++) {
    titoloCanzone[i].innerHTML = `${titolo}`
  }
  for (let i = 0; i < copertinaPiccola.length; i++) {
    copertinaPiccola[i].setAttribute("src", copertinaSmall)
  }
  for (let i = 0; i < copertinaGrande.length; i++) {
    copertinaGrande[i].setAttribute("src", copertinaBig)
  }

  fetch(urlArtista + linkArtista)
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error("errore nella response")
      }
    })
    .then((data) => {
      console.log("22", data)
      ascoltatoriMensili.innerHTML = `${data.nb_fan.toLocaleString()}`
      fotoProfiloArtista.setAttribute("src", data.picture_big)
    })
    .catch((err) => {
      console.log("errore nella fetch", err)
    })

  fetch(
    "https://striveschool-api.herokuapp.com/api/deezer/artist/" +
      linkArtista +
      "/top?limit=50",
  )
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error("errore nella response")
      }
    })
    .then((data) => {
      console.log("prova45", data)
      const caroselloCorrelati = document.querySelector(".carosello-correlati")

      caroselloCorrelati.innerHTML = `
      <div class="carousel-inner">
              <div class="carousel-item active">
                <!-- PRIMA SLIDE CAROSELLO -->
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-6 ps-0">
                      <img
                        width="100%"
                        src="${data.data[10].album.cover_medium}"
                        alt="foto album"
                        crossorigin="anonymous"

                      />
                      <!-- TITOLO CANZONE IN ASCOLTO -->
                      <h6 class="fw-bold m-0">${data.data[10].title}</h6>
                      <!-- ARTISTA -->
                      <p class="text-secondary m-0">${data.data[10].artist.name}</p>
                    </div>
                    <div class="col-6 pe-0">
                      <img
                        width="100%"
                        src="${data.data[11].album.cover_medium}"
                        alt="foto album"
                        crossorigin="anonymous"
                      />
                      <!-- TITOLO CANZONE IN ASCOLTO -->
                      <h6 class="fw-bold m-0">${data.data[11].title}</h6>
                      <!-- ARTISTA -->
                      <p class="text-secondary m-0">${data.data[11].artist.name}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="carousel-item">
                <!-- SECONDA SLIDE CAROSELLO -->
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-6 ps-0">
                      <img
                        width="100%"
                        src="${data.data[14].album.cover_medium}"
                        alt="foto album"
                        crossorigin="anonymous"
                      />
                      <!-- TITOLO CANZONE IN ASCOLTO -->
                      <h6 class="fw-bold m-0">${data.data[14].title}</h6>
                      <!-- ARTISTA -->
                      <p class="text-secondary m-0">${data.data[14].artist.name}</p>
                    </div>
                    <div class="col-6 pe-0">
                      <img
                        width="100%"
                        src="${data.data[17].album.cover_medium}"
                        alt="foto album"
                        crossorigin="anonymous"
                      />
                      <!-- TITOLO CANZONE IN ASCOLTO -->
                      <h6 class="fw-bold m-0">${data.data[17].title}</h6>
                      <!-- ARTISTA -->
                      <p class="text-secondary m-0">${data.data[17].artist.name}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="carousel-item">
                <!-- TERZA SLIDE CAROSELLO -->
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-6 ps-0">
                      <img
                        width="100%"
                        src="${data.data[15].album.cover_medium}"
                        alt="foto album"
                        crossorigin="anonymous"
                      />
                      <!-- TITOLO CANZONE IN ASCOLTO -->
                      <h6 class="fw-bold m-0">${data.data[15].title}</h6>
                      <!-- ARTISTA -->
                      <p class="text-secondary m-0">${data.data[15].artist.name}</p>
                    </div>
                    <div class="col-6 pe-0">
                      <img
                        width="100%"
                        src="${data.data[9].album.cover_medium}"
                        alt="foto album"
                        crossorigin="anonymous"
                      />
                      <!-- TITOLO CANZONE IN ASCOLTO -->
                      <h6 class="fw-bold m-0">${data.data[9].title}</h6>
                      <!-- ARTISTA -->
                      <p class="text-secondary m-0">${data.data[9].artist.name}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
      `
    })
    .catch((err) => {
      console.log("errore nella fetch", err)
    })
}
// const musicaAlClick = function (
//   elementoCliccato,
//   preview,
//   titolo,
//   artista,
//   copertinaSmall,
//   copertinaBig,
//   fotoArtista,
//   linkArtista,
//   tracklist,
// ) {
//   const audio = document.getElementById("audio")
//   const rigaCanzone = elementoCliccato.closest(".item-canzone")
//   const icona = elementoCliccato.querySelector("i")

//   // SE LA CANZONE È LA STESSA CHE STA GIÀ SUONANDO
//   if (audio.src === preview) {
//     if (!audio.paused) {
//       audio.pause()
//       rigaCanzone.classList.remove("suonando")
//       icona.classList.replace("fa-pause", "fa-play") // Torna Play
//       aggiornaBottoniFooter(false)
//     } else {
//       audio.play()
//       rigaCanzone.classList.add("suonando")
//       icona.classList.replace("fa-play", "fa-pause") // Diventa Pausa
//       aggiornaBottoniFooter(true)
//     }
//   } else {
//     // SE È UNA CANZONE NUOVA
//     // Togliamo "suonando" e mettiamo l'icona Play a tutte le altre righe
//     document.querySelectorAll(".item-canzone").forEach((riga) => {
//       riga.classList.remove("suonando")
//       const i = riga.querySelector("i")
//       if (i) i.classList.replace("fa-pause", "fa-play")
//     })

//     // Mettiamo Pausa alla canzone appena cliccata
//     rigaCanzone.classList.add("suonando")
//     icona.classList.replace("fa-play", "fa-pause")

//     // Facciamo partire la musica
//     riproduciCanzone(
//       preview,
//       titolo,
//       artista,
//       copertinaSmall,
//       copertinaBig,
//       fotoArtista,
//       linkArtista,
//       tracklist,
//     )
//   }
// }

// const aggiornaBottoniFooter = (isPlaying) => {
//   const playBtnFooter = document.getElementById("playPauseBtn") // Il bottone tondo al centro

//   if (isPlaying) {
//     playBtnFooter.classList.replace(
//       "bi-play-circle-fill",
//       "bi-pause-circle-fill",
//     )
//   } else {
//     playBtnFooter.classList.replace(
//       "bi-pause-circle-fill",
//       "bi-play-circle-fill",
//     )
//   }
// }

// Funzione per attivare gli sfondi dinamici
const attivaSensoreSfondo = function () {
  const mainSection = document.getElementById("main-section")
  const contenitoreCards = document.getElementById("contenitore-main-prime-4")

  if (contenitoreCards && mainSection) {
    // Rimuoviamo eventuali vecchi ascoltatori per non duplicarli
    contenitoreCards.onclick = null

    contenitoreCards.addEventListener("mouseover", (e) => {
      const card = e.target.closest(".contenitore-card")
      if (card) {
        const colore = card.getAttribute("data-color")
        if (colore) {
          mainSection.style.background = `linear-gradient(${colore}, #121212 50%)`
        }
      }
    })

    contenitoreCards.addEventListener("mouseleave", () => {
      mainSection.style.background =
        "linear-gradient(rgba(255, 255, 255, 0.1), #121212 50%)"
    })
  }
}

//Parte per sfondo dinamico in artistpage
const coloraSfondoDinamico = function (urlImmagine, selettoreTarget) {
  const thief = new ColorThief()
  const img = new Image()

  // Chiediamo il permesso ufficiale
  img.crossOrigin = "Anonymous"

  // Aggiungiamo un "trucchetto" all'URL per evitare che il browser usi una versione vecchia e bloccata
  img.src = urlImmagine + "?not-from-cache-please"

  img.addEventListener("load", function () {
    try {
      const rgb = thief.getColor(img)
      const colore = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.7)`
      const target = document.querySelector(selettoreTarget)

      if (target) {
        // Applico il colore sfumandolo verso il nero
        target.style.background = `linear-gradient(to bottom, ${colore} 0%, #121212 15%)`
        console.log("Colore applicato con successo!")
      }
    } catch (error) {
      console.error("Il guardiano ha bloccato questa immagine:", error)
      // Colore di default nero
      document.querySelector(selettoreTarget).style.background = "#222"
    }
  })
}

// PARTE audio
// Progress bar traccia audio----------------------------------------------------------------------------------

const audio = document.getElementById("audio")
const progressBar = document.getElementById("progress-bar")
const currentTimeEl = document.getElementById("time-now")
const durationEl = document.getElementById("time-max")
const playBtn = document.getElementById("playPauseBtn")
const mute = document.getElementById("mute")
const volumeSlider = document.getElementById("volumeSlider")

let lastVolume = 0.2
let barColore = "#ffffff"
let volumeBarColor = "#ffffff"

const coloredBars = (bar, color = "#1db954") => {
  const value = Number(bar.value)
  bar.style.background = `linear-gradient(to right, ${color} ${value}%, #4d4d4d ${value}%)`
}

// Calcolo tempo traccia

audio.addEventListener("timeupdate", () => {
  if (!isNaN(audio.duration)) {
    const percentage = (audio.currentTime / audio.duration) * 100
    progressBar.value = percentage
    currentTimeEl.innerText = formatTime(audio.currentTime)
    coloredBars(progressBar, barColore)
  }
})

progressBar.addEventListener("input", () => {
  audio.currentTime = (progressBar.value / 100) * audio.duration
  coloredBars(progressBar, barColore)
})

// Hover traccia

progressBar.addEventListener("mouseenter", () => {
  barColore = "#1db954"
  coloredBars(progressBar, barColore)
})

progressBar.addEventListener("mouseleave", () => {
  barColore = "#ffffff"
  coloredBars(progressBar, barColore)
})

const formatTime = (time) => {
  const min = Math.floor(time / 60)
  const sec = Math.floor(time % 60)
  return `${min}:${sec < 10 ? "0" : ""}${sec}`
}

audio.addEventListener("loadedmetadata", () => {
  durationEl.innerText = formatTime(audio.duration)
})

// Play e pausa------------------------------------------------------------------------------------------------

const playPause = () => {
  if (audio.paused) {
    audio.play()
    playBtn.classList.replace("bi-play-circle-fill", "bi-pause-circle-fill")
  } else {
    audio.pause()
    playBtn.classList.replace("bi-pause-circle-fill", "bi-play-circle-fill")
  }
}

playBtn.addEventListener("click", playPause)

// Slider musica------------------------------------------------------------------------------------------------

const updateBar = () => {
  const percentage = (audio.currentTime / audio.duration) * 100
  progressBar.style.background = `linear-gradient(to right, ${barColore} ${percentage}%, #4d4d4d ${percentage}%)`
}

audio.addEventListener("timeupdate", () => {
  if (!isNaN(audio.duration)) {
    const percentage = (audio.currentTime / audio.duration) * 100
    progressBar.value = percentage
    currentTimeEl.innerText = formatTime(audio.currentTime)
    updateBar()
  }
})

// Mute function volume-----------------------------------------------------------------------------------------

const muteIcon = (muted) => {
  const iconMute = document.getElementById("mute")
  if (muted) {
    iconMute.classList.replace("bi-volume-up", "bi-volume-mute")
  } else {
    iconMute.classList.replace("bi-volume-mute", "bi-volume-up")
  }
}

mute.addEventListener("click", () => {
  //funzione per mutare e smutare l'audio tenendo in memoria l'ultimo valore dell'audio
  if (audio.volume > 0) {
    lastVolume = audio.volume
    audio.volume = 0
    volumeSlider.value = 0
    muteIcon(true)
  } else {
    if (!lastVolume || lastVolume === 0) lastVolume = 0.5
    audio.volume = lastVolume
    volumeSlider.value = lastVolume * 100
    muteIcon(false)
  }
  coloredBars(volumeSlider, volumeBarColor)
})

// Slider volume------------------------------------------------------------------------------------------------

volumeSlider.addEventListener("input", (e) => {
  const value = e.target.value
  audio.volume = value / 100
  coloredBars(volumeSlider, volumeBarColor)
  muteIcon(audio.volume === 0)
})

// Hover slider volume

volumeSlider.addEventListener("mouseenter", () => {
  volumeBarColor = "#1db954"
  coloredBars(volumeSlider, volumeBarColor)
})

volumeSlider.addEventListener("mouseleave", () => {
  volumeBarColor = "#ffffff"
  coloredBars(volumeSlider, volumeBarColor)
})

mute.addEventListener("mouseenter", () => {
  volumeBarColor = "#1db954"
  coloredBars(volumeSlider, volumeBarColor)
})

mute.addEventListener("mouseleave", () => {
  volumeBarColor = "#ffffff"
  coloredBars(volumeSlider, volumeBarColor)
})

// Caricamenti iniziali
coloredBars(volumeSlider, "#ffffff")
coloredBars(progressBar, "#ffffff")
muteIcon(false)
audio.volume = 0.2
volumeSlider.value = 20

// Funzione full-screen

const fsBtn = document.querySelector("#screenMode")

fsBtn.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch((err) => {
      console.error(`Errore: ${err.message}`)
    })
  } else {
    document.exitFullscreen()
  }
})

document.addEventListener("fullscreenchange", () => {
  if (document.fullscreenElement) {
    fsBtn.classList.replace("bi-fullscreen", "bi-fullscreen-exit")
  } else {
    fsBtn.classList.replace("bi-fullscreen-exit", "bi-fullscreen")
  }
})

// FUNZIONE AGGIUNGI AI PREFERITI
let braniPreferiti = JSON.parse(localStorage.getItem("brano-preferito")) || []

// FUNZIONE AGGIUNGI AI PREFERITI
const salvaCanzone = (
  icona,
  audioCanzone,
  titolo,
  nomeArtista,
  copertinaSmall,
  copertinaBig,
  fotoArtista,
  linkArtista,
  tracklist,
  explicit,
  durata,
  idAlbum,
) => {
  const datiCanzone = {
    audio: audioCanzone,
    titolo: titolo,
    artista: nomeArtista,
    coverSmall: copertinaSmall,
    coverBig: copertinaBig,
    fotoArtista: fotoArtista,
    idArtista: linkArtista,
    tracklist: tracklist,
    explicit: explicit,
    durata: durata,
    idAlbum: idAlbum,
  }

  braniPreferiti.push(datiCanzone)
  localStorage.setItem("brano-preferito", JSON.stringify(braniPreferiti))

  icona.classList.replace("bi-plus-circle", "bi-check-circle-fill")
  icona.classList.add("text-success")
}

const contatoreBraniPreferiti = () => {
  const contenitore = document.getElementById("contatore-brani")
  const braniPreferiti =
    JSON.parse(localStorage.getItem("brano-preferito")) || []
  console.log(braniPreferiti)
  contenitore.innerText += braniPreferiti.length
}
contatoreBraniPreferiti()

// ASSEGNO ICONA GIà AGGIUNTO A CANZONI GIà SALVATE
function preferitiEsistenti() {
  const braniPreferiti =
    JSON.parse(localStorage.getItem("brano-preferito")) || []

  document.querySelectorAll("[data-id]").forEach((icon) => {
    const id = Number(icon.dataset.id)

    const trovato = braniPreferiti.some((b) => Number(b.idBrano) === id)

    if (trovato) {
      icon.classList.replace("bi-plus-circle", "bi-check-circle-fill")
      icon.classList.add("text-success")
    } else {
      icon.classList.replace("bi-check-circle-fill", "bi-plus-circle")
      icon.classList.remove("text-success")
    }
    contatoreBraniPreferiti()
  })
}

/* Funzione per togliere rounded da lg in giù */

const mobileView = window.matchMedia("(max-width: 991px)")

const togliRounded = (e) => {
  const mainSection = document.getElementById("main-section")
  if (e.matches) {
    console.log(
      "Dimensione schermo inferiore a 991px tolgo i rounded sul main-section",
    )
    mainSection.classList.remove("rounded-4")
  } else {
    console.log(
      "Dimensione schermo maggiore a 991px metto i rounded sul main-section",
    )
    mainSection.classList.add("rounded-4")
  }
}
document.addEventListener("DOMContentLoaded", () => {
  togliRounded(mobileView)
  mobileView.addEventListener("change", togliRounded)
})

//BOTTONE SEARCH ASIDE JS

document.addEventListener("DOMContentLoaded", () => {
  // Tutto il tuo codice va qui dentro
  const searchIcon = document.getElementById("search-icon")
  const searchForm = document.getElementById("search-form")
  const recenti = document.getElementById("recenti")
  const container = document.getElementById("search-container")

  if (searchIcon && searchForm && container) {
    searchIcon.addEventListener("click", (e) => {
      e.preventDefault()
      const isSearchActive = searchForm.classList.toggle("active")
      container.classList.toggle("bg-search", isSearchActive)

      if (recenti) {
        recenti.classList.toggle("d-none", isSearchActive)
      }
    })
  }
})
