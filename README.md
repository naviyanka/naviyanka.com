# naviyanka.com

Personal site of **Navi** ([@naviyanka](https://github.com/naviyanka)): projects, SharePoint field notes, security work and homelab.

Plain HTML, CSS and JavaScript. No build step, no framework. Deployed to GitHub Pages by GitHub Actions on every push to `main`.

## Structure

```
index.html              the whole site
404.html                not-found page
assets/styles.css       design tokens + layout
assets/main.js          project data, hero console, live GitHub stats, terminal
assets/favicon.svg
CNAME                   naviyanka.com
.github/workflows/      validate HTML + check links, then deploy
```

## Editing

- **Projects:** edit the `PROJECTS` array at the top of `assets/main.js`. It drives both the project board and the terminal (`ls`, `open <id>`).
- **Status values:** `building`, `planning`, `concept`.
- **Terminal commands:** add to the `COMMANDS` object in `assets/main.js`.
- **Field notes:** in `index.html` under `#field-notes`. Link each card to its write-up when it's ready.
- **Security acknowledgements:** there's a commented block in `#security` ready for hall-of-fame entries.

## Run locally

```bash
python3 -m http.server 8080
# open http://localhost:8080 and press ` to open the terminal
```

## Deploy

1. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Push to `main`. The workflow validates, then deploys.
3. **Settings → Pages → Custom domain:** `naviyanka.com`, then tick *Enforce HTTPS* once the certificate is issued.

### DNS for naviyanka.com

| Type  | Name | Value                  |
|-------|------|------------------------|
| A     | @    | 185.199.108.153        |
| A     | @    | 185.199.109.153        |
| A     | @    | 185.199.110.153        |
| A     | @    | 185.199.111.153        |
| CNAME | www  | naviyanka.github.io    |

Optional IPv6: AAAA records for `2606:50c0:8000::153`, `8001::153`, `8002::153`, `8003::153`.

### naviyanka.in

Pages serves one custom domain per repo, so redirect `.in` to `.com`:
- **Cloudflare:** add the zone, then a Redirect Rule `naviyanka.in/*` → `https://naviyanka.com/${1}` (301).
- **Or at your registrar:** use domain forwarding (301, path forwarding on).

Also verify the domain under **GitHub Settings → Pages → Verified domains** so nobody else can claim it.

## License

MIT
