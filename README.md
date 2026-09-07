# Utkarsh Mohan — Personal portfolio

Independent static portfolio: **https://utkmohan.github.io/utkarsh-portfolio/**

This project does not change `utkmohan.github.io`, its redirect, or the original Google Site.

## Build and preview

Node.js 20 or later is sufficient. There are no npm dependencies to install.

```sh
npm run build
npm run check
npm run dev
```

Open `http://127.0.0.1:4173/utkarsh-portfolio/`. The build writes static HTML beside the source files. GitHub Pages serves the `main` branch, repository root. Commit the regenerated HTML alongside your content edits; Pages automatically republishes it.

## Updating content

`content.json` stores the original HTML paragraphs, links, source image metadata, alt text, and article dates. HTML formatting is allowed inside `blocks`; keep the JSON valid. `build.mjs` supplies shared navigation and page layouts.

- **News:** add a `<li>… [Fall '26]</li>` string at the beginning of `pages.home.sections[4].blocks`. The first five entries appear initially; older entries are grouped by the first bracketed year. Preserve chronological ordering.
- **Biography and education:** edit `pages.home.sections[1].blocks`. The current research statement is block 4 and is shared by Home and Research.
- **Research:** edit the corresponding blocks and image IDs in `pages.research.sections[1]`, `[2]`, or `[3]`. To introduce a new entry, extend the section list and the entry iteration/metadata in `research()` in `build.mjs`; do not fabricate results or citations.
- **Teaching:** edit `pages.teaching.sections[2].blocks`. Institution heading paragraphs begin groups; each following top-level `<li>` describes one role. The introduction is in section 1. Update the `study` constant in `build.mjs` if the Drive document changes.
- **Photos:** add optimized `assets/image-NNN-thumb.webp` (up to 720 px) and `assets/image-NNN-large.webp` (up to 2200 px), preserving aspect ratios. Add an `assets` metadata entry with `id`, `width`, `height`, `alt`, `caption`, and `status: "archived"`. Add its ID to the relevant album array under `pages.photography.sections[1..4].carousels`. Each of those sections holds two albums. The build uses `alt` verbatim; write a specific description of the image. Album names are defined in `build.mjs`. Update the displayed total and gallery baseline check when adding photographs.
- **Blog:** article paragraphs live in `pages[article-slug].sections[1].blocks`. Dates and preview image IDs live in `posts`; preview paragraphs live in `pages.blog.sections`. To add a post, add the article content and a `posts` entry, then rebuild. Existing posts are complete migrations of the original articles.
- **Links and navigation:** edit the named constants near the top of `build.mjs`. `BASE` must remain `/utkarsh-portfolio/` unless the repository name changes. Google tracking wrappers were resolved to their original destinations.
- **Appearance:** color tokens, responsive layout, and typography are in `style.css`; interactions are in `app.js`; the early theme preference loader is `theme.js`.

After editing, run `npm run build` and `npm run check`, review the site, then commit and push the changed source, HTML, and assets to this repository only. If using GitHub's browser upload, upload root files to the repository root and image/font files into `assets/`.

## Accessibility and behavior

All pages are real static HTML documents. Navigation, contact/resource links, the mobile menu (`details`), and the news archive (`details`) work without JavaScript. Photo links open their full-size local image without JavaScript; JavaScript adds album filtering and a native dialog lightbox with previous/next, arrow keys, Escape, and focus restoration. Reduced-motion preferences disable transitions. Themes respect the system preference until a saved choice is made.

## Sources and preservation

The five original pages and both articles were inspected on September 5, 2026. The migration preserves 22 news entries, all three research entries, all seven teaching/outreach roles, three award images, twelve conference/internship carousel slides, 52 photographs across eight albums, a photography introduction image, a portrait, both post preview images, and three YouTube destinations.

The full original repository history and Google Site content archive are stored separately from this public project. The Google Site archive covers publicly accessible content; it does not include unpublished revisions, original camera files, private documents, or the actual YouTube media files. Decorative Lottie source files were archived separately and replaced in the visual design with restrained styling.

Photography, writing, and portfolio content belong to their respective owners. Fonts are distributed under their accompanying SIL Open Font Licenses in `assets/`.
