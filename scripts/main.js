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

/**
 * Load Page Content
 */
function loadContent() {
    fetch('../configs/content.json')
      .then((response) => response.json())
      .then((content) => {
        document.title = content.title;
        document.querySelector('header h1').textContent = content.header.h1;
  
        const navButtons = document.querySelectorAll('.nav-button');
        navButtons[0].textContent = content.nav.about;
        navButtons[1].textContent = content.nav.music;
        navButtons[2].textContent = content.nav.contact;
  
        document.querySelector('#hero h2 span').textContent = content.hero.h2;
  
        const aboutSection = document.querySelector('#about');
        aboutSection.querySelector('h2').textContent = content.about.h2;
        aboutSection.querySelectorAll('p')[0].textContent = content.about.p1;
        aboutSection.querySelectorAll('p')[1].textContent = content.about.p2;
  
        const musicSection = document.querySelector('#music');
        musicSection.querySelector('#player h2').textContent = content.music.player.h2;
        musicSection.querySelector('.now-playing-label').textContent = content.music.player.nowPlayingLabel;
        musicSection.querySelector('#playlist h2').textContent = content.music.playlist.h2;
  
        const contactSection = document.querySelector('#contact');
        contactSection.querySelector('#wordle h2').textContent = content.contact.wordle.h2;
        contactSection.querySelector('#contact-form h2').textContent = content.contact.contactForm.h2;
        contactSection.querySelector('#contact-form p').textContent = content.contact.contactForm.p;
        contactSection.querySelector('label[for="name"]').textContent = content.contact.contactForm.labelName;
        contactSection.querySelector('label[for="email"]').textContent = content.contact.contactForm.labelEmail
        contactSection.querySelector('label[for="message"]').textContent = content.contact.contactForm.labelMessage;

        document.querySelector('footer p').innerHTML = content.footer.p;
      });
  }
  
  document.addEventListener('DOMContentLoaded', loadContent);
/**
 * End Load Page Content
 */
  