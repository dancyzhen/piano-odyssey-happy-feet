// Shared behaviour for both sites. Keep this file identical in both.
(function () {
  var homes = window.SITE_HOMES || {};
  var contact = window.SITE_CONTACT || {};
  var folders = { odyssey: "../piano-odyssey/", happyFeet: "../happy-feet/" };

  // Point cross-site links at the configured domains, when there are any.
  document.querySelectorAll("a[data-site]").forEach(function (link) {
    var site = link.getAttribute("data-site");
    var home = homes[site];
    var href = link.getAttribute("href");
    if (home && href.indexOf(folders[site]) === 0) {
      link.setAttribute("href", home + href.slice(folders[site].length));
    }
  });

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

  // Enquiry forms prepare an email in the visitor's own app. Nothing is sent
  // or stored by the website itself.
  document.querySelectorAll("form[data-enquiry]").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!form.reportValidity()) return;

      var lines = [];
      form.querySelectorAll("[name]").forEach(function (field) {
        var value = field.value.trim();
        if (!value) return;
        var label = form.querySelector('label[for="' + field.id + '"]');
        var name = label ? label.firstChild.textContent.trim() : field.name;
        lines.push(name + ": " + value);
      });

      var subject = form.getAttribute("data-subject") || "Enquiry";
      var interest = form.querySelector('[name="interest"]');
      if (interest && interest.value) subject += " - " + interest.value;

      var status = form.querySelector(".form-status");
      window.location.href =
        "mailto:" + contact.email +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(lines.join("\n\n"));

      if (status) {
        status.classList.add("show");
        status.focus();
      }
    });
  });

  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
