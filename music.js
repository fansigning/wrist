const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeBtn = document.getElementById('volume-btn');
const overlay = document.getElementById('overlay');

// AudioContext 
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioContext.createAnalyser();
const sourceNode = audioContext.createMediaElementSource(audio);

// Bass Boost 
const bassBoost = audioContext.createBiquadFilter();
bassBoost.type = "lowshelf"; // Lowshelf filter type for boosting bass
bassBoost.frequency.setValueAtTime(100, audioContext.currentTime); // Set the cutoff frequency for bass
bassBoost.gain.setValueAtTime(15, audioContext.currentTime); // Boost the bass by 15dB

// Connect
sourceNode.connect(bassBoost);
bassBoost.connect(analyser);
analyser.connect(audioContext.destination);

audio.volume = 0.13;

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
    audio.muted = !audio.muted; // Toggle mute

    if (audio.muted) {
        volumeBtn.classList.remove('mdi-volume-high');
        volumeBtn.classList.add('mdi-volume-off');
    } else {
        volumeBtn.classList.remove('mdi-volume-off');
        volumeBtn.classList.add('mdi-volume-high');
    }
});

overlay.addEventListener('click', () => {
    audio.play().then(() => {
        playBtn.classList.replace('mdi-play', 'mdi-pause');
        overlay.classList.replace('opacity-100', 'opacity-0');

        overlay.style.pointerEvents = 'none';

        setTimeout(() => {
            overlay.style.display = 'none';
        }, 700);

    }).catch((error) => {
        console.error("Autoplay was blocked, user action required.");
    });
});
