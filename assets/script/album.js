const parametri = new URLSearchParams(location.search);
const IDalbum = parametri.get("id");

const estrazioneArtista = () => {
  fetch("https://striveschool-api.herokuapp.com/api/deezer/album/" + IDalbum)
    .then((response) => {
      if (response.ok) {
        console.log("response ok");
        return response.json();
      } else {
        console.log("response not ok");
        throw new error("errore nella response");
      }
    })
    //   ------------------------------------------------------------------------COMPILAZIONE INFO PRINCIPALI
    .then((response) => {
      console.log(response);
      const fotoAlbum = document.querySelector("#albumCover");
      fotoAlbum.setAttribute("src", `${response.cover}`);
      const titoloAlbum = document.querySelector("#albumTitle");
      titoloAlbum.innerHTML = `${response.title}`;
      const fotoArtista = document.querySelector("#artistImage");
      fotoArtista.setAttribute("src", `${response.artist.picture}`);
      const nomeArtista = document.querySelectorAll(".artistName");
      for (x = 0; x < nomeArtista.length; x++) {
        nomeArtista[x].innerText = `${response.artist.name}`;
      }
      fotoArtista.setAttribute("src", `${response.artist.picture}`);
      const dateReleseAlbum = document.querySelectorAll(".albumReleaseDate");
      for (x = 0; x < dateReleseAlbum.length; x++) {
        dateReleseAlbum[x].innerText = `${response.release_date}`;
      }
      const numBraniAlbum = document.querySelector("#albumNumberOfSongs");
      numBraniAlbum.innerText = `${response.nb_tracks}`;
      const durataAlbum = document.querySelector("#albumDuration");
      durataAlbum.innerText = `${response.duration / 60}`;
      const stories = document.querySelector("#artistStories");
      stories.setAttribute("src", `${response.artist.picture_small}`);
      //   ------------------------------------------------------------------------DISPONGO BRANI
      for (x = 0; x < response.tracks.data.length; x++) {
        const numeroCanzone = x + 1;
        const titoloCanzone = response.tracks.data[x].title;
        //   ------------------------------------------------------------------------LINK ALTRI ARTISTI
        // if (titoloCanzone.includes("feat.")) {
        //   const ausiliare = titoloCanzone.split("feat.");
        //   let altriArtisti = ausiliare[1].replace(")", "").trim();
        //   const singoloArtista = altriArtisti.split(",");
        //   for (x = 0; x < singoloArtista.length; x++) {
        //     (fetch(
        //       "https://striveschool-api.herokuapp.com/api/deezer/search?q=" +
        //         singoloArtista[x],
        //     ),
        //       {}
        //         .then((response) => {
        //           return response.json();
        //         })
        //         .then((response) => {
        //           console.log(response);
        //         })
        //         .catch());
        //     const a = document.createElement("a");
        //     a.setAttribute("class", "fw-lighter text-secondary d-inline-block");
        //   }

        //   a.setAttribute(
        //     "href",
        //     `artistView.html?id=${data.data[i].artist.id}`,
        //   );
        //   titoloCanzone[1];
        // }
        //   ------------------------------------------------------------------------fine LINK ALTRI ARTISTI
        const riproduzioniCanzone = response.tracks.data[x].rank;
        const durataCanzone = response.tracks.data[x].duration;
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${numeroCanzone}</td>
                  <td>${titoloCanzone}</td>
                  <td>${riproduzioniCanzone}</td>
                  <td>${durataCanzone}</td>`;
        const appendilo = document.querySelector("tbody");
        appendilo.appendChild(tr);
      }
      const diritti = response.tracks.data[x].title;
    })
    .catch(console.log("errore della request"));
};
estrazioneArtista();
