# Find Your Way Home — official web experience

A static, responsive editorial website for the surreal puzzle game. Open `index.html` locally through a static server, or deploy the repository root with GitHub Pages. No build step or external JavaScript dependency is required.

## Connect the film and playable demo

The two 16:9 canvases are independent. Edit `media.json` when the assets are ready:

```json
{
  "film": { "type": "video", "src": "assets/project-film.mp4", "poster": "assets/film-poster.webp" },
  "demo": { "type": "embed", "src": "https://your-demo.example/play" }
}
```

`type: "video"` uses a native player. `type: "embed"` uses an iframe; the provider must allow embedding. Setting either entry to `null` restores its designed production state. Local video files can also be used for the demo. For GitHub Pages, use repository-relative asset paths and check file size limits before adding a large film.

## Content and images

`script.js` holds the Ecuador world sequence and journal chapter titles. Add journal entries and captions there, or move them to JSON when the production log grows. `assets/*-source.webp` are sourced documentary photographs; attribution and licensing are in `credits.html` and `PHOTO_CREDITS.json`. The six other WebP images are generated concept visualizations and are labeled as such on the page. They do not claim to be actual gameplay or documentary photographs. Replace individual images by keeping the same filename, or update the references in `index.html` and `script.js`.

The page uses native lazy loading, compressed WebP, IntersectionObserver, limited scroll transforms, semantic sections and reduced-motion support. Test through a local HTTP server (`python3 -m http.server 8000`) because `media.json` is fetched separately.
