(function () {
  "use strict";

  const form = document.getElementById("contact-form");
  if (!form) return;

  const successMessage = document.getElementById("form-success");

  function showError(field, message) {
    const errorEl = document.getElementById(field.id + "-error");
    field.classList.add("is-invalid");
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add("is-visible");
    }
  }

  function clearError(field) {
    const errorEl = document.getElementById(field.id + "-error");
    field.classList.remove("is-invalid");
    if (errorEl) {
      errorEl.textContent = "";
      errorEl.classList.remove("is-visible");
    }
  }

  function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function validateForm() {
    let isValid = true;
    const name = form.querySelector("#name");
    const email = form.querySelector("#email");
    const message = form.querySelector("#message");

    [name, email, message].forEach(clearError);

    if (!name.value.trim()) {
      showError(name, "Please enter your name.");
      isValid = false;
    }

    if (!email.value.trim()) {
      showError(email, "Please enter your email address.");
      isValid = false;
    } else if (!validateEmail(email.value.trim())) {
      showError(email, "Please enter a valid email address.");
      isValid = false;
    }

    if (!message.value.trim()) {
      showError(message, "Please tell us about your project.");
      isValid = false;
    } else if (message.value.trim().length < 20) {
      showError(message, "Please provide a bit more detail (at least 20 characters).");
      isValid = false;
    }

    return isValid;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (successMessage) {
      successMessage.classList.remove("is-visible");
    }

    if (!validateForm()) return;

    const submitBtn = form.querySelector('[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";

    const formData = new FormData(form);
    const action = form.getAttribute("action");

    fetch(action, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    })
      .then(function (response) {
        if (response.ok) {
          form.reset();
          if (successMessage) {
            successMessage.classList.add("is-visible");
          }
        } else {
          throw new Error("Form submission failed");
        }
      })
      .catch(function () {
        showError(
          form.querySelector("#message"),
          "Something went wrong. Please email vinothkumarj305@gmail directly."
        );
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      });
  });

  form.querySelectorAll(".form-input, .form-textarea").forEach(function (field) {
    field.addEventListener("input", function () {
      clearError(field);
    });
  });
})();
