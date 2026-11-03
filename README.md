# Garden Creamery — Student Website Concept

A responsive React + Vite portfolio project, styled with blush pink `#F7D6CE`, coral/hot pink `#DF5F63`, white, and black.

## Open in VS Code (frontend repository)

1. Extract this ZIP to `E:\Github-Repositories\garden-creamery-website` (or another location).
2. Open that **folder** in VS Code.
3. In the VS Code PowerShell terminal:

```powershell
npm install
npm run dev
```

Open the localhost URL printed by Vite. To test production build:

```powershell
npm run build
```

## Publish with GitHub + Netlify

Create an **empty** public GitHub repository named `garden-creamery-website`, then in this website folder:

```powershell
git init
git add .
git commit -m "Initial Garden Creamery React website"
git branch -M main
git remote add origin https://github.com/YOUR-GITHUB-USERNAME/garden-creamery-website.git
git push -u origin main
```

At https://app.netlify.com/start select **Import from Git**, choose the repository, and use:

- Branch: `main`
- Build command: `npm run build`
- Publish directory: `dist`

`netlify.toml` already contains the build settings. Every subsequent push to main triggers a new deploy.

## Project integrity

- This is an **unofficial student website redesign**, not the business's official website.
- The hero image is a generated illustration, not a photo of Garden Creamery products.
- Flavor cards are **illustrative concepts** and not a verified live menu, allergy declaration, or stock feed. Confirm any flavor, vegan claims, or ingredients with the business before replacing them with factual menu information.
- The address links to the business's public location page; visitors are directed there for current opening times.
- No checkout or payment features are implemented.

## Files

- `src/App.jsx`: React components, sample content, filters, mobile nav, scroll reveal
- `src/styles.css`: responsive design and animations
- `public/ice-cream-hero.png`: illustrative hero image
- `netlify.toml`: Netlify build configuration
