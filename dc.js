fetch('https://stash.seraph.si/discord/user/1239374720693178398')
    .then(res => res.json())
    .then(data => {
        document.getElementById('discord-pfp').src = data.extra.avatar_url;
        document.getElementById('discord-name').textContent = data.user.global_name || data.user.username;
    })
    .catch(err => {
        console.error('Error fetching Discord data:', err);
        document.getElementById('discord-name').textContent = 'failed to load';
    });