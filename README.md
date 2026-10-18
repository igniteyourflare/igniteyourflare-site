# Ignite Your Flare website

Every page keeps the same address it had on Google Sites (for example `/class-information/programs`), so Google rankings and old links carry over.

## Hosting: Cloudflare Pages (free)

Free plan includes unlimited bandwidth, free HTTPS, your own domain, and free Cloudflare Web Analytics. It allows business sites (GitHub Pages does not).

### One-time setup (about 30 minutes)

1. **Put the files on GitHub.** In GitHub Desktop: File > New repository, name it `igniteyourflare-site`, choose this folder, then Publish repository (private is fine).
2. **Connect Cloudflare.** Create a free account at dash.cloudflare.com. Go to Workers & Pages > Create > Pages > Connect to Git, pick the repo.
   - Framework preset: **None**
   - Build command: **leave blank**
   - Build output directory: **/**
3. **Preview.** Cloudflare gives you an address like `igniteyourflare-site.pages.dev`. Check every page there before switching the domain.
4. **Turn on analytics.** In the Pages project: Metrics > Web Analytics > Enable. No code needed.
5. **Google Analytics and Ads.** Open `assets/site.js` and paste your GA4 ID (`G-...`) and Google Ads ID (`AW-...`) between the quotes. That one file controls tracking on every page.
6. **Switch the domain (do this last).** Pages project > Custom domains > add `www.igniteyourflare.com` and `igniteyourflare.com`. Follow Cloudflare's DNS instructions, then remove the custom domain from Google Sites. **Keep the Google Site published** at sites.google.com/view/igniteyourflare: the Handbook, Newsletters and Recital Volunteer pages still live there (see `_redirects`).
7. **Tell Google.** In Search Console, submit `https://www.igniteyourflare.com/sitemap.xml`.

## Editing

Edit any `.html` file (VS Code, Notepad, or the pencil icon on github.com), then Commit and Push in GitHub Desktop. Cloudflare publishes the change in about a minute.

- **Text on a page:** open that page's file and change the words between the tags.
- **Menu or footer:** these are copied on every page. Use find-and-replace across the folder (VS Code: Ctrl+Shift+H), or ask Claude to update them all.
- **Colors and fonts:** the top of `assets/site.css`.
- **Photos:** see `images/README.txt` for file names and sizes.
- **Schedule:** `class-information/schedule.html` has a ready-made table template in a comment.
- **Inquiry form:** `contact-us.html` has a marked spot for your Airtable, Tally or HighLevel embed code. Set the form to redirect to `/thank-you` so Google Ads counts leads. Include an SMS consent checkbox (your Terms say opt-in is collected that way).
- **Redirects:** `_redirects`. **Caching and security headers:** `_headers`.

## Files

| File | What it is |
| --- | --- |
| `index.html` | Homepage |
| `class-information*.html`, `class-information/` | Classes, levels, programs, acro, schedule, recital, uniform |
| `tuition.html` | How all-inclusive tuition works (new) |
| `families.html` | Current-family links: portal, Band, store, handbook (new) |
| `about*.html`, `about/` | About, staff, facilities, privacy policy, terms |
| `contact-us.html`, `thank-you.html`, `404.html` | Contact, form thank-you, not-found |
| `sitemap.xml`, `robots.txt` | For search engines |
