'use strict';
const $ = (selector) => document.querySelector(selector);
// An abstract sound sculpture, drawn as latitude lines on a gently warped sphere.
const lines = $('#sculpture-lines');
for (let row = -42; row <= 42; row++) {
  const latitude = row / 43 * Math.PI / 2;
  const radius = Math.cos(latitude) * 285;
  let path = '';
  for (let point = 0; point <= 180; point++) {
    const angle = point / 180 * Math.PI * 2;
    const ripple = Math.sin(angle * 3 + latitude * 5) * 7 * Math.cos(latitude);
    const x = 400 + Math.cos(angle) * (radius + ripple);
    const y = 400 + Math.sin(latitude) * 275 + Math.sin(angle) * radius * .25;
    path += `${point ? 'L' : 'M'}${x.toFixed(2)},${y.toFixed(2)} `;
  }
  const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  line.setAttribute('d', path + 'Z');
  line.setAttribute('opacity', String(.35 + Math.cos(latitude) * .6));
  lines.append(line);
}
const menu = $('.menu-toggle');
const navigation = $('#navigation');
function closeMenu() { navigation.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); }
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); navigation.classList.toggle('open', open); });
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && navigation.classList.contains('open')) { closeMenu(); menu.focus(); } });
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const motionButton = $('#motion-toggle');
let motionPaused = reducedMotion.matches;
function renderMotion() { document.body.classList.toggle('motion-paused', motionPaused); motionButton.setAttribute('aria-pressed', String(motionPaused)); motionButton.setAttribute('aria-label', motionPaused ? 'Resume visual animation' : 'Pause visual animation'); motionButton.textContent = motionPaused ? 'Motion paused ▶' : 'Pause motion Ⅱ'; }
renderMotion();
motionButton.addEventListener('click', () => { motionPaused = !motionPaused; renderMotion(); });
reducedMotion.addEventListener('change', event => { motionPaused = event.matches; renderMotion(); });
$('#year').textContent = new Date().getFullYear();
const descriptions = [
  ['Texture / Space / Emotion', 'Room to breathe. Textures that pull you into the frame.'],
  ['Scale / Tension / Release', 'A bigger canvas. Music for the story’s defining moments.'],
  ['Groove / Motion / Color', 'Forward motion, bright grooves and a little electricity.'],
  ['Character / Play / Surprise', 'A raised eyebrow. An unexpected turn. A lighter touch.'],
  ['Impact / Drive / Power', 'Cinematic weight meets the unmistakable pulse of hip hop.'],
  ['Rhythm / Soul / Attitude', 'Rooted in rhythm. Built around a feeling.'],
  ['Warmth / Wonder / Joy', 'A little wonder for the moments that bring us together.'],
  ['Melody / Voice / Story', 'Melodies and voices that give the story another dimension.']
];
let playlists = [];
let selectedIndex = 0;
let frame = null;
let loadingTimer;
function loadPlayer() {
  const current = playlists[selectedIndex];
  if (!current) return;
  clearTimeout(loadingTimer);
  $('#player-status').textContent = 'Loading the player. If it doesn’t appear, open this collection in DISCO.';
  const nextFrame = document.createElement('iframe');
  nextFrame.id = 'disco-playlist';
  nextFrame.title = `Key South — ${current.name} music player`;
  nextFrame.allow = 'autoplay';
  nextFrame.addEventListener('load', () => { if (frame !== nextFrame) return; clearTimeout(loadingTimer); $('#player-status').textContent = 'Press play in the player to listen. Player unavailable? Use “Open in DISCO.”'; });
  nextFrame.src = current.url;
  frame = nextFrame;
  $('#player-shell').replaceChildren(nextFrame);
  loadingTimer = setTimeout(() => { $('#player-status').textContent = 'The player is taking longer than usual. You can open this collection in DISCO above.'; }, 12000);
}
function selectCollection(index) {
  selectedIndex = index;
  const current = playlists[index];
  document.querySelectorAll('.collection-button').forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
  $('#playlist-name').textContent = current.name;
  $('#collection-number').textContent = `VOL. ${String(index + 1).padStart(2, '0')}`;
  $('#collection-tags').textContent = descriptions[index][0].toUpperCase();
  $('#collection-art').dataset.mood = String(index);
  $('.collection-orbit').style.transform = `rotate(${-25 + index * 20}deg) scaleY(${.7 + index % 3 * .1})`;
  $('#external-playlist').href = current.url;
  if (frame) loadPlayer();
  else { $('#collection-description').textContent = descriptions[index][1]; $('#load-player').textContent = `Listen to ${current.name} ▶`; }
}
async function loadCollections() {
  try {
    const response = await fetch('configs/playlists.json');
    if (!response.ok) throw new Error('Unable to load collections');
    playlists = await response.json();
    if (!Array.isArray(playlists) || playlists.length !== descriptions.length || playlists.some(p => typeof p.name !== 'string' || !/^https:\/\/ensource-one-llc\.disco\.ac\//.test(p.url))) throw new Error('Invalid collection data');
    $('#playlist-container').replaceChildren();
    playlists.forEach((playlist, index) => {
      const button = document.createElement('button');
      button.className = 'collection-button';
      button.type = 'button';
      button.setAttribute('aria-pressed', String(index === 0));
      button.setAttribute('aria-controls', 'collection-art player-shell');
      const number = document.createElement('span'); number.className = 'collection-index'; number.textContent = String(index + 1).padStart(2, '0');
      const title = document.createElement('span'); title.className = 'collection-title'; title.textContent = playlist.name;
      const subtitle = document.createElement('span'); subtitle.className = 'collection-subtitle'; subtitle.textContent = descriptions[index][0]; title.append(subtitle);
      const arrow = document.createElement('span'); arrow.className = 'collection-arrow'; arrow.textContent = '↗'; arrow.setAttribute('aria-hidden', 'true');
      button.append(number, title, arrow); button.addEventListener('click', () => selectCollection(index)); $('#playlist-container').append(button);
    });
    $('#load-player').addEventListener('click', loadPlayer);
  } catch (error) {
    $('#playlist-container').textContent = 'The collections couldn’t load. Refresh this page, or listen directly using the DISCO link.';
    $('#load-player').hidden = true;
    $('#player-status').textContent = 'You can still open the Atmospheric collection in DISCO above.';
  }
}
loadCollections();
const form = $('#contact-form');
form.addEventListener('submit', async event => {
  event.preventDefault();
  if (!form.reportValidity() || form.elements._gotcha.value) return;
  const button = $('#form-submit');
  const feedback = $('#form-feedback');
  if (button.disabled) return;
  button.disabled = true;
  button.textContent = 'Sending your brief…';
  feedback.textContent = '';
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' }, signal: controller.signal });
    if (!response.ok) throw new Error('Submission failed');
    form.reset();
    feedback.textContent = 'Thanks—your brief is in. I’ll be in touch soon.';
  } catch (error) {
    feedback.textContent = error.name === 'AbortError' ? 'Delivery couldn’t be confirmed. Your brief is still here; email keysouthatl@gmail.com before trying again.' : 'Your brief couldn’t be sent. Please try again or email keysouthatl@gmail.com. Your message is still here.';
  } finally {
    clearTimeout(timer);
    button.disabled = false;
    button.textContent = 'Send your brief ↗';
  }
});
