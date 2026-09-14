# Key South — redesign

The existing site has a clear composer identity, a cinematic gold palette, eight DISCO collections and a working inquiry integration. This direction keeps those foundations and gives the site an editorial identity: warm black, ivory, copper, large typography, an original animated SVG sculpture and a monochrome artist portrait.

The catalog is organized as eight selectable moods. Each selection updates its artwork, description and original DISCO link. The embedded player is created on request, avoiding a third-party player download on the initial visit. Changing collections replaces the player so two collections cannot play simultaneously. DISCO remains the audio source; the sculpture is decorative and does not claim to visualize live audio.

The contact form retains the original Formspree endpoint, adds a honeypot and a request timeout, prevents duplicate submissions while sending, and preserves the message on failure. The Phoodle link remains in the footer as an optional break, rather than occupying a large embedded section. No unverified placement credits have been introduced.

## Files

- `index.html`: redesigned homepage.
- `css/studio.css`: responsive design, keyboard focus and reduced motion support.
- `scripts/studio.js`: original SVG sculpture, collection browser, mobile navigation and inquiry handling.
- `original.html`: original homepage, using the unchanged original stylesheet, for comparison.
- `configs/playlists.json`: unchanged playlist source.

This remains a plain HTML/CSS/JavaScript site compatible with the existing GitHub Pages hosting. No installation or build step is required. Serve the folder over HTTP to enable the JSON catalog fetch.

## Validation

JavaScript syntax, unique HTML IDs, section anchors, local assets, the original contact endpoint and all eight original playlist URLs were checked. Isolated interaction tests passed for collection switching, lazy player creation and replacement, menu state, motion controls, and mocked form success/failure/spam handling. No test messages were sent.

Visual browser and live audio verification could not be completed because the browser's security-policy check denied local preview access. The external Formspree service was not submitted to during testing. Google Fonts and DISCO require connectivity; font fallbacks and direct playlist links are included.
