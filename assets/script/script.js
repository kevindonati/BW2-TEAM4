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

function applicaColore(img, thief) {
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
}

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
  fetch(urlSearch + "Pink")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("problema nella response");
      }
    })
    .then((data) => {
      console.log(data);
      const spinner = document.querySelectorAll(".contenitore-spinner");
      spinner[1].classList.add("d-none");

      // Sposto questa  variabile fuori dal ciclo così la uso anche dopo per i colori
      const appendiAlbum = document.getElementById("contenitore-main-prime-4");

      for (let i = 0; i < 8; i++) {
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
                    crossorigin="anonymous"
                    class="img-fluid rounded-start img-per-colore"
                  />
                  <small >${data.data[i].title}</small>
                </div>
                </a>
                <a
                  class="btn btn-success flex mostra-al-passaggio rounded rounded-circle text-black shadow shadow-lg position-absolute end-0 m-1 px-1 py-0 d-flex" 
                  
                  onclick="riproduciCanzone(\`${data.data[i].preview}\`, \`${data.data[i].title}\`, \`${data.data[i].artist.name}\`, \`${data.data[i].album.cover_small}\`, \`${data.data[i].album.cover_big}\`, \`${data.data[i].artist.picture_big}\`, \`${data.data[i].artist.id}\`, \`${data.data[i].artist.tracklist}\`)"
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

      // --- AGGIUNTA FONDAMENTALE QUI ---
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
  fetch(urlSearch + "american rap")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("errore nella response");
      }
    })
    .then((data) => {
      console.log(data);

      for (let i = 0; i < 12; i++) {
        const primoCarosello = document.querySelectorAll(".carosello-1");
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
  fetch(urlSearch + "italian trap")
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
  fetch(urlSearch + "party")
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
  audioCanzone,
  titolo,
  nomeArtista,
  copertinaSmall,
  copertinaBig,
  fotoArtista,
  linkArtista,
  tracklist,
) => {
  const bottonePlay = document.getElementById("btn-play-canzone");
  if (!bottonePlay) return; // Se il bottone non esiste, non provare a cambiargli classe
  const inputAudio = document.getElementById("audio");
  const playBtn = document.getElementById("playPauseBtn");

  if (audio.paused) {
    inputAudio.setAttribute("src", audioCanzone);
    audio.play();
    bottonePlay.classList.replace("bi-play-fill", "bi-pause-fill");
    playBtn.classList.replace("bi-play-circle-fill", "bi-pause-circle-fill");
  } else {
    audio.pause();
    bottonePlay.classList.replace("bi-pause-fill", "bi-play-fill");
    playBtn.classList.replace("bi-pause-circle-fill", "bi-play-circle-fill");
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
      console.log(data);
      ascoltatoriMensili.innerHTML = `${data.nb_fan}`;
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
      console.log(data);
      const caroselloCorrelati = document.querySelector(".carosello-correlati");
      const placeholder = document.querySelectorAll(".placeholder");
      console.log(placeholder);
      for (let i = 0; i < placeholder.length; i++) {
        placeholder[i].classList.remove("placeholder");
        console.log(placeholder[i]);
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
           onclick="musicaAlClick(this, \`${song.preview}\`, \`${song.title}\`, \`${song.artist.name}\`, \`${song.album.cover_small}\`, \`${song.album.cover_big}\`, \`${song.artist.picture_big}\`, \`${song.artist.id}\`, \`${song.artist.tracklist}\`)">
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
      loadSong(song);
      searchResults.style.display = "none";
      searchInput.value = "";
    });

    listContainer.appendChild(item);
  });

  searchResults.appendChild(listContainer);
};

const musicaAlClick = function (
  elementoCliccato,
  preview,
  titolo,
  artista,
  copertinaSmall,
  copertinaBig,
  fotoArtista,
  linkArtista,
  tracklist,
) {
  const audio = document.getElementById("audio");
  const rigaCanzone = elementoCliccato.closest(".item-canzone");
  const icona = elementoCliccato.querySelector("i");

  // SE LA CANZONE È LA STESSA CHE STA GIÀ SUONANDO
  if (audio.src === preview) {
    if (!audio.paused) {
      audio.pause();
      rigaCanzone.classList.remove("suonando");
      icona.classList.replace("fa-pause", "fa-play"); // Torna Play
      aggiornaBottoniFooter(false);
    } else {
      audio.play();
      rigaCanzone.classList.add("suonando");
      icona.classList.replace("fa-play", "fa-pause"); // Diventa Pausa
      aggiornaBottoniFooter(true);
    }
  } else {
    // SE È UNA CANZONE NUOVA
    // Togliamo "suonando" e mettiamo l'icona Play a tutte le altre righe
    document.querySelectorAll(".item-canzone").forEach((riga) => {
      riga.classList.remove("suonando");
      const i = riga.querySelector("i");
      if (i) i.classList.replace("fa-pause", "fa-play");
    });

    // Mettiamo Pausa alla canzone appena cliccata
    rigaCanzone.classList.add("suonando");
    icona.classList.replace("fa-play", "fa-pause");

    // Facciamo partire la musica
    riproduciCanzone(
      preview,
      titolo,
      artista,
      copertinaSmall,
      copertinaBig,
      fotoArtista,
      linkArtista,
      tracklist,
    );
  }
};

const aggiornaBottoniFooter = (isPlaying) => {
  const playBtnFooter = document.getElementById("playPauseBtn"); // Il bottone tondo al centro

  if (isPlaying) {
    playBtnFooter.classList.replace(
      "bi-play-circle-fill",
      "bi-pause-circle-fill",
    );
  } else {
    playBtnFooter.classList.replace(
      "bi-pause-circle-fill",
      "bi-play-circle-fill",
    );
  }
};

// AGGIUNGI QUESTO IN FONDO AL FILE JS
function attivaSensoreSfondo() {
  const mainSection = document.getElementById("main-section");
  const contenitoreCards = document.getElementById("contenitore-main-prime-4");

  if (contenitoreCards && mainSection) {
    // Rimuoviamo eventuali vecchi ascoltatori per non duplicarli
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
