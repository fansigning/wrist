const overlay = document.getElementById('overlay');
const discordPfp = document.getElementById('discord-pfp');
const click = document.getElementById('click');
const discordNameEl = document.getElementById('discord-name');

// Fetch Discord data
fetch('https://stash.seraph.si/discord/user/1239374720693178398')
  .then((res) => res.json())
  .then((data) => {
    discordPfp.src = data.extra.avatar_url;
    discordNameEl.textContent = data.user.global_name || data.user.username;
    discordPfp.onload = () => {
      overlay.classList.replace('bg-black', 'bg-black/80');
    };
  })
  .catch((err) => {
    console.error('Error fetching Discord data:', err);
    discordNameEl.textContent = 'failed to load';
  });

// Overlay click → reveal + optional autoplay
overlay.addEventListener('click', () => {
  overlay.classList.replace('bg-black/80', 'bg-black/0');
  overlay.classList.remove('backdrop-blur-sm');
  overlay.classList.add('pointer-events-none');
  click.classList.add('opacity-0');

  if (typeof autoplayMusic === 'function') autoplayMusic();

  setTimeout(() => {
    overlay.classList.add('hidden');
  }, 700);
});
