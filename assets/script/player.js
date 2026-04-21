// Progress bar traccia audio----------------------------------------------------------------------------------

const audio = document.getElementById("audio");
const progressBar = document.getElementById("progress-bar");
const currentTimeEl = document.getElementById("time-now");
const durationEl = document.getElementById("time-max");
const playBtn = document.getElementById("playPauseBtn");
const mute = document.getElementById("mute");
const volumeSlider = document.getElementById("volumeSlider");

let lastVolume = 0.8;
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
    iconMute.classList.remove("bi-volume-up");
    iconMute.classList.add("bi-volume-mute");
  } else {
    iconMute.classList.remove("bi-volume-mute");
    iconMute.classList.add("bi-volume-up");
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
audio.volume = 0.8;
volumeSlider.value = 80;
