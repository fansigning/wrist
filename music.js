// music.js
const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volumeBtn = document.getElementById("volume-btn");
const songTitle = document.getElementById("song-title");
const songTitle2 = document.getElementById("song-title2");
const songTitle3 = document.getElementById("song-title3");

const songs = [
  {
    title: "overseas - Ken Carson",
    src: "mp3/overseas.mp3",
    element: songTitle,
  },
  { title: "south - jaydes", src: "mp3/south.mp3", element: songTitle2 },
  { title: "potent - otuka", src: "mp3/potent.mp3", element: songTitle3 },
];

let currentSongIndex = 0;

// Autoplay
function autoplayMusic() {
  audio
    .play()
    .then(() => {
      playBtn.classList.replace("mdi-play", "mdi-pause");
    })
    .catch((error) => {
      console.error("Autoplay blocked.");
    });
}

// Format time
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

// Time updates
audio.addEventListener("loadedmetadata", () => {
  durationEl.textContent = formatTime(audio.duration);
  progress.max = audio.duration;
});

audio.addEventListener("timeupdate", () => {
  progress.value = audio.currentTime;
  currentTimeEl.textContent = formatTime(audio.currentTime);
});

progress.addEventListener("input", () => {
  audio.currentTime = progress.value;
});

playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playBtn.classList.replace("mdi-play", "mdi-pause");
  } else {
    audio.pause();
    playBtn.classList.replace("mdi-pause", "mdi-play");
  }
});

// Volume button
volumeBtn.addEventListener("click", () => {
  audio.muted = !audio.muted;

  if (audio.muted) {
    volumeBtn.classList.replace("mdi-volume-high", "mdi-volume-off");
  } else {
    volumeBtn.classList.replace("mdi-volume-off", "mdi-volume-high");
  }
});

audio.volume = 0.13;

// next
function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
}

// previous
function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
}

// Load
function loadSong(index) {
  songTitle.classList.add("hidden");
  songTitle2.classList.add("hidden");
  songTitle3.classList.add("hidden");

  // song title
  songs[index].element.classList.remove("hidden");
  songTitle.textContent = songs[index].title;

  // audio source
  audio.src = songs[index].src;
  audio.play();
  playBtn.classList.replace("mdi-play", "mdi-pause");
}

audio.addEventListener("ended", () => {
  nextSong();
});

// next, previous
document.getElementById("next").addEventListener("click", nextSong);
document.getElementById("prev").addEventListener("click", prevSong);
