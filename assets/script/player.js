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

const playBtn = document.querySelector(".bi-play-circle-fill");

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
