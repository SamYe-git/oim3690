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

  function render() {
    playlist.innerHTML = '';

    songs.forEach((song) => {
      const item = document.createElement('li');
      item.textContent = `${song.title} — ${song.artist}`;
      playlist.appendChild(item);
    });
  }

  render();
})();
