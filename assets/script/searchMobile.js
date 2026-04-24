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

const gridContainer = document.getElementById("grid-container");

// funzione che crea tutte le grid

for (let i = 1; i <= 52; i++) {
  let extension = "jpg";
  if (i >= 42 && i <= 45) extension = "png";
  if ([1, 13, 25, 37, 46, 48].includes(i)) extension = "jpeg";

  const cardHtml = `
    <div class="col">
      <div class="card-spotify p-1 h-100 rounded-2">
        <img src="./assets/imgs/search/image-${i}.${extension}" class="img-fluid w-100 rounded-2">
      </div>
    </div>
  `;

  gridContainer.innerHTML += cardHtml;
}

// funzione da chiamare per aggiornare le icone

const aggiornaIcone = (isPlaying, iconaLista, iconaFooter) => {
  const iconaAttuale = iconaLista.querySelector("i") || iconaLista;

  if (isPlaying) {
    iconaAttuale.className = "bi bi-pause-fill text-white fs-4";
    if (iconaFooter)
      iconaFooter.classList.replace("bi-play-fill", "bi-pause-fill");
  } else {
    iconaAttuale.className = "bi bi-play-fill text-white fs-4";
    if (iconaFooter)
      iconaFooter.classList.replace("bi-pause-fill", "bi-play-fill");
  }
};

// funzione riproduzione canzone

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
  const mobilePlayer = document.getElementById("mobile-player");
  const inputAudio = mobilePlayer.querySelector("audio");
  const imgPlayer = mobilePlayer.querySelector("img");
  const testoPlayer = mobilePlayer.querySelector("span");
  const playBtnFooter = mobilePlayer.querySelector(
    ".bi-play-fill, .bi-pause-fill",
  );

  if (inputAudio.src === audioCanzone) {
    if (inputAudio.paused) {
      inputAudio.play();
      aggiornaIcone(true, iconaPlay, playBtnFooter);
    } else {
      inputAudio.pause();
      aggiornaIcone(false, iconaPlay, playBtnFooter);
    }
  } else {
    inputAudio.src = audioCanzone;
    inputAudio.play();
    imgPlayer.src = copertinaSmall;
    testoPlayer.innerHTML = `<strong>${titolo}</strong> • ${nomeArtista}`;

    aggiornaIcone(true, iconaPlay, playBtnFooter);
  }
};

// funzione search

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
          onclick="event.stopPropagation(); riproduciCanzone(this, \`${song.preview}\`, \`${song.title.replace(/'/g, "\\'")}\`, \`${song.artist.name.replace(/'/g, "\\'")}\`, \`${song.album.cover_small}\`, \`${song.album.cover_big}\`, \`${song.artist.picture_big}\`, \`${song.artist.id}\`, \`${song.artist.tracklist}\`, \`${song.explicit_lyrics}\`, \`${song.duration}\`, \`${song.id}\`, \`${song.album.id}\`)">
          <i class="bi bi-play-fill text-white fs-6"></i>
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

// asd

const footerPlayer = () => {
  const mobilePlayer = document.getElementById("mobile-player");
  const playBtnFooter = mobilePlayer.querySelector(
    ".bi-play-fill, .bi-pause-fill",
  );
  const inputAudio = mobilePlayer.querySelector("audio");

  playBtnFooter.addEventListener("click", (e) => {
    e.stopPropagation();

    if (!inputAudio.src) return;

    if (inputAudio.paused) {
      inputAudio.play();
      const iconaLista = document.querySelector(
        `[onclick*="${inputAudio.src}"] i`,
      );
      aggiornaIcone(true, iconaLista, playBtnFooter);
    } else {
      inputAudio.pause();
      const iconaLista = document.querySelector(
        `[onclick*="${inputAudio.src}"] i`,
      );
      aggiornaIcone(false, iconaLista, playBtnFooter);
    }
  });
};

footerPlayer();
