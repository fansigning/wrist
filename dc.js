fetch('https://stash.seraph.si/discord/user/1239374720693178398')
    .then(res => res.json())
    .then(data => {
        // Discord profile picture and name
        document.getElementById('discord-pfp').src = data.extra.avatar_url;
        document.getElementById('discord-name').textContent = data.user.global_name || data.user.username;

        setTimeout(() => {
            const overlay = document.getElementById('overlay');
            overlay.classList.replace('bg-black', 'bg-black/80');
        }, 100); 
    })
    .catch(err => {
        console.error('Error fetching Discord data:', err);
        document.getElementById('discord-name').textContent = 'failed to load';
    });

// overlay
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
