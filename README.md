# Find Your Way Home

Static official project site for the surreal exploration puzzle game. No build step. GitHub Pages serves the repository root.

## Content contract

Read `NARRATIVE.md` before editing. The central premise is a failed return: crossing a threshold again does not restore the previous location. Ecuador is the first universe, with worldwide expansion possible. Do not invent final puzzle rules or confuse concept imagery with completed gameplay.

## Files

- `index.html`: pitch narrative, illustrated journey, route diagram, production information and media canvases.
- `style.css`: responsive editorial layout, sticky sequence and motion preferences.
- `script.js`: six documentary location entries, journal entries, scroll-driven scene selection and media loading.
- `media.json`: future film and demo configuration.
- `NARRATIVE.md`: project intent and approved distinctions.
- `PHOTO_CREDITS.json` and `credits.html`: documentary attribution.
- `CONCEPT_ASSETS.md`: generated concept provenance and prompts.

## Film and playable prototype

Edit only `media.json` when ready:

```json
{
  "film": {"type":"video", "src":"assets/project-film.mp4", "poster":"assets/film-poster.webp"},
  "demo": {"type":"embed", "src":"https://your-demo.example/play"}
}
```

`video` uses native controls; `embed` uses an iframe whose provider must permit embedding. A null entry retains the production placeholder. The canvases are independent and maintain a 16:9 ratio.

## Journal

The `chapters` array in `script.js` supplies the seven expandable chapters. Current text describes planned work. Replace it with documented results as production progresses. Rich content can be appended within each generated `.journal-entry`; `.journal-media` supports photographs and video.

## Visual assets

Documentary photographs are curated Ecuadorian references. `assets/journey-states.webp` is a generated four-frame concept storyboard. CSS selects its panels without changing the original image. It illustrates a possible progression, not exact final locations or game footage. Earlier portal concept files remain archived but are no longer used on the main page.

## Checks

Run `node --check script.js`. Use an HTTP server for local viewing (`python3 -m http.server 8000`); loading media configuration requires HTTP. Review desktop and mobile, anchors, narrative frame changes, reduced motion, journal keyboard operation, and optional media before a release.

`review.html` is an unlinked, noindex responsive review harness with 390, 768 and 1280 px iframe widths. It uses the same site files, without modifying the public experience.
