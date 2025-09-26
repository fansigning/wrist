const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeBtn = document.getElementById('volume-btn');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const songTitle = document.getElementById('song-title');
const songTitle2 = document.getElementById('song-title2');
const songTitle3 = document.getElementById('song-title3');

let currentSongIndex = 0;
const songs = [
  { title: 'overseas - Ken Carson', file: 'mp3/overseas.mp3' },
  { title: 'south - jaydes', file: 'mp3/south.mp3' },
  { title: 'potent - otuka', file: 'mp3/potent.mp3' },
];

// Format time
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Update progress
audio.addEventListener('loadedmetadata', () => {
  durationEl.textContent = formatTime(audio.duration);
  progress.max = audio.duration;
});

audio.addEventListener('timeupdate', () => {
  progress.value = audio.currentTime;
  currentTimeEl.textContent = formatTime(audio.currentTime);
});

// Change song bar
progress.addEventListener('input', () => {
  audio.currentTime = progress.value;
});

// Play/pause
playBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playBtn.classList.replace('mdi-play', 'mdi-pause');
  } else {
    audio.pause();
    playBtn.classList.replace('mdi-pause', 'mdi-play');
  }
});

// Volume
volumeBtn.addEventListener('click', () => {
  audio.muted = !audio.muted;

  if (audio.muted) {
    volumeBtn.classList.replace('mdi-volume-high', 'mdi-volume-off');
  } else {
    volumeBtn.classList.replace('mdi-volume-off', 'mdi-volume-high');
  }
});

audio.volume = 0.05;

// next
function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  updateSong();
  audio.play().then(() => {
    playBtn.classList.replace('mdi-play', 'mdi-pause');
  }).catch((error) => {
    console.error("Autoplay blocked.");
  });
}

// previous
function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  updateSong();
  audio.play().then(() => {
    playBtn.classList.replace('mdi-play', 'mdi-pause');
  }).catch((error) => {
    console.error("Autoplay blocked.");
  });
}

function updateSong() {
  const currentSong = songs[currentSongIndex];
  audio.src = currentSong.file;
  songTitle.textContent = currentSong.title;
  songTitle2.textContent = currentSong.title === songs[1].title ? 'South - Jaydes' : '';
  songTitle3.textContent = currentSong.title === songs[2].title ? 'Potent - Otuka' : '';
}

audio.addEventListener('ended', nextSong);

function autoplayMusic() {
  if (audio.paused) {
    updateSong();
    audio.play().then(() => {
      playBtn.classList.replace('mdi-play', 'mdi-pause');
    }).catch((error) => {
      console.error("Autoplay blocked.");
    });
  }
}

nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

updateSong();

