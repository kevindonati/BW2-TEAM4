const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const urlSearch2 =
  "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

// Funzione di ricerca
const performSearch = (query) => {
  if (query.length < 2) {
    searchResults.style.display = "none"; // se il risultato ricerca è minore di 2 elementi avrà display none
    return;
  }

  fetch(urlSearch2 + query)
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
      "d-flex align-items-center p-2 song-card-container border-bottom border-secondary border-opacity-25";
    item.style.cursor = "pointer";

    item.innerHTML = `
      <div class="position-relative me-3" style="width: 50px; height: 50px; flex-shrink: 0;">
        <img src="${song.album.cover_small}" class="img-fluid rounded shadow-sm" alt="${song.title}">
        <!-- Tasto play mini che appare sull'immagine -->
        <div class="mostra-al-passaggio position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center rounded" style="background: rgba(0,0,0,0.5)">
           <i class="fas fa-play text-white fs-6"></i>
        </div>
      </div>
      <div class="flex-grow-1 text-truncate">
        <p class="mb-0 text-white fw-bold text-truncate" style="font-size: 0.9rem;">${song.title}</p>
        <p class="mb-0 text-secondary text-truncate" style="font-size: 0.8rem;">${song.artist.name}</p>
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

// Funzione per collegare i dati al footer
const loadSong = (song) => {
  const audio = document.getElementById("audio");
  const songName = document.getElementById("song-name");
  const artistName = document.getElementById("artist-name");
  const playerImg = document.querySelector("#player-img img");

  audio.src = song.preview;
  songName.innerText = song.title;
  artistName.innerText = song.artist.name;
  playerImg.src = song.album.cover_small;

  audio.play();
  const playBtn = document.getElementById("playPauseBtn");
  playBtn.classList.replace("bi-play-circle-fill", "bi-pause-circle-fill");
};
