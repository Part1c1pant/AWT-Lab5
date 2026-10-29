// ===== MAIN.JS — Booking page logic =====

document.addEventListener("DOMContentLoaded", function () {
  const form      = document.getElementById("booking-form");
  const tourSel   = document.getElementById("tour");
  const travSel   = document.getElementById("travellers");
  const nameInput = document.getElementById("name");
  const emailInput= document.getElementById("email");
  const dateInput = document.getElementById("date");
  const priceBox  = document.getElementById("price-display");
  const msgBox    = document.getElementById("form-message");

  if (!form) return;
  function updatePrice() {
    const price      = parseInt(tourSel.value);
    const travellers = parseInt(travSel.value);
    let total        = travellers * price;
    let html         = "Total: " + travellers + " &times; " + price + " USD = " + total + " USD";

    if (travellers >= 5) {
      const discounted = Math.round(total * 0.9);
      html = "Total: " + travellers + " &times; " + price + " USD = <s>" + total + " USD</s> <strong>" + discounted + " USD</strong>";
      html += '<span class="discount-note">10% group discount applied!</span>';
    }
    priceBox.innerHTML = html;
  }
  tourSel.addEventListener("change", updatePrice);
  travSel.addEventListener("change", updatePrice);
  updatePrice();
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // No page reload
    msgBox.className = "message";
    msgBox.style.display = "none";
    nameInput.classList.remove("error");
    emailInput.classList.remove("error");

    const nameVal  = nameInput.value.trim();
    const emailVal = emailInput.value.trim();
    const errors   = [];
    if (nameVal === "") {
      errors.push("Please enter your name.");
      nameInput.classList.add("error");
    }
    if (!emailVal.includes("@")) {
      errors.push("Please enter a valid email address (must contain @).");
      emailInput.classList.add("error");
    }

    if (errors.length > 0) {
      msgBox.innerHTML = errors.join("<br>");
      msgBox.className = "message error-msg";
    } else {
      const price      = parseInt(tourSel.value);
      const travellers = parseInt(travSel.value);
      let total        = travellers * price;
      if (travellers >= 5) {
        total = Math.round(total * 0.9);
      }
      msgBox.innerHTML = "✅ Thank you, <strong>" + nameVal + "</strong>! Your booking is confirmed.<br>Total: <strong>" + total + " USD</strong>";
      msgBox.className = "message success-msg";
      form.reset();
      updatePrice();
    }
  });
});
