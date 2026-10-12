// Shared behaviour for both sites. Keep this file identical in both.
(function () {
  var homes = window.SITE_HOMES || {};
  var contact = window.SITE_CONTACT || {};
  var folders = { odyssey: "../piano-odyssey/", happyFeet: "../happy-feet/" };

  // On the live sites, addresses are kept clean: no "index.html" and no
  // ".html". The local preview keeps the file names so pages open from disk.
  function clean(path) {
    return path.replace(/(^|\/)index\.html/, "$1").replace(/\.html(?=$|#|\?)/, "");
  }

  // Point cross-site links at the configured domains, when there are any.
  document.querySelectorAll("a[data-site]").forEach(function (link) {
    var site = link.getAttribute("data-site");
    var home = homes[site];
    var href = link.getAttribute("href");
    if (home && href.indexOf(folders[site]) === 0) {
      link.setAttribute("href", home + clean(href.slice(folders[site].length)));
    }
  });

  // Links within this site.
  if (homes.odyssey || homes.happyFeet) {
    document.querySelectorAll("a[href]:not([data-site])").forEach(function (link) {
      var href = link.getAttribute("href");
      if (/^(https?:|mailto:|tel:|#|\/)/.test(href) || href.indexOf(".html") === -1) return;
      link.setAttribute("href", "/" + clean(href));
    });
  }

  // Mobile navigation.
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Enquiry forms send straight from the page. Each one is filed into the
  // studio's enquiries form, which emails the owner.
  var enquiry = window.SITE_ENQUIRY || {};
  document.querySelectorAll("form[data-enquiry]").forEach(function (form) {
    var status = form.querySelector(".form-status");
    var button = form.querySelector('button[type="submit"]');
    var buttonText = button.textContent;

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      status.classList.remove("show", "error");
      if (!form.reportValidity()) return;

      var name = "";
      var email = "";
      var lines = [];
      form.querySelectorAll("[name]").forEach(function (field) {
        var value = field.value.trim();
        if (!value) return;
        if (field.name === "name") { name = value; return; }
        if (field.name === "email") { email = value; return; }
        var label = form.querySelector('label[for="' + field.id + '"]');
        lines.push((label ? label.firstChild.textContent.trim() : field.name) + ": " + value);
      });
      lines.push("Sent from: " + location.href.split("#")[0]);

      var subject = form.getAttribute("data-subject") || "Enquiry";
      var interest = form.querySelector('[name="interest"]');
      if (interest && interest.value) subject += " - " + interest.value;

      var data = new URLSearchParams();
      data.append(enquiry.name, name);
      data.append(enquiry.email, email);
      data.append(enquiry.enquiry, subject);
      data.append(enquiry.details, lines.join("\n"));

      button.disabled = true;
      button.textContent = "Sending…";

      fetch(enquiry.endpoint, { method: "POST", mode: "no-cors", body: data })
        .then(function () {
          form.classList.add("sent");
          status.textContent = "Thank you. Your enquiry has been sent, and I will reply by email soon.";
          status.classList.add("show");
          status.focus();
        })
        .catch(function () {
          button.disabled = false;
          button.textContent = buttonText;
          status.textContent = "Sorry, your enquiry could not be sent. Please check your connection and try again, or email " + contact.email + ".";
          status.classList.add("show", "error");
          status.focus();
        });
    });
  });

  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
