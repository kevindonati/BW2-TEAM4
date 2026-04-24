const urlGenerale = "https://striveschool-api.herokuapp.com/api/deezer/";
const urlAlbum = "https://striveschool-api.herokuapp.com/api/deezer/album/";
const urlArtista = "https://striveschool-api.herokuapp.com/api/deezer/artist/";
const urlSearch = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";
const urlPlaylistLazza =
  "https://striveschool-api.herokuapp.com/api/deezer/artist/1288678/top?limit=50";
const urlPlaylistTheWeeknd =
  "https://striveschool-api.herokuapp.com/api/deezer/artist/4050205/top?limit=50";
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const btnAggiungi = document.querySelectorAll(".btn-aggiungi");

const applicaColore = function (img, thief) {
  try {
    const rgb = thief.getColor(img);
    const card = img.closest(".contenitore-card");
    if (card) {
      card.setAttribute(
        "data-color",
        `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.4)`,
      );
    }
  } catch (e) {
    console.error("Errore colore", e);
  }
};

// RIEMPO LA LIBRERIA
const libreria = () => {
  fetch(urlSearch + "drake")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("problema nella response");
      }
    })
    .then((data) => {
      const spinner = document.querySelectorAll(".contenitore-spinner");
      spinner[0].classList.add("d-none");
      for (let i = 0; i < data.data.length; i++) {
        const appendiAlbum = document.getElementById("appendi-album-libreria");
        appendiAlbum.innerHTML += `
        <a class="text-decoration-none text-light" href="albumView.html?id=${data.data[i].album.id}">
            <div class="d-flex my-2 align-items-center">
              <img
                src="${data.data[i].album.cover_small}"
                class="rounded-1 img-fluid"
              />
              <div class="ms-3 d-flex flex-column justify-content-center">
                <h6 class="mb-1 ">${data.data[i].album.title}</h6>
                <p class="mb-0">
                  ${data.data[i].album.type} &bull; <a class="text-decoration-none text-light" href="artistView.html?id=${data.data[i].artist.id}"> ${data.data[i].artist.name}</a>
                </p>
              </div>
            </div>
        </a>
      `;
      }
    })
    .catch((err) => {
      console.log("errore durante la fetch", err);
    });
};
libreria();

// RIEMPO IL MAIN
const main8 = () => {
  fetch(urlSearch + "lazza")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("problema nella response");
      }
    })
    .then((data) => {
      console.log("data", data);
      const spinner = document.querySelectorAll(".contenitore-spinner");
      spinner[1].classList.add("d-none");

      // Sposto questa  variabile fuori dal ciclo così la uso anche dopo per i colori
      const appendiAlbum = document.getElementById("contenitore-main-prime-4");

      for (let i = 0; i < 8; i++) {
        appendiAlbum.innerHTML += `
        <div class="col-6 col-xl-3 g-2 g-lg-1">
        <a class="text-decoration-none text-light" href="albumView.html?id=${data.data[i].album.id}">
              <div
                class="d-flex align-items-center gap-1 bg-button rounded justify-content-between contenitore-card position-relative"
              >
                <div class="d-flex align-items-center gap-2">
                  <img
                    src="${data.data[i].album.cover_small}"
                    alt=""
                    crossorigin="anonymous"
                    class="img-fluid rounded-start img-per-colore"
                  />
                  <small >${data.data[i].title}</small>
                </div>
                </a>
                <a
                  class="btn btn-success flex mostra-al-passaggio rounded rounded-circle text-black shadow shadow-lg position-absolute end-0 m-1 px-1 py-0 d-flex" 
                  
                  onclick="riproduciCanzone(this, \`${data.data[i].preview}\`, \`${data.data[i].title}\`, \`${data.data[i].artist.name}\`, \`${data.data[i].album.cover_small}\`, \`${data.data[i].album.cover_big}\`, \`${data.data[i].artist.picture_big}\`, \`${data.data[i].artist.id}\`, \`${data.data[i].artist.tracklist}\`, \`${data.data[i].explicit_lyrics}\`, \`${data.data[i].duration}\`, \`${data.data[i].id}\`, \`${data.data[i].album.id}\`)"
                >
                  <i id="btn-play-canzone"
                    class="bi bi-play-fill justify-content-center align-items-center"
                  ></i>
                </a>
              </div>
            </div>
      `;
      }

      const colorThief = new ColorThief();
      const immagini = appendiAlbum.querySelectorAll(".img-per-colore");

      immagini.forEach((img) => {
        if (img.complete) {
          applicaColore(img, colorThief);
        } else {
          img.addEventListener("load", () => applicaColore(img, colorThief));
        }
      });

      // --- lancio la funzione ---
      attivaSensoreSfondo();
      // --------------------------------
    })
    .catch((err) => {
      console.log("errore durante la fetch", err);
    });
};
main8();

// RIEMPO PRIMO CAROSELLO
const primoCarosello = () => {
  fetch(urlSearch + "tony boy")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("errore nella response");
      }
    })
    .then((data) => {
      for (let i = 0; i < 12; i++) {
        const primoCarosello = document.querySelectorAll(".carosello-1");
        primoCarosello[i].innerHTML = `
        <a class="text-decoration-none text-light" href="albumView.html?id=${data.data[i].album.id}">
        <div class="position-relative">
                        <img
                          src="${data.data[i].album.cover_medium}"
                          class="d-block w-100"
                          alt="..."
                        />
                        <a
                          class="btn btn-success flex mostra-al-passaggio rounded rounded-circle text-black shadow shadow-lg position-absolute end-0 bottom-0 m-1 px-1 py-0 d-flex"
                          onclick="riproduciCanzone(this, \`${data.data[i].preview}\`, \`${data.data[i].title}\`, \`${data.data[i].artist.name}\`, \`${data.data[i].album.cover_small}\`, \`${data.data[i].album.cover_big}\`, \`${data.data[i].artist.picture_big}\`, \`${data.data[i].artist.id}\`, \`${data.data[i].artist.tracklist}\`, \`${data.data[i].explicit_lyrics}\`, \`${data.data[i].duration}\`, \`${data.data[i].id}\`, \`${data.data[i].album.id}\`)"
                        >
                          <i
                            class="bi bi-play-fill justify-content-center align-items-center"
                          ></i>
                        </a>
                      </div>
                      <p class="text-center text-truncate-2">${data.data[i].title}</p>
        `;
      }
    })
    .catch((err) => {
      console.log("errore nella fetch", err);
    });
};
primoCarosello();

// RIEMPO SECONDO CAROSELLO
const secondoCarosello = () => {
  fetch(urlSearch + "bts")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("errore nella response");
      }
    })
    .then((data) => {
      for (let i = 0; i < 12; i++) {
        const secondoCarosello = document.querySelectorAll(".carosello-2");
        secondoCarosello[i].innerHTML = `
        <a class="text-decoration-none text-light" href="albumView.html?id=${data.data[i].album.id}">
        <div class="position-relative">
                        <img
                          src="${data.data[i].album.cover_medium}"
                          class="d-block w-100"
                          alt="..."
                        />
                        <a
                          class="btn btn-success flex mostra-al-passaggio rounded rounded-circle text-black shadow shadow-lg position-absolute end-0 bottom-0 m-1 px-1 py-0 d-flex"
                          onclick="riproduciCanzone(this, \`${data.data[i].preview}\`, \`${data.data[i].title}\`, \`${data.data[i].artist.name}\`, \`${data.data[i].album.cover_small}\`, \`${data.data[i].album.cover_big}\`, \`${data.data[i].artist.picture_big}\`, \`${data.data[i].artist.id}\`, \`${data.data[i].artist.tracklist}\`, \`${data.data[i].explicit_lyrics}\`, \`${data.data[i].duration}\`, \`${data.data[i].id}\`, \`${data.data[i].album.id}\`)"
                        >
                          <i
                            class="bi bi-play-fill justify-content-center align-items-center"
                          ></i>
                        </a>
                      </div>
                      <p class="text-center text-truncate-2">${data.data[i].title}</p>
        `;
      }
    })
    .catch((err) => {
      console.log("errore nella fetch", err);
    });
};
secondoCarosello();

// RIEMPO TERZO CAROSELLO
const terzoCarosello = () => {
  fetch(urlSearch + "glocky")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("errore nella response");
      }
    })
    .then((data) => {
      for (let i = 0; i < 12; i++) {
        const terzoCarosello = document.querySelectorAll(".carosello-3");
        terzoCarosello[i].innerHTML = `
        <a class="text-decoration-none text-light" href="albumView.html?id=${data.data[i].album.id}">
        <div class="position-relative">
                        <img
                          src="${data.data[i].album.cover_medium}"
                          class="d-block w-100"
                          alt="..."
                        />
                        <a
                          class="btn btn-success flex mostra-al-passaggio rounded rounded-circle text-black shadow shadow-lg position-absolute end-0 bottom-0 m-1 px-1 py-0 d-flex"
                          onclick="riproduciCanzone(this, \`${data.data[i].preview}\`, \`${data.data[i].title}\`, \`${data.data[i].artist.name}\`, \`${data.data[i].album.cover_small}\`, \`${data.data[i].album.cover_big}\`, \`${data.data[i].artist.picture_big}\`, \`${data.data[i].artist.id}\`, \`${data.data[i].artist.tracklist}\`, \`${data.data[i].explicit_lyrics}\`, \`${data.data[i].duration}\`, \`${data.data[i].id}\`, \`${data.data[i].album.id}\`)"
                        >
                          <i
                            class="bi bi-play-fill justify-content-center align-items-center"
                          ></i>
                        </a>
                      </div>
                      <p class="text-center text-truncate-2">${data.data[i].title}</p>
        `;
      }
    })
    .catch((err) => {
      console.log("errore nella fetch", err);
    });
};
terzoCarosello();

// FACCIO PARTIRE LA CANZONE SELEZIONATA

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
  explicit,
  durata,
  idTraccia,
  idAlbum,
) => {
  const icona = document.querySelectorAll(".btn-aggiungi");
  for (let i = 0; i < icona.length; i++) {
    icona[i].classList.remove("bi-check-circle-fill");
    icona[i].classList.add("bi-plus-circle");
    icona[i].classList.remove("text-success");
  }

  const bottonePlay = document.getElementById("btn-play-canzone");
  // if (!bottonePlay) return // Se il bottone non esiste, non provare a cambiargli classe
  const inputAudio = document.getElementById("audio");
  const playBtn = document.getElementById("playPauseBtn");

  if (inputAudio.src === audioCanzone) {
    if (inputAudio.paused) {
      inputAudio.play();
      iconaPlay.innerHTML = `<i
                              class="bi bi-pause-fill justify-content-center align-items-center"
                            ></i>`;
      playBtn.classList.replace("bi-play-circle-fill", "bi-pause-circle-fill");
    } else {
      inputAudio.pause();
      iconaPlay.innerHTML = `<i
                              class="bi bi-play-fill justify-content-center align-items-center"
                            ></i>`;
      playBtn.classList.replace("bi-pause-circle-fill", "bi-play-circle-fill");
    }
  } else {
    inputAudio.src = audioCanzone;
    inputAudio.play();
    iconaPlay.innerHTML = `<i
                              class="bi bi-pause-fill justify-content-center align-items-center"
                            ></i>`;
    playBtn.classList.replace("bi-play-circle-fill", "bi-pause-circle-fill");
  }

  // RIEMPO BARRA FOOTER CON CNZONE IN RIPRODUZIONE
  const titoloCanzone = document.querySelectorAll(".titolo-barra-dx");
  const copertinaPiccola = document.querySelectorAll(
    ".copertina-small-barra-dx",
  );
  const copertinaGrande = document.querySelectorAll(".copertina-big-barra-dx");
  const nome = document.querySelectorAll(".autore-barra-dx");
  const fotoProfiloArtista = document.getElementById("foto-artista");
  const ascoltatoriMensili = document.querySelector(".ascoltatori");

  for (let i = 0; i < btnAggiungi.length; i++) {
    btnAggiungi[i].setAttribute("data-id", idTraccia);

    btnAggiungi[i].addEventListener("click", () => {
      salvaCanzone(
        btnAggiungi,
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
        idTraccia,
      );
    });
  }
  preferitiEsistenti();

  for (let i = 0; i < nome.length; i++) {
    nome[i].innerHTML = `${nomeArtista}`;
  }
  for (let i = 0; i < titoloCanzone.length; i++) {
    titoloCanzone[i].innerHTML = `${titolo}`;
  }
  for (let i = 0; i < copertinaPiccola.length; i++) {
    copertinaPiccola[i].setAttribute("src", copertinaSmall);
  }
  for (let i = 0; i < copertinaGrande.length; i++) {
    copertinaGrande[i].setAttribute("src", copertinaBig);
  }
  fotoProfiloArtista.setAttribute("src", fotoArtista);

  fetch(urlArtista + linkArtista)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("errore nella response");
      }
    })
    .then((data) => {
      ascoltatoriMensili.innerHTML = `${data.nb_fan.toLocaleString()}`;
    })
    .catch((err) => {
      console.log("errore nella fetch", err);
    });

  fetch(tracklist)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("errore nella response");
      }
    })
    .then((data) => {
      const caroselloCorrelati = document.querySelector(".carosello-correlati");
      const placeholder = document.querySelectorAll(".placeholder");

      for (let i = 0; i < placeholder.length; i++) {
        placeholder[i].classList.remove("placeholder");
      }

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
              class="carousel-custom-prev"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="prev"
            >
              <span
                class="carousel-custom-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-custom-next"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="next"
            >
              <span
                class="carousel-custom-next-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
      `;
    })
    .catch((err) => {
      console.log("errore nella fetch", err);
    });
};

// FUNZIONE ricerca

const performSearch = (query) => {
  if (query.length < 2) {
    searchResults.style.display = "none"; // se il risultato ricerca è minore di 2 elementi avrà display none
    return;
  }

  fetch(urlSearch + query)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore nella chiamata");
      }
    })
    .then((data) => {
      renderDropdownResult(data.data);
    })
    .catch((error) => {
      console.log("Errore server", error);
    });
};

searchInput.addEventListener("input", (e) => performSearch(e.target.value));

const renderDropdownResult = (songs) => {
  searchResults.innerHTML = "";
  searchResults.style.display = "block";

  // Creo una lista verticale
  const listContainer = document.createElement("div");
  listContainer.className = "d-flex flex-column";

  songs.slice(0, 10).forEach((song) => {
    const item = document.createElement("div");
    item.className =
      "d-flex align-items-center p-2 song-card-container border-bottom border-secondary border-opacity-25 item-canzone";
    item.style.cursor = "pointer";

    item.innerHTML = `
    <div class="position-relative me-3" style="width: 50px; height: 50px; flex-shrink: 0;">
      <img src="${song.album.cover_small}" class="img-fluid rounded shadow-sm" alt="${song.title}">
      <div class="mostra-al-passaggio position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center rounded" 
           style="background: rgba(0,0,0,0.5)" 
                        onclick="riproduciCanzone(this, \`${song.preview}\`, \`${song.title}\`, \`${song.artist.name}\`, \`${song.album.cover_small}\`, \`${song.album.cover_big}\`, \`${song.artist.picture_big}\`, \`${song.artist.id}\`, \`${song.artist.tracklist}\`, \`${song.explicit_lyrics}\`), \`${song.duration}\`, \`${song.id}\`, \`${song.album.id}\`">
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
    `;

    item.addEventListener("click", () => {
      // loadSong(song)
      searchResults.style.display = "none";
      searchInput.value = "";
    });

    listContainer.appendChild(item);
  });

  searchResults.appendChild(listContainer);
};

let searchTimeout;

searchInput.addEventListener("input", (e) => {
  const query = e.target.value;

  clearTimeout(searchTimeout);

  searchTimeout = setTimeout(() => {
    performSearch(query);
  }, 200);
});

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

// funzione per il colorthief
function attivaSensoreSfondo() {
  const mainSection = document.getElementById("main-section");
  const contenitoreCards = document.getElementById("contenitore-main-prime-4");

  if (contenitoreCards && mainSection) {
    // Rimuovo eventuali vecchi ascoltatori per non duplicarli
    contenitoreCards.onclick = null;

    contenitoreCards.addEventListener("mouseover", (e) => {
      const card = e.target.closest(".contenitore-card");
      if (card) {
        const colore = card.getAttribute("data-color");
        if (colore) {
          mainSection.style.background = `linear-gradient(${colore}, #121212 50%)`;
        }
      }
    });

    contenitoreCards.addEventListener("mouseleave", () => {
      mainSection.style.background =
        "linear-gradient(rgba(255, 255, 255, 0.1), #121212 50%)";
    });
  }
}

// PARTE audio
// Progress bar traccia audio----------------------------------------------------------------------------------

const audio = document.getElementById("audio");
const progressBar = document.getElementById("progress-bar");
const currentTimeEl = document.getElementById("time-now");
const durationEl = document.getElementById("time-max");
const playBtn = document.getElementById("playPauseBtn");
const mute = document.getElementById("mute");
const volumeSlider = document.getElementById("volumeSlider");

let lastVolume = 0.2;
let barColore = "#ffffff";
let volumeBarColor = "#ffffff";

const coloredBars = (bar, color = "#1db954") => {
  const value = Number(bar.value);
  bar.style.background = `linear-gradient(to right, ${color} ${value}%, #4d4d4d ${value}%)`;
};

// Calcolo tempo traccia

audio.addEventListener("timeupdate", () => {
  if (!isNaN(audio.duration)) {
    const percentage = (audio.currentTime / audio.duration) * 100;
    progressBar.value = percentage;
    currentTimeEl.innerText = formatTime(audio.currentTime);
    coloredBars(progressBar, barColore);
  }
});

progressBar.addEventListener("input", () => {
  audio.currentTime = (progressBar.value / 100) * audio.duration;
  coloredBars(progressBar, barColore);
});

// Hover traccia

progressBar.addEventListener("mouseenter", () => {
  barColore = "#1db954";
  coloredBars(progressBar, barColore);
});

progressBar.addEventListener("mouseleave", () => {
  barColore = "#ffffff";
  coloredBars(progressBar, barColore);
});

const formatTime = (time) => {
  const min = Math.floor(time / 60);
  const sec = Math.floor(time % 60);
  return `${min}:${sec < 10 ? "0" : ""}${sec}`;
};

audio.addEventListener("loadedmetadata", () => {
  durationEl.innerText = formatTime(audio.duration);
});

// Play e pausa------------------------------------------------------------------------------------------------

const playPause = () => {
  if (audio.paused) {
    audio.play();
    playBtn.classList.replace("bi-play-circle-fill", "bi-pause-circle-fill");
  } else {
    audio.pause();
    playBtn.classList.replace("bi-pause-circle-fill", "bi-play-circle-fill");
  }
};

playBtn.addEventListener("click", playPause);

// Slider musica------------------------------------------------------------------------------------------------

const updateBar = () => {
  const percentage = (audio.currentTime / audio.duration) * 100;
  progressBar.style.background = `linear-gradient(to right, ${barColore} ${percentage}%, #4d4d4d ${percentage}%)`;
};

audio.addEventListener("timeupdate", () => {
  if (!isNaN(audio.duration)) {
    const percentage = (audio.currentTime / audio.duration) * 100;
    progressBar.value = percentage;
    currentTimeEl.innerText = formatTime(audio.currentTime);
    updateBar();
  }
});

// Mute function volume-----------------------------------------------------------------------------------------

const muteIcon = (muted) => {
  const iconMute = document.getElementById("mute");
  if (muted) {
    iconMute.classList.replace("bi-volume-up", "bi-volume-mute");
  } else {
    iconMute.classList.replace("bi-volume-mute", "bi-volume-up");
  }
};

mute.addEventListener("click", () => {
  //funzione per mutare e smutare l'audio tenendo in memoria l'ultimo valore dell'audio
  if (audio.volume > 0) {
    lastVolume = audio.volume;
    audio.volume = 0;
    volumeSlider.value = 0;
    muteIcon(true);
  } else {
    if (!lastVolume || lastVolume === 0) lastVolume = 0.5;
    audio.volume = lastVolume;
    volumeSlider.value = lastVolume * 100;
    muteIcon(false);
  }
  coloredBars(volumeSlider, volumeBarColor);
});

// Slider volume------------------------------------------------------------------------------------------------

volumeSlider.addEventListener("input", (e) => {
  const value = e.target.value;
  audio.volume = value / 100;
  coloredBars(volumeSlider, volumeBarColor);
  muteIcon(audio.volume === 0);
});

// Hover slider volume

volumeSlider.addEventListener("mouseenter", () => {
  volumeBarColor = "#1db954";
  coloredBars(volumeSlider, volumeBarColor);
});

volumeSlider.addEventListener("mouseleave", () => {
  volumeBarColor = "#ffffff";
  coloredBars(volumeSlider, volumeBarColor);
});

mute.addEventListener("mouseenter", () => {
  volumeBarColor = "#1db954";
  coloredBars(volumeSlider, volumeBarColor);
});

mute.addEventListener("mouseleave", () => {
  volumeBarColor = "#ffffff";
  coloredBars(volumeSlider, volumeBarColor);
});

// Caricamenti iniziali
coloredBars(volumeSlider, "#ffffff");
coloredBars(progressBar, "#ffffff");
muteIcon(false);
audio.volume = 0.2;
volumeSlider.value = 20;

// Funzione full-screen

const fsBtn = document.querySelector("#screenMode");

fsBtn.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch((err) => {
      console.error(`Errore: ${err.message}`);
    });
  } else {
    document.exitFullscreen();
  }
});

document.addEventListener("fullscreenchange", () => {
  if (document.fullscreenElement) {
    fsBtn.classList.replace("bi-fullscreen", "bi-fullscreen-exit");
  } else {
    fsBtn.classList.replace("bi-fullscreen-exit", "bi-fullscreen");
  }
});

//MOSTRA TUTTO

//CAROSELLI
const carosello = document.getElementById("carouselExampleInterval");
const carosello1 = document.getElementById("carouselExampleInterval1");
const carosello2 = document.getElementById("carouselExampleInterval2");
//MOSTRATUTTO
const mostraTutto1 = document.getElementById("mostraTutto1");
const mostratutto2 = document.getElementById("mostraTutto2");
const mostratutto3 = document.getElementById("mostraTutto3");
//TITOLO SEZIONE
const albumSelezionatiPerTe = document.getElementById("selezionati");
const recenti = document.getElementById("recenti2");
const continuaAdAscoltare = document.getElementById("continua");
//BOTTONI PREVIUS
const prevButton1 = document.getElementById("prev-button-1");
const prevSpan1 = document.getElementById("prev-span-1");
const prevButton2 = document.getElementById("prev-button-2");
const prevSpan2 = document.getElementById("prev-span-2");
const prevButton3 = document.getElementById("prev-button-3");
const prevSpan3 = document.getElementById("prev-span-3");
//BOTTONI NEXT
const nextButton1 = document.getElementById("next-button-1");
const nextSpan1 = document.getElementById("next-span-1");
const nextButton2 = document.getElementById("next-button-2");
const nextSpan2 = document.getElementById("next-span-2");
const nextButton3 = document.getElementById("next-button-3");
const nextSpan3 = document.getElementById("next-span-3");

mostraTutto1.addEventListener("click", (e) => {
  e.preventDefault();

  const GrigliaAttiva1 = carosello.classList.toggle("griglia-attiva");

  if (GrigliaAttiva1) {
    mostraTutto1.innerText = "Mostra meno";
    carosello1.classList.add("d-none");
    carosello2.classList.add("d-none");
    mostratutto2.classList.add("d-none");
    mostratutto3.classList.add("d-none");
    recenti.classList.add("d-none");
    continuaAdAscoltare.classList.add("d-none");
    prevButton1.classList.add("d-none");
    nextButton1.classList.add("d-none");
  } else {
    mostraTutto1.innerText = "Mostra tutto";
    carosello1.classList.remove("d-none");
    carosello2.classList.remove("d-none");
    mostratutto2.classList.remove("d-none");
    mostratutto3.classList.remove("d-none");
    recenti.classList.remove("d-none");
    continuaAdAscoltare.classList.remove("d-none");
    prevButton1.classList.remove("d-none");
    nextButton1.classList.remove("d-none");
  }
});

mostratutto2.addEventListener("click", (e) => {
  e.preventDefault();

  const GrigliaAttiva2 = carosello1.classList.toggle("griglia-attiva");

  if (GrigliaAttiva2) {
    mostratutto2.innerText = "Mostra meno";
    mostraTutto1.classList.add("d-none");
    mostratutto3.classList.add("d-none");
    carosello.classList.add("d-none");
    carosello2.classList.add("d-none");
    continuaAdAscoltare.classList.add("d-none");
    albumSelezionatiPerTe.classList.add("d-none");
    prevButton2.classList.add("d-none");
    nextButton2.classList.add("d-none");
  } else {
    mostratutto2.innerText = "Mostra tutto";
    mostraTutto1.classList.remove("d-none");
    mostratutto3.classList.remove("d-none");
    carosello.classList.remove("d-none");
    carosello2.classList.remove("d-none");
    continuaAdAscoltare.classList.remove("d-none");
    albumSelezionatiPerTe.classList.remove("d-none");
    prevButton2.classList.remove("d-none");
    nextButton2.classList.remove("d-none");
  }
});

mostratutto3.addEventListener("click", (e) => {
  e.preventDefault();
  const GrigliaAttiva3 = carosello2.classList.toggle("griglia-attiva");

  if (GrigliaAttiva3) {
    mostratutto3.innerText = "Mostra meno";
    mostraTutto1.classList.add("d-none");
    mostratutto2.classList.add("d-none");
    carosello.classList.add("d-none");
    carosello1.classList.add("d-none");
    albumSelezionatiPerTe.classList.add("d-none");
    recenti.classList.add("d-none");
    prevButton3.classList.add("d-none");
    nextButton3.classList.add("d-none");
  } else {
    mostratutto3.innerText = "Mostra tutto";
    mostraTutto1.classList.remove("d-none");
    mostratutto2.classList.remove("d-none");
    carosello.classList.remove("d-none");
    carosello1.classList.remove("d-none");
    albumSelezionatiPerTe.classList.remove("d-none");
    recenti.classList.remove("d-none");
    prevButton3.classList.remove("d-none");
    nextButton3.classList.remove("d-none");
  }
});
// FUNZIONE AGGIUNGI AI PREFERITI
let braniPreferiti = JSON.parse(localStorage.getItem("brano-preferito")) || [];

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
  idBrano,
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
    idBrano: idBrano,
  };
  // CONTROLLO SE GIà ESISTE NEI PREFERITI TRAMITE IL SUO IDalbum
  const esiste = braniPreferiti.findIndex((b) => b.idBrano === idBrano);
  // SE NON ESISTE:
  if (esiste === -1) {
    braniPreferiti.push(datiCanzone);
    for (let i = 0; i < btnAggiungi.length; i++) {
      btnAggiungi[i].classList.replace(
        "bi-plus-circle",
        "bi-check-circle-fill",
      );
      btnAggiungi[i].classList.add("text-success");
    }
  }
  // SE ESISTE
  else {
    braniPreferiti.splice(esiste, 1);
    for (let i = 0; i < btnAggiungi.length; i++) {
      btnAggiungi[i].classList.replace(
        "bi-check-circle-fill",
        "bi-plus-circle",
      );
      btnAggiungi[i].classList.remove("text-success");
    }
  }
  localStorage.setItem("brano-preferito", JSON.stringify(braniPreferiti));
};

const contatoreBraniPreferiti = () => {
  const contenitore = document.getElementById("contatore-brani");
  const braniPreferiti =
    JSON.parse(localStorage.getItem("brano-preferito")) || [];
  console.log(braniPreferiti);
  contenitore.innerText = braniPreferiti.length;
};
contatoreBraniPreferiti();

// ASSEGNO ICONA GIà AGGIUNTO A CANZONI GIà SALVATE
function preferitiEsistenti() {
  const braniPreferiti =
    JSON.parse(localStorage.getItem("brano-preferito")) || [];

  document.querySelectorAll(".icona-2[data-id]").forEach((icon) => {
    const id = Number(icon.dataset.id);

    const trovato = braniPreferiti.some((b) => Number(b.idBrano) === id);

    if (trovato) {
      for (let i = 0; i < btnAggiungi.length; i++) {
        btnAggiungi[i].classList.replace(
          "bi-plus-circle",
          "bi-check-circle-fill",
        );
        btnAggiungi[i].classList.add("text-success");
      }
    }
  });
}

/* Funzione per togliere rounded da lg in giù */

const mobileView = window.matchMedia("(max-width: 991px)");

const togliRounded = (e) => {
  const mainSection = document.getElementById("main-section");
  const carouselPrev = document.querySelectorAll(".carousel-custom-prev-icon");
  const carouselNext = document.querySelectorAll(".carousel-custom-next-icon");
  if (e.matches) {
    console.log(
      "Dimensione schermo inferiore a 991px tolgo i rounded sul main-section",
    );
    mainSection.classList.remove("rounded-4");
    carouselPrev.forEach((op) => op.classList.add("opacity-0"));
    carouselNext.forEach((op) => op.classList.add("opacity-0"));
  } else {
    console.log(
      "Dimensione schermo maggiore a 991px metto i rounded sul main-section",
    );
    mainSection.classList.add("rounded-4");
    carouselPrev.forEach((op) => op.classList.remove("opacity-0"));
    carouselNext.forEach((op) => op.classList.remove("opacity-0"));
  }
};
document.addEventListener("DOMContentLoaded", () => {
  togliRounded(mobileView);
  mobileView.addEventListener("change", togliRounded);
});

// Funzione expand asideSx

const expandSx = document.getElementById("expandSx");

expandSx.addEventListener("click", () => {
  const asideSx = document.getElementById("asideSx");
  const mainSection = document.getElementById("main-section");
  if (asideSx.classList.contains("col-lg-3")) {
    asideSx.classList.replace("col-lg-3", "col-lg-9");
    expandSx.classList.replace(
      "bi-arrows-angle-expand",
      "bi-arrows-angle-contract",
    );
  } else {
    asideSx.classList.replace("col-lg-9", "col-lg-3");
    expandSx.classList.replace(
      "bi-arrows-angle-contract",
      "bi-arrows-angle-expand",
    );
  }
});

// Funzione grid asideSx

// const gridAside = () => {
//   const containerLibreria = document.getElementById("appendi-album-libreria");
//   containerLibreria.classList.remove("flex-column");
//   containerLibreria.classList.add("overflow-auto");
// };

// gridAside();
//BOTTONE SEARCH ASIDE JS

document.addEventListener("DOMContentLoaded", () => {
  // Tutto il tuo codice va qui dentro
  const searchIcon = document.getElementById("search-icon");
  const searchForm = document.getElementById("search-form");
  const recenti = document.getElementById("recenti");
  const container = document.getElementById("search-container");

  if (searchIcon && searchForm && container) {
    searchIcon.addEventListener("click", (e) => {
      e.preventDefault();
      const isSearchActive = searchForm.classList.toggle("active");
      container.classList.toggle("bg-search", isSearchActive);

      if (recenti) {
        recenti.classList.toggle("d-none", isSearchActive);
      }
    });
  }
});
