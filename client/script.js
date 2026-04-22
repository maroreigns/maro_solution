// =========================
// CATEGORY DATA
// =========================
const categoriesData = [
  "Plumber","Electrician","Mechanic","Carpenter",
  "Painter","Cleaner","Driver","Cook","Home Tutor","Gateman"
];

// =========================
// STATE + LGA DATA
// =========================
const nigeriaData = {
  Lagos: ["Ikeja","Surulere","Yaba","Lekki","Ikorodu","Agege","Epe","Badagry"],
  Abuja: ["Gwagwalada","Kuje","Bwari","Abaji","Kwali","Municipal"],
  Rivers: ["Port Harcourt","Obio-Akpor","Eleme","Oyigbo","Khana"],
  Kano: ["Nasarawa","Fagge","Dala","Gwale","Tarauni"],
  Oyo: ["Ibadan North","Ibadan South-West","Akinyele","Egbeda"],
  Enugu: ["Enugu North","Enugu South","Nsukka","Udi"],
  Kaduna: ["Chikun","Igabi","Zaria","Sabon Gari"]
};

const API_BASE_URL = "https://maro-solution.onrender.com/api";

// =========================
// LOAD PAGE
// =========================
document.addEventListener("DOMContentLoaded", async () => {

  // =========================
  // ACTIVE NAV
  // =========================
  const currentPage = window.location.pathname.split("/").pop();
  document.querySelectorAll(".nav-links a").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

  // =========================
  // HAMBURGER MENU
  // =========================
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // =========================
  // CATEGORY DROPDOWN
  // =========================
  const categorySelect = document.getElementById("category");

  if (categorySelect) {
    categoriesData.forEach(cat => {
      const option = document.createElement("option");
      option.value = cat;
      option.textContent = cat;
      categorySelect.appendChild(option);
    });
  }

  // =========================
  // STATE + LGA DROPDOWN
  // =========================
  const stateSelect = document.getElementById("state");
  const lgaSelect = document.getElementById("lga");

  if (stateSelect && lgaSelect) {
    Object.keys(nigeriaData).forEach(state => {
      const option = document.createElement("option");
      option.value = state;
      option.textContent = state;
      stateSelect.appendChild(option);
    });

    stateSelect.addEventListener("change", () => {
      lgaSelect.innerHTML = '<option value="">Select LGA</option>';

      nigeriaData[stateSelect.value]?.forEach(lga => {
        const option = document.createElement("option");
        option.value = lga;
        option.textContent = lga;
        lgaSelect.appendChild(option);
      });
    });
  }

  // =========================
  // ADD BUSINESS FORM
  // =========================
  const form = document.getElementById("add-form");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const category = document.getElementById("category").value;
      const state = document.getElementById("state").value;
      const lga = document.getElementById("lga").value;
      const phone = document.getElementById("phone").value;

      try {
        const res = await fetch(`${API_BASE_URL}/businesses`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name,
            category,
            state,
            lga,
            phone
          })
        });

        await res.json();

        document.getElementById("message").innerText = "✅ Business added!";
        form.reset();

      } catch (err) {
        console.error(err);
        document.getElementById("message").innerText = "❌ Failed to add business";
      }
    });
  }

  // =========================
  // LOAD BUSINESSES (LISTINGS PAGE)
  // =========================
  const businessList = document.getElementById("business-list");
  const loading = document.getElementById("loading");

  if (businessList) {
    try {
      const res = await fetch(`${API_BASE_URL}/businesses`);
      const businesses = await res.json();

      if (loading) loading.style.display = "none";

      displayBusinesses(businesses);

    } catch (err) {
      if (loading) loading.innerHTML = "⚠️ Failed to load";
      console.error(err);
    }
  }

});

// =========================
// DISPLAY BUSINESSES
// =========================
function displayBusinesses(businesses) {
  const businessList = document.getElementById("business-list");

  if (!businessList) return;

  businessList.innerHTML = "";

  businesses.forEach(b => {

    const state = b.state || "";
    const lga = b.lga || "";

    const location = state && lga
      ? `${state} - ${lga}`
      : state || "N/A";

    const image = b.image || "https://via.placeholder.com/80";

    const rating = Math.round(b.rating || 0);
    const reviews = b.numReviews || 0;

    const card = document.createElement("div");
    card.className = "business-card";

    card.innerHTML = `
      <div class="profile-img">
        <img src="${image}" alt="profile">
      </div>

      <h3>${b.name}</h3>

      <!-- ⭐ STARS -->
      <div class="stars" data-id="${b._id}">
        ${[1,2,3,4,5].map(i => `
          <span class="star ${i <= rating ? "active" : ""}" data-value="${i}">★</span>
        `).join("")}
        <small class="review-count">(${reviews})</small>
      </div>

      <p><strong>${b.category}</strong></p>

      <p class="location">📍 ${location}</p>

      <p>📞 ${b.phone}</p>

      <a href="https://wa.me/${b.phone}" target="_blank" class="whatsapp-btn">
        💬 Chat on WhatsApp
      </a>
    `;

    businessList.appendChild(card);
  });

  // =========================
  // STAR CLICK EVENT (SMOOTH)
  // =========================
  document.querySelectorAll(".star").forEach(star => {
    star.addEventListener("click", async function () {

      const value = Number(this.dataset.value);
      const starsContainer = this.parentElement;
      const businessId = starsContainer.dataset.id;

      // ⭐ INSTANT UI UPDATE
      const allStars = starsContainer.querySelectorAll(".star");

      allStars.forEach(s => {
        s.classList.remove("active");
        if (Number(s.dataset.value) <= value) {
          s.classList.add("active");
        }
      });

      // update review count visually
      const reviewText = starsContainer.querySelector(".review-count");
      let current = parseInt(reviewText.textContent.replace(/\D/g, "")) || 0;
      reviewText.textContent = `(${current + 1})`;

      // 🔁 SEND TO BACKEND (silent)
      try {
        await fetch(`${API_BASE_URL}/businesses/${businessId}/rate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ rating: value })
        });
      } catch (err) {
        console.error("Rating failed:", err);
      }

    });
  });
}