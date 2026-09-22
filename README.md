# llm-tutors-for-all.github.io

The landing site for **LLM Tutors For All**, served at
<https://llm-tutors-for-all.github.io/>.

## Run it locally

You need Node.js 22.12 or newer. The repo's `.nvmrc` pins Node 24, so with
[nvm](https://github.com/nvm-sh/nvm):

```bash
nvm install    # first time only; reads .nvmrc
nvm use
npm install
npm run dev
```

Open <http://localhost:4321>. The page reloads as you save files.

| Command           | What it does                                                   |
| ----------------- | -------------------------------------------------------------- |
| `npm run dev`     | Start the local development server                             |
| `npm run build`   | Build the production site into `dist/` and validate content    |
| `npm run preview` | Serve the built `dist/` locally, to check the production build |
| `npm run check`   | Type-check the code and templates                              |

The build downloads the fonts from Google Fonts once, then serves them from this
site. Visitors never request anything from Google.

## Edit the content

All words, links and numbers live in content files. You don't need to touch the
components to change what the site says.

The site has three pages. Each has a folder in `src/content/`.

| Page | To change… | Edit |
| --- | --- | --- |
| All | Site name, byline, contact email, navigation, footer links | `src/content/site.yaml` |
| Home (`/`) | The hero headline, pitch and buttons | `src/content/home/hero.md` |
| | "There’s no single best way…" section | `src/content/home/problem.md` |
| | Benchmarks summary (its lists come from the Benchmarks page) | `src/content/home/benchmarks.md` |
| | The tutor pipeline | `src/content/home/how-it-works.md` |
| | Local CLI, Discord and Slack cards | `src/content/home/interfaces.md` |
| | Research direction (Now / Next / Later) | `src/content/home/research.md` |
| | The closing "Get involved" band | `src/content/home/get-involved.md` |
| | The animated demo in the hero | `src/content/demo.yaml` |
| Benchmarks (`/benchmarks/`) | Everything on the page: scope, criteria, methods, deliverables | `src/content/benchmarks/page.md` |
| | Chart numbers | `src/data/benchmarks.json` |
| Team (`/team/`) | Page intro and contact options | `src/content/team/page.md` |
| | Team roster | `src/content/team/people.yaml` |
| | Team photos | `src/assets/team/` |

### How the section files work

Each section file has two parts:

```markdown
---
title: Research direction          # structured fields: headings, lists, links
stages:
  - name: Now
    items:
      - …
---

The paragraph below the second --- line is the section's intro.
You can use normal Markdown here: **bold**, [links](https://…), `code`.
```

- Text after `#` in the top part is a comment and isn't shown on the site.
- Links must start with `https://`, `mailto:` or `/`. For example, `/#benchmarks`
  jumps to the Benchmarks section.
- Keep the indentation: lists use two spaces and a dash.

### Editing on GitHub, no setup needed

1. Open the file on GitHub and select the pencil icon.
2. Make your change, then select **Commit changes** and commit to `main`.
3. The site rebuilds and goes live in a minute or two. Follow it in the
   **Actions** tab.

If a change breaks something, such as a misspelled field name, a missing value or
a malformed link, the build stops before anything is published. The error in the
Actions log names the file and the field. For example:

```text
team → benjamin-telanoff data does not match collection schema.
  role: Required
  Unrecognized key: "rol"
```

### Team members and photos

Add a person to `src/content/team/people.yaml`. People appear in the order listed.

```yaml
- name: Ada Lovelace
  role: Benchmark researcher
  photo: ada-lovelace.jpg       # optional: a file in src/assets/team/
  github: https://github.com/…  # optional
  linkedin: https://www.linkedin.com/in/…  # optional
```

To add a photo, put a square-ish JPG or PNG in `src/assets/team/` and write its
file name under `photo`. Without a photo, the person's initials are shown. Photos
are resized and converted to WebP automatically.

## Benchmark data

The chart on the Benchmarks page is drawn entirely from
`src/data/benchmarks.json`. **It currently holds placeholder values.** While
`status` is `"placeholder"`, the chart shows a "Placeholder data" label and note,
and draws its bars lighter.

### Publishing real results

1. Replace the numbers under each metric's `values`. Use `null` for anything not
   measured yet; it's shown as "Not measured yet".
2. Set `status` to `"preliminary"` (shows a "Preliminary results" label) or
   `"final"` (no label).
3. Rewrite `note` to describe the results. It shows under the label; for
   `"final"` it's hidden.
4. Set `updated` to the date of the run, e.g. `"2026-10-13"`, and
   `methodologyUrl` to the write-up, e.g. the docs benchmark page. Both are
   optional and shown under the chart.

### Fields

```jsonc
{
  "status": "placeholder",        // placeholder | preliminary | final
  "note": "…",                    // shown with the status label
  "updated": null,                // "YYYY-MM-DD" or null
  "methodologyUrl": null,         // "https://…" or null
  "groups": [                     // the rows: one per interface
    { "id": "cli", "label": "Local CLI" }
  ],
  "series": [                     // the bars in each row (at most 2)
    { "id": "base", "label": "Out-of-the-box model" },
    { "id": "harnessed", "label": "Harnessed tutor" }
  ],
  "metrics": [                    // one tab per metric
    {
      "id": "latency",
      "label": "Response time",   // tab name
      "description": "Median seconds from sending a question to seeing the full answer.",
      "better": "lower",          // lower | higher (shown as "Lower is better.")
      "prefix": "",               // e.g. "$"
      "suffix": " s",             // e.g. "%", " s"
      "decimals": 1,              // digits after the decimal point
      "max": 100,                 // optional fixed scale, e.g. 100 for percentages
      "values": {
        "cli": { "base": 1.0, "harnessed": 1.5 }  // one entry per group × series
      }
    }
  ]
}
```

- Every group must have a value (or `null`) for every series. The build tells you
  which one is missing.
- Add a metric by adding an object to `metrics`. It gets its own tab.
- Add an interface by adding it to `groups` and giving it values in every metric.
- Without `max`, the longest bar scales to a round number just above the largest
  value.

The two series colors live in `src/styles/global.css` (`--series-1`,
`--series-2`, with separate light and dark values). They were checked for
colorblind separation and contrast against both backgrounds. If you change them,
re-check both themes.

## Deploy

Pushing to `main` deploys the site. `.github/workflows/deploy.yml` builds it with
the official [Astro GitHub Action](https://github.com/withastro/action) and
publishes it with `actions/deploy-pages`. You can also run it by hand from the
**Actions** tab (**Deploy site to GitHub Pages → Run workflow**).

### One-time setup

GitHub Pages must be set to deploy from GitHub Actions, not from a branch:

1. Open the repository on GitHub and go to **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Push to `main` (or run the workflow). Follow it in the **Actions** tab. When it
   finishes, the site is live at <https://llm-tutors-for-all.github.io/>.

### Living alongside the docs

This repository is the organization's Pages site, so it serves the domain root.
The Documentation repository is a project site that GitHub serves at
`/Documentation/`. The two deploy independently.

- Never create a page or folder named `Documentation` in this site; it would
  conflict with the docs path.
- Link to the docs with full URLs (`https://llm-tutors-for-all.github.io/Documentation/…`).
- This site's `404.astro` is shown for unknown paths outside the docs.

## How the code is organized

```text
.github/workflows/deploy.yml   Build and deploy to GitHub Pages
astro.config.mjs               Site URL, fonts, Tailwind, sitemap
public/                        Files served as-is: favicon, social image, robots.txt
src/
  content.config.ts            The schema every content file is checked against
  content/                     Words and links, one folder per page (see "Edit the content")
  data/benchmarks.json         Benchmark chart data
  assets/                      Logo and team photos (optimized at build time)
  styles/global.css            Color tokens (light and dark), type, shared styles
  layouts/BaseLayout.astro     <head>, theme script, header and footer
  components/                  Header, Footer, ThemeToggle, TutorDemo,
                               BenchmarkChart, TeamGrid, Section, icons
  components/PageIntro.astro   The heading and introduction of an inner page
  sections/                    One component per page section; home sections at the
                               top level, others in benchmarks/ and team/
  pages/index.astro            Home: its sections in order
  pages/benchmarks.astro       /benchmarks/
  pages/team.astro             /team/
  pages/404.astro              Not-found page
  lib/                         Content loading and the demo reply renderer
  scripts/reveal.ts            Scroll-in fade for sections
```

### Adding a page

1. Create `src/pages/<name>.astro`. It's served at `/<name>/`. Start from
   `src/pages/team.astro`: a `BaseLayout` with a title, a `PageIntro`, then
   sections.
2. Put its words in a new folder under `src/content/` and give it a schema in
   `src/content.config.ts`. Follow `teamPage` there.
3. Add it to `nav` (and the footer, if wanted) in `src/content/site.yaml`. The
   header marks the current page automatically.

A section can move between pages the same way: every section is a component
that reads its own content file, so it renders wherever it's placed.

## Design notes

- **Palette.** It comes from the logo: navy ink `#12263F` on warm paper
  `#FBFAF7`, with the logo's amber `#F0A202` as the only accent. The dark theme
  uses deep navy `#0B1626`. All tokens are CSS variables at the top of
  `src/styles/global.css`.
- **Amber in light mode.** It is only a fill or mark there, never text or a focus
  ring, because it's too light against paper to read.
- **Type.** UC Berkeley's brand typefaces
  ([brand.berkeley.edu](https://brand.berkeley.edu/visual-identity/typography/)),
  each with one job:
  - Inter, bold and tight, for headlines. It echoes the logo's "LLM".
  - Source Serif 4 for reading text, so paragraphs read like a paper.
  - Barlow Condensed for controls, labels, captions and chart numbers.
  - Source Code Pro for code and terminal output.
  - The chat mock-ups in the hero demo use the system sans, as chat apps do.

  The roles are CSS variables in `src/styles/global.css` (`--font-display`,
  `--font-body`, `--font-ui`, `--font-mono`). The fonts are configured in
  `astro.config.mjs`.
- **Buttons and tabs.**
  - The primary button is a solid ink block with an amber bottom edge: the
    logo's two colors.
  - The secondary action is text with an amber bar that extends on hover.
  - Tabs, in the header, the demo and the chart, are underlined with the same
    amber bar.
  - Corners are nearly square: 3px on controls, 4–6px on panels.
- **Theme.** The site follows the system light/dark setting until someone uses the
  toggle; their choice is then remembered in that browser.
- **Motion.**
  - The hero demo plays once, with Pause and Replay.
  - Sections fade in as they scroll into view.
  - Chart bars grow when the chart first appears or a metric is picked.
  - With "reduce motion" turned on, everything appears in its final state.
- **Without JavaScript.** Everything still works: the demo surfaces and chart
  metrics are listed one after another instead of as tabs.
- **No UI framework.** Interactivity is a few small scripts bundled by Astro. If
  the chart grows into something with filters or many models, it could become a
  Preact island with `client:visible`.
- **Checked at launch.** Lighthouse scored 99–100 for performance and 100 for
  accessibility, best practices and SEO (mobile and desktop). axe found no
  violations in either theme. There is no horizontal scrolling at 375, 768 or
  1440 px.
