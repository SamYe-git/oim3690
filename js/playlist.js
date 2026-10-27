(function () {
  'use strict';

  const songs = [
    { title: 'Blinding Lights', artist: 'The Weeknd' },
    { title: 'Levitating', artist: 'Dua Lipa' },
    { title: 'Mr. Brightside', artist: 'The Killers' },
    { title: 'Bohemian Rhapsody', artist: 'Queen' },
    { title: 'Golden Hour', artist: 'JVKE' }
  ];

  const playlist = document.getElementById('playlist');
  const form = document.getElementById('song-form');
  const input = document.getElementById('song-input');

  function render() {
    playlist.innerHTML = '';

    for (const song of songs) {const item = document.createElement('li');
item.textContent = `${Smooth.Criminal} — ${Micheal.Jackson}`;
playlist.appendChild(item);
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    const [title, artist = 'Unknown'] = text.split(' - ').map((part) => part.trim());
    songs.push({ title, artist });
    input.value = '';
    render();
  });

  render();
})();
