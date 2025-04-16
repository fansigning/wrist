const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeBtn = document.getElementById('volume-btn');

let audioContext;
let analyser;

// format time
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// time updates
audio.addEventListener('loadedmetadata', () => {
  durationEl.textContent = formatTime(audio.duration);
  progress.max = audio.duration;
});

audio.addEventListener('timeupdate', () => {
  progress.value = audio.currentTime;
  currentTimeEl.textContent = formatTime(audio.currentTime);
});

progress.addEventListener('input', () => {
  audio.currentTime = progress.value;
});

playBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playBtn.classList.replace('mdi-play', 'mdi-pause');
  } else {
    audio.pause();
    playBtn.classList.replace('mdi-pause', 'mdi-play');
  }
});

// Volume button
volumeBtn.addEventListener('click', () => {
  audio.muted = !audio.muted;

  if (audio.muted) {
    volumeBtn.classList.replace('mdi-volume-high', 'mdi-volume-off');
  } else {
    volumeBtn.classList.replace('mdi-volume-off', 'mdi-volume-high');
  }
});

audio.volume = 0.13;

overlay.addEventListener('click', () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    const sourceNode = audioContext.createMediaElementSource(audio);

    const bassBoost = audioContext.createBiquadFilter();
    bassBoost.type = "lowshelf";
    bassBoost.frequency.setValueAtTime(100, audioContext.currentTime);
    bassBoost.gain.setValueAtTime(15, audioContext.currentTime);

    sourceNode.connect(bassBoost);
    bassBoost.connect(analyser);
    analyser.connect(audioContext.destination);
  }

  audio.play().then(() => {
    playBtn.classList.replace('mdi-play', 'mdi-pause');
  }).catch((error) => {
    console.error("Autoplay blocked.");
  });
});