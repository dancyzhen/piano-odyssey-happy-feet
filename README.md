# The Piano Odyssey & Happy Feet

Two linked websites built from Brand Kit v1.0 (12 October 2026).

| Folder | Site | Pages |
| --- | --- | --- |
| `piano-odyssey/` | The Piano Odyssey: piano, musicianship, and expression | `index.html`, `founder.html` |
| `happy-feet/` | Happy Feet: Music & Movement by The Piano Odyssey | `index.html`, `teams.html` |
| `index.html` | Preview page linking to both (not for the public) | |

Plain HTML, CSS, and JavaScript. No build step. The typefaces (Cormorant Garamond, Spectral, Inter Tight) load from Google Fonts.

The visual style (warm paper, ink, oxblood and aged-gold accents) follows the owner's later direction and replaces the colours and fonts in Brand Kit v1.0. Copy, structure, and claims still follow the kit.

## Preview on your laptop

```bash
python3 serve.py
```

Then open <http://localhost:4321>. Press Ctrl+C in the terminal to stop.

## How the two sites link

Each folder is a complete, self-contained site. Links between them are marked
with `data-site` in the HTML and use relative paths (`../happy-feet/…`), which
work whenever the two folders sit side by side: locally, or in one GitHub Pages
repository.

When each site gets its own domain, set the addresses in **both** copies of
`assets/js/config.js`:

```js
window.SITE_HOMES = {
  odyssey: "https://www.thepianoodyssey.sg/",
  happyFeet: "https://<confirmed Happy Feet domain>/"
};
```

`happyfeet.sg` and `happyfeet.com.sg` are candidates only; ownership is not yet
verified, so no Happy Feet domain is written into the site.

## Shared files

`assets/css/base.css`, `assets/js/site.js`, and `assets/js/config.js` are
identical in both sites. If you edit one, copy it to the other. Each site's
`assets/css/theme.css` holds its own brand energy.

## Enquiry forms

The forms prepare an email in the visitor's own email app; the visitor must
press send. Nothing is stored or sent by the website. WhatsApp links open a
visitor-initiated chat.

## Confirm before public launch

- Early-booking deadline (25 December 2026) and the campaign year.
- Free trial date and time (currently "December 2026, to be announced").
- Class duration, capacity, booking and payment process, cancellation terms.
- Dalcroze qualification wording, once the Certificate is awarded.
- Domains, then update `config.js` and add `og:url` / social image metadata.
- Add permitted, authentic teaching and movement photographs.
- Test email and WhatsApp links on a real phone.
