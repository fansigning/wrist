const pfp = document.getElementById('discord-pfp');
const name = document.getElementById('discord-name');

// Set placeholder first
pfp.src = 'https://placehold.co/150?text=%3C3';

// Fetch Discord info
fetch('https://stash.seraph.si/discord/user/1239374720693178398')
    .then(res => res.json())
    .then(data => {
        pfp.src = data.extra.avatar_url;
        name.textContent = data.user.global_name || data.user.username;
    })
    .catch(err => {
        console.error('Error fetching Discord data:', err);
        name.textContent = 'failed to load';
    });
