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
    // cambiamo il testo delle sezioni artista e numero ascoltatori
    document.getElementById("nome-artista").innerText = artista.name
    document.getElementById("fan-artista").innerText =
      artista.nb_fan.toLocaleString() // toLocaleString aggiunge i puntini ai numeri grandi
    // cambiamo l'immagine del banner
    const banner = document.getElementById("artist-banner")
    banner.style.backgroundImage = "url('" + artista.picture_xl + "')"
    banner.style.backgroundSize = "cover"
    banner.style.backgroundPosition = "center"
    banner.style.backgroundRepeat = "no-repeat"
    // cambiamo le canzoni (tracklist)
    fetch(artista.tracklist)
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else throw new Error("errore nella fetch")
      })
      .then((datiCanzoni) => {
        const canzoni = datiCanzoni.data
        const contenitore = document.getElementById("lista-canzoni")
        // Puliamo il contenitore prima di iniziare il ciclo
        contenitore.innerHTML = ""
        // Inizio un ciclo for per inserire le prime canzoni
        for (let i = 0; i < 10 && i < canzoni.length; i++) {
          const traccia = canzoni[i]
          // Calcolo minuti e secondi (es. 200 secondi -> 3:20)
          const minuti = Math.floor(traccia.duration / 60)
          const secondi = (traccia.duration % 60).toString().padStart(2, "0")
          const rigaHTML = `
            <div class="row align-items-center py-2 text-secondary-emphasis hover-bg-grey">
              <div class="col-auto" style="width: 30px">
                <span class="text-secondary">${i + 1}</span>
              </div>
              <div class="col-auto p-0">
                <img src="${traccia.album.cover_small}" class="rounded" alt="cover" />
              </div>
              <div class="col ps-3">
                <div class="text-white fw-bold d-block">${traccia.title}</div>
                <small class="text-secondary"><i class="bi bi-play-btn me-1"></i>Video musicale</small>
              </div>
              <div class="col-auto d-none d-md-block text-secondary">
                ${traccia.rank.toLocaleString()}
              </div>
              <div class="col-auto text-secondary ps-5">${minuti}:${secondi}</div>
            </div>
          `
          // Aggiungiamo la riga al contenitore
          contenitore.innerHTML += rigaHTML
        }
      })
      .catch((error) => console.log("Errore connessione server", error))
  })
