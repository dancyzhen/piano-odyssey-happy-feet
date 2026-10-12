# The Piano Odyssey & Happy Feet

Two linked websites built from Brand Kit v1.0 (12 October 2026).

| Folder | Site | Pages |
| --- | --- | --- |
| `piano-odyssey/` | The Piano Odyssey: piano, musicianship, and expression | `index.html`, `founder.html` |
| `happy-feet/` | Happy Feet: Music & Movement by The Piano Odyssey | `index.html`, plus one page per audience: `youth.html`, `adults.html`, `musicians.html`, `seniors.html`, `schools.html`, `teams.html` |
| `index.html` | Preview page linking to both (not for the public) | |

Plain HTML, CSS, and JavaScript. No build step. The typefaces load from Google Fonts.

The visual style (warm paper, ink, oxblood and aged-gold accents) follows the owner's later direction and replaces the colours and fonts in Brand Kit v1.0. Copy, structure, and claims still follow the kit.

## Preview on your laptop

```bash
python3 serve.py
```

Then open <http://localhost:4321>. Press Ctrl+C in the terminal to stop.

## How the two sites link

Each folder is a complete, self-contained site, published on its own address:

| Site | Vercel project | Folder | Live address |
| --- | --- | --- | --- |
| The Piano Odyssey | `the-piano-odyssey-sg` | `piano-odyssey/` | https://www.thepianoodyssey.sg |
| Happy Feet | `happy-feet-sg` | `happy-feet/` | https://happy-feet-sg.vercel.app |

Both projects deploy from this one GitHub repository; every push to `main`
republishes both.

Links between the sites are marked with `data-site` in the HTML and written as
relative paths (`../happy-feet/...`), which the local preview uses. On the live
sites they are pointed at the addresses in `assets/js/config.js`. When the real
domains are ready, change the two addresses there, in **both** copies.

## Two brands, two stylesheets

The sites no longer share their look. The Piano Odyssey uses warm paper, ink,
and an oxblood seal (Cormorant Garamond, Spectral, Inter Tight). Happy Feet uses
navy, sunflower, and rose with the wave wordmark (DM Serif Display, DM Sans).
Each site's `assets/css/base.css` and `theme.css` belong to that site alone.

`assets/js/site.js` and `assets/js/config.js` are still identical in both
sites. If you edit one, copy it to the other.

## Enquiry and registration forms

Enquiry forms on both sites send straight from the page. Each submission is
filed into the owner's "Website enquiries" Google Form, which emails her. The
unlisted registration page (`piano-odyssey/register.html`) files into her
existing registration Google Form the same way. Visitors never see Google.

The entry numbers in `assets/js/config.js` and `piano-odyssey/assets/js/register.js`
are tied to those Google Forms' questions. Editing the questions there breaks
the website forms until the numbers are updated.

## Confirm before public launch

- Early-booking deadline (25 December 2026) and the campaign year.
- Free trial date and time (currently "December 2026, to be announced").
- Class duration, capacity, booking and payment process, cancellation terms.
- Dalcroze qualification wording, once the Certificate is awarded.
- Domains, then update `config.js` and add `og:url` / social image metadata.
- Add permitted, authentic teaching and movement photographs.
- Test email and WhatsApp links on a real phone.
