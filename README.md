# Bejhi Na Gayi Chitthiyan

A nostalgic scrapbook-style static website with original romanised Urdu poems, floating dust particles, and a direct emotional theme.

## Folder structure

- `index.html` — main page markup
- `styles.css` — all styling
- `script.js` — scroll reveal, tilt interactions, floating dust particles
- `assets/` — drop textures, scanned paper images, and photos here later

## Deploy

This is a plain static site. You can deploy it on:

- Netlify
- Vercel (static)
- GitHub Pages
- Cloudflare Pages

## Local preview

Open `index.html` directly in a browser, or run a local static server.

Example with Python:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Important edits

- Change the `mailto:` link in `index.html` to the real email address you want.
- Replace the placeholder visual area with actual scanned photos/textures later for a much stronger look.
- If you want music, add an audio file to `assets/` and wire it up in `script.js`.
