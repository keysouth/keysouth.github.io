/*
* Start Playlist functions
*/
function changePlaylist(newSrc, playlistName) {
    var iframe = document.getElementById('disco-playlist');
    var spinnerOverlay = document.getElementById('spinner-overlay');

    spinnerOverlay.style.display = 'block';

    iframe.onload = function() {
        spinnerOverlay.style.display = 'none';
    };

    iframe.src = newSrc;

    // Update the playlist name
    document.getElementById('playlist-name').textContent = playlistName;
}
function createPlaylistButtons() {
    const playlistContainer = document.getElementById('playlist-container');
  
    fetch('../configs/playlists.json')
      .then((response) => response.json())
      .then((playlists) => {
        playlists.forEach((playlist) => {
          const button = document.createElement('button');
          button.className = 'playlist-button';
          button.textContent = playlist.name;
  
          if (playlist.url) {
            button.onclick = () => changePlaylist(playlist.url, playlist.name);
          } else {
            button.setAttribute('disabled', 'disabled');
          }
  
          playlistContainer.appendChild(button);
        });
      })
      .catch((error) => {
        console.error('Error fetching playlists:', error);
      });
  }
  
  createPlaylistButtons();
/*
* End Playlist Sections
*/
  
/*
* Start Hero Sections
*/
function adjustHeroSectionHeight() {
    const heroSection = document.getElementById('hero');
    const img = new Image();
    img.src = heroSection.style.backgroundImage.slice(5, -2); // Extract the URL of the image from the inline style
    img.onload = function() {
        const imgWidth = this.width;
        const imgHeight = this.height;
        const aspectRatio = imgHeight / imgWidth;
        const viewportWidth = window.innerWidth;
        const sectionHeight = viewportWidth * aspectRatio;
        heroSection.style.height = sectionHeight + 'px';
    }
}
  
adjustHeroSectionHeight();
window.addEventListener('resize', adjustHeroSectionHeight);
/*
* End Hero Sections
*/
  
const anchors = document.querySelectorAll('a[href^="#"]');
  anchors.forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
});
  
/**
 * Some light validation
 */
const form = document.querySelector('form');
  form.addEventListener('submit', function(e) {
    const honeypot = document.getElementById('honeypot');
    if (honeypot.value) {
      e.preventDefault();
    }
  });
});
  