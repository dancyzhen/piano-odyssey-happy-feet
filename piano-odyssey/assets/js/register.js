// The registration page. Answers are filed into the studio's existing Google
// Form, so responses and email notifications stay in one place.
(function () {
  var ENDPOINT = "https://docs.google.com/forms/d/e/1FAIpQLSfwObWnhv0d_V2bVywnpN0cCVp7VycH99Ep_G4uDZTNmdOggg/formResponse";
  var ENTRY = {
    parent_name: "entry.1897417047",
    contact: "entry.1467194940",
    email: "entry.137525415",
    address: "entry.1256482184",
    student_name: "entry.1665829149",
    gender: "entry.1831247705",
    dob: "entry.1969715805",
    class: "entry.435545462",
    preferred: "entry.1637522810",
    goals: "entry.1775243316",
    heard: "entry.1086072026"
  };
  // Choices that exist on the Google Form. Anything else is filed under its "Other".
  var KNOWN_CLASSES = ["1-1 Piano Lessons"];

  var form = document.getElementById("register-form");
  if (!form) return;
  var error = document.getElementById("register-error");
  var done = document.getElementById("register-done");

  // "Other" choices reveal a text box.
  form.querySelectorAll("[data-other]").forEach(function (choice) {
    var box = document.getElementById(choice.getAttribute("data-other"));
    form.querySelectorAll('[name="' + choice.name + '"]').forEach(function (input) {
      input.addEventListener("change", function () {
        box.hidden = !choice.checked;
        box.required = choice.checked;
        if (choice.checked) box.focus();
      });
    });
  });

  function fail(message, focusOn) {
    error.textContent = message;
    error.classList.add("show");
    (focusOn || error).focus();
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    error.classList.remove("show");
    if (!form.reportValidity()) return;

    var value = function (name) { return form.elements[name].value.trim(); };
    var classes = Array.prototype.filter.call(form.querySelectorAll('[name="class"]'), function (c) { return c.checked; })
      .map(function (c) { return c.value === "Other" ? value("class_other") : c.value; });
    if (!classes.length) {
      fail("Please choose at least one class.", form.querySelector('[name="class"]'));
      return;
    }

    var data = new URLSearchParams();
    ["parent_name", "contact", "email", "address", "student_name", "gender", "preferred", "goals"].forEach(function (name) {
      data.append(ENTRY[name], value(name));
    });

    var dob = value("dob").split("-");
    data.append(ENTRY.dob + "_year", dob[0]);
    data.append(ENTRY.dob + "_month", String(Number(dob[1])));
    data.append(ENTRY.dob + "_day", String(Number(dob[2])));

    var others = [];
    classes.forEach(function (name) {
      if (KNOWN_CLASSES.indexOf(name) !== -1) data.append(ENTRY.class, name);
      else others.push(name);
    });
    if (others.length) {
      data.append(ENTRY.class, "__other_option__");
      data.append(ENTRY.class + ".other_option_response", others.join("; "));
    }

    if (value("heard") === "Other") {
      data.append(ENTRY.heard, "__other_option__");
      data.append(ENTRY.heard + ".other_option_response", value("heard_other"));
    } else {
      data.append(ENTRY.heard, value("heard"));
    }

    var button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    button.textContent = "Sending…";

    fetch(ENDPOINT, { method: "POST", mode: "no-cors", body: data })
      .then(function () {
        form.hidden = true;
        done.hidden = false;
        done.focus();
        window.scrollTo(0, 0);
      })
      .catch(function () {
        button.disabled = false;
        button.textContent = "Submit registration";
        fail("Sorry, your registration could not be sent. Please check your connection and try again, or email thepianoodyssey@gmail.com.");
      });
  });
})();
