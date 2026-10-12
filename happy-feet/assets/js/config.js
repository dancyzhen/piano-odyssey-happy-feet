// Where each site lives. Keep this file identical in both sites.
//
// Each site is published on its own address. Links from one site to the
// other are written in the HTML as relative paths (../happy-feet/...), which
// is what the local preview uses; on the live sites they are pointed at the
// addresses below.
//
// When the real domains are ready, change these two lines (keep the final
// slash) and update both sites together.
window.SITE_HOMES = {
  odyssey: "https://the-piano-odyssey-sg.vercel.app/",
  happyFeet: "https://happy-feet-sg.vercel.app/"
};

// On your own laptop the two folders sit side by side, so keep the relative links.
if (["localhost", "127.0.0.1", "[::1]"].indexOf(location.hostname) !== -1) {
  window.SITE_HOMES = { odyssey: "", happyFeet: "" };
}

window.SITE_CONTACT = {
  email: "thepianoodyssey@gmail.com",
  whatsapp: "6588698587"
};
