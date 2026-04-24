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
const parametri = new URLSearchParams(location.search);
const IDalbum = parametri.get("id");
const btnAggiungi = document.querySelectorAll(".btn-aggiungi");

// Inserisco la funzione per applicare i colori di sfondo
const applicaColoriAlbum = function (urlImmagine) {
  const thief = new ColorThief();
  const img = new Image();
  img.crossOrigin = "Anonymous";
  img.src = urlImmagine + "?not-from-cache"; // Trucco per il CORS

  img.addEventListener("load", function () {
    try {
      const rgb = thief.getColor(img);
      const coloreBase = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.8)`;
      const coloreSfumato = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.4)`;

      // 1. Coloriamo la parte superiore (solida)
      const parteAlta = document.querySelector(".bg-secondary");
      if (parteAlta) {
        // Rimuoviamo la classe di Bootstrap per non andare in conflitto
        parteAlta.classList.remove("bg-secondary");
        parteAlta.style.backgroundColor = coloreBase;
      }

      // 2. Coloriamo la parte inferiore (sfumata)
      const parteBassa = document.querySelector(".bg-linear");
      if (parteBassa) {
        parteBassa.style.background = `linear-gradient(to bottom, ${coloreSfumato} 0%, #121212 20%)`;
      }
    } catch (e) {
      console.error("Errore ColorThief:", e);
    }
  });
};

const estrazioneArtista = () => {
  fetch("https://striveschool-api.herokuapp.com/api/deezer/album/" + IDalbum)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new error("errore nella response");
      }
    })
    //   ------------------------------------------------------------------------COMPILAZIONE INFO PRINCIPALI
    .then((response) => {
      console.log(response);
      const fotoAlbum = document.querySelector("#albumCover");
      const titoloAlbum = document.querySelector("#albumTitle");
      const fotoArtista = document.querySelector("#artistImage");
      const nomeArtista = document.querySelectorAll(".artistName");
      const dateReleseAlbum = document.querySelectorAll(".albumReleaseDate");
      const numBraniAlbum = document.querySelector("#albumNumberOfSongs");
      const stories = document.querySelector("#artistStories");
      let durataAlbum = document.querySelector("#albumDuration");

      if (response.duration >= 3600) {
        const calcolo = Math.round(response.duration / 60);
        const durataInOre = Math.floor(calcolo / 60);
        const durataMinutiExtra = calcolo % 60;

        durataAlbum.innerText = `${durataInOre}h ${durataMinutiExtra}min`;
      } else {
        const calcolo = Math.round(response.duration / 60);
        const durataMinutiExtra = calcolo % 60;
        durataAlbum.innerText = `${calcolo}min ${durataMinutiExtra}sec`;
      }

      fotoAlbum.setAttribute("src", `${response.cover_big}`);
      applicaColoriAlbum(response.cover_big); // lancio la funzione per il color thief
      titoloAlbum.innerHTML = `${response.title}`;
      fotoArtista.setAttribute("src", `${response.artist.picture}`);
      numBraniAlbum.innerText = `${response.nb_tracks}`;

      stories.setAttribute("src", `${response.artist.picture_small}`);

      for (x = 0; x < nomeArtista.length; x++) {
        nomeArtista[x].innerText = `${response.artist.name}`;
      }

      for (x = 0; x < dateReleseAlbum.length; x++) {
        dateReleseAlbum[x].innerText = `${response.release_date}`;
      }

      //   ------------------------------------------------------------------------DISPONGO BRANI
      for (x = 1; x < response.tracks.data.length; x++) {
        const titoloCanzone = response.tracks.data[x].title;
        const artista = response.tracks.data[x].artist.name;
        const riproduzioniCanzone = response.tracks.data[x].rank;
        const durataCanzone = response.tracks.data[x].duration;

        const minuti = Math.floor(durataCanzone / 60);
        const secondi = (durataCanzone % 60).toString().padStart(2, "0");

        const numeroCanzone = x;
        const explicit = response.tracks.data[x].explicit_lyrics
          ? ""
          : "d-none";

        const contenitore = document.getElementById("contenitore-album");
        contenitore.innerHTML += `
              <div class="row mt-3 align-items-center px-4 riga">
                <div class="col-1 cella">
                  <span class="numero-cella">${numeroCanzone}</span>
                    <i 
                     onclick="riproduciCanzone(
                      this,
                      \`${response.tracks.data[x].preview}\`,
                      \`${response.tracks.data[x].title}\`,
                      \`${response.tracks.data[x].artist.name}\`,
                      \`${response.cover_small}\`,
                      \`${response.cover_big}\`,
                      \`${response.artist.picture_big}\`,
                      \`${response.artist.id}\`,
                      \`${response.artist.tracklist}\`,
                      \`${response.tracks.data[x].explicit_lyrics}\`,
                      \`${response.tracks.data[x].duration}\`,
                      \`${response.tracks.data[x].id}\`,
                      \`${response.id}\`
                    )"
                     class="fas fa-play text-light icona fs-4"></i>
                </div>
                <div class="col-9">
                  <p class="m-0">${titoloCanzone}</p>
                  <i class="bi bi-explicit-fill ${explicit}"></i>
                  <span class="text-secondary small">${artista}</span>
                </div>
                <div class="col-1 text-end">
                  <i class="bi bi-plus-circle icona fs-4 btn-aggiungi"
                  onclick="salvaCanzone(this, \`${response.tracks.data[x].preview}\`, \`${response.tracks.data[x].title}\`, \`${response.tracks.data[x].artist.name}\`, \`${response.cover_small}\`, \`${response.cover_big}\`, \`${response.artist.picture_big}\`, \`${response.artist.id}\`, \`${response.artist.tracklist}\`, \`${response.tracks.data[x].explicit_lyrics}\`, \`${response.tracks.data[x].duration}\`, \`${response.id}\`, \`${response.tracks.data[x].id}\`)"
                  data-id="${response.tracks.data[x].id}"
                  ></i>
                </div>
                <div class="col-1 text-center">
                  <p class="m-0">${minuti}:${secondi}</p>
                </div>
              </div>
                  `;

        const diritti = response.tracks.data[x].title;
      }
      preferitiEsistenti();
      const inputAudio = document.querySelector("audio");

      // Prendiamo la prima canzone dell'album
      const primaCanzone = response.tracks.data[1];
      const iconaPlayGrande = document.querySelector(".bi-play-circle-fill");

      // Gestiamo il click sul tasto Play
      iconaPlayGrande.onclick = function () {
        // Lanciamo funzione per far partire l'audio
        riproduciCanzone(
          this,
          primaCanzone.preview,
          primaCanzone.title,
          primaCanzone.artist.name,
          response.cover_small,
          response.cover_big,
          response.artist.picture_big,
          response.artist.id,
          response.artist.tracklist,
        );

        // Cambiamo l'icona in base a se l'audio è partito o no
        setTimeout(() => {
          if (inputAudio.paused) {
            this.classList.remove("bi-pause-circle-fill");
            this.classList.add("bi-play-circle-fill");
          } else {
            this.classList.remove("bi-play-circle-fill");
            this.classList.add("bi-pause-circle-fill");
          }
        }, 100);
      };
    })
    .catch((err) => {
      console.log("errore nella fetch", err);
    });
};
estrazioneArtista();

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
    `;

    item.addEventListener("click", () => {
      // loadSong(song)
      searchResults.style.display = "none";
      searchInput.value = "";
    });

    listContainer.appendChild(item);
  });

  searchResults.appendChild(listContainer);
  preferitiEsistenti();
};

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
  // if (!bottonePlay) return; // Se il bottone non esiste, non provare a cambiargli classe
  const inputAudio = document.getElementById("audio");
  const playBtn = document.getElementById("playPauseBtn");

  if (inputAudio.src === audioCanzone) {
    if (inputAudio.paused) {
      inputAudio.play();
      iconaPlay.classList.replace("fa-play", "fa-pause");
      playBtn.classList.replace("bi-play-circle-fill", "bi-pause-circle-fill");
    } else {
      inputAudio.pause();
      iconaPlay.classList.replace("fa-pause", "fa-play");
      playBtn.classList.replace("bi-pause-circle-fill", "bi-play-circle-fill");
    }
  } else {
    inputAudio.src = audioCanzone;
    inputAudio.play();
    iconaPlay.classList.replace("fa-play", "fa-pause");
    playBtn.classList.replace("bi-play-circle-fill", "bi-pause-circle-fill");
  }

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

  const placeholder = document.querySelectorAll(".placeholder");
  console.log(placeholder);
  for (let i = 0; i < placeholder.length; i++) {
    placeholder[i].classList.remove("placeholder");
    console.log(placeholder[i]);
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
  console.log(
    "cdf",
    titoloCanzone,
    copertinaPiccola,
    copertinaGrande,
    nome,
    fotoProfiloArtista,
    ascoltatoriMensili,
    fotoArtista,
  );

  for (let i = 0; i < nome.length; i++) {
    nome[i].innerHTML = `${nomeArtista}`;
    // const linkPadre = nome[i].closest("a");
    // if (linkPadre) {
    //   linkPadre.href = `artistView.html?id=${linkArtista}`;
    //   console.log("Link generato per artista:", linkPadre.href);
    // }
  }
  for (let i = 0; i < titoloCanzone.length; i++) {
    titoloCanzone[i].innerHTML = `${titolo}`;
    // const linkPadre = titoloCanzone[i].closest("a");
    // if (linkPadre) {
    //   linkPadre.href = `albumView.html?id=${idAlbum}`;
    // }
  }
  for (let i = 0; i < copertinaPiccola.length; i++) {
    copertinaPiccola[i].setAttribute("src", copertinaSmall);
  }
  for (let i = 0; i < copertinaGrande.length; i++) {
    copertinaGrande[i].setAttribute("src", copertinaBig);
  }

  fetch(urlArtista + linkArtista)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("errore nella response");
      }
    })
    .then((data) => {
      console.log("22", data);
      ascoltatoriMensili.innerHTML = `${data.nb_fan.toLocaleString()}`;
      fotoProfiloArtista.setAttribute("src", data.picture_big);
    })
    .catch((err) => {
      console.log("errore nella fetch", err);
    });

  fetch(
    "https://striveschool-api.herokuapp.com/api/deezer/artist/" +
      linkArtista +
      "/top?limit=50",
  )
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
      `;
    })
    .catch((err) => {
      console.log("errore nella fetch", err);
    });
};

// AGGIUNGI QUESTO IN FONDO AL FILE JS
const attivaSensoreSfondo = function () {
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
};

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

  for (let i = 0; i < btnAggiungi.length; i++) {
    btnAggiungi[i].classList.replace("bi-plus-circle", "bi-check-circle-fill");
    btnAggiungi[i].classList.add("text-success");
  }
  // SE NON ESISTE:
  if (esiste === -1) {
    braniPreferiti.push(datiCanzone);
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

  document.querySelectorAll("[data-id]").forEach((icon) => {
    const id = Number(icon.dataset.id);

    const trovato = braniPreferiti.some((b) => Number(b.idBrano) === id);

    if (trovato) {
      icon.classList.replace("bi-plus-circle", "bi-check-circle-fill");
      icon.classList.add("text-success");
    } else {
      icon.classList.replace("bi-check-circle-fill", "bi-plus-circle");
      icon.classList.remove("text-success");
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
    carouselPrev.classList.add("opacity-0");
    carouselNext.classList.add("opacity-0");
  } else {
    console.log(
      "Dimensione schermo maggiore a 991px metto i rounded sul main-section",
    );
    mainSection.classList.add("rounded-4");
    carouselPrev.classList.remove("opacity-0");
    carouselNext.classList.remove("opacity-0");
  }
};
document.addEventListener("DOMContentLoaded", () => {
  togliRounded(mobileView);
  mobileView.addEventListener("change", togliRounded);
});

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
