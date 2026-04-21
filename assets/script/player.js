// Progress bar traccia audio----------------------------------------------------------------------------------

const audio = document.getElementById("audio");
const progressBar = document.getElementById("progress-bar");
const currentTimeEl = document.getElementById("time-now");
const durationEl = document.getElementById("time-max");

audio.addEventListener("timeupdate", () => {
  const percentage = (audio.currentTime / audio.duration) * 100;
  progressBar.value = percentage;
  currentTimeEl.innerText = formatTime(audio.currentTime);
});

progressBar.addEventListener("input", () => {
  const clickTime = (progressBar.value / 100) * audio.duration;
  audio.currentTime = clickTime;
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

const playBtn = document.getElementById("playPauseBtn");

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

let barColore = "#ffffff";

const updateBar = () => {
  const percentage = (audio.currentTime / audio.duration) * 100;
  progressBar.style.background = `linear-gradient(to right, ${barColore} ${percentage}%, #4d4d4d ${percentage}%)`;
};

progressBar.addEventListener("mouseenter", () => {
  barColore = "#1db954";
  updateBar();
});

progressBar.addEventListener("mouseleave", () => {
  barColore = "#ffffff";
  updateBar();
});

audio.addEventListener("timeupdate", () => {
  if (!isNaN(audio.duration)) {
    const percentage = (audio.currentTime / audio.duration) * 100;
    progressBar.value = percentage;
    currentTimeEl.innerText = formatTime(audio.currentTime);
    updateBar();
  }
});

// Slider volume------------------------------------------------------------------------------------------------

const mute = document.getElementById("mute");
let lastVolume;

volumeSlider.addEventListener("input", (e) => {
  const value = e.target.value;
  audio.volume = value / 100;
  volumeSlider.style.background = `linear-gradient(to right, #1db954 ${value}%, #4d4d4d ${value}%)`;
});

mute.addEventListener("click", () => {
  if (audio.volume > 0) {
    lastVolume = audio.volume;
    audio.volume = 0;
    volumeSlider.value = 0;
  } else {
    audio.volume = lastVolume;
    volumeSlider = lastVolume * 100;
  }
  const value = volumeSlider.value;
  volumeSlider.style.background = `linear-gradient(to right, #1db954 ${value}%, #4d4d4d ${value}%)`;
});
