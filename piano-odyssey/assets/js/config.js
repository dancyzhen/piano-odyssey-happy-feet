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
  odyssey: "https://thepianoodyssey.sg/",
  happyFeet: "https://happyfeet.sg/"
};

// On your own laptop the two folders sit side by side, so keep the relative links.
if (["localhost", "127.0.0.1", "[::1]"].indexOf(location.hostname) !== -1) {
  window.SITE_HOMES = { odyssey: "", happyFeet: "" };
}

window.SITE_CONTACT = {
  email: "yunzhen@thepianoodyssey.sg",
  whatsapp: "6588698587"
};

// Enquiry forms are filed into the studio's "Website enquiries" Google Form,
// which emails the owner. If that form's questions are ever edited, these
// entry numbers must be updated to match.
window.SITE_ENQUIRY = {
  endpoint: "https://docs.google.com/forms/d/e/1FAIpQLSdhJFk0VhgI36s6BsK9XlR7hU-EGsB4GULBTBhIg2LoWiYTAA/formResponse",
  name: "entry.1761991514",
  email: "entry.1391073391",
  enquiry: "entry.570016667",
  details: "entry.806658450"
};
