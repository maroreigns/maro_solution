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
// PAGE LOAD
// =========================
document.addEventListener("DOMContentLoaded", async () => {

  // =========================
  // NAVBAR ACTIVE + HAMBURGER
  // =========================
  const currentPage = window.location.pathname.split("/").pop();

  document.querySelectorAll(".nav-links a").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

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
  // ADD BUSINESS FORM (🔥 FIXED)
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

        const data = await res.json();

        console.log("Saved:", data); // 🔥 DEBUG

        document.getElementById("message").innerText = "✅ Business added successfully!";
        form.reset();

      } catch (err) {
        console.error(err);
        document.getElementById("message").innerText = "❌ Failed to add business";
      }
    });
  }

  // =========================
  // LOAD BUSINESSES
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
      console.error(err);
      if (loading) loading.innerText = "❌ Failed to load";
    }
  }

});

// =========================
// DISPLAY BUSINESSES (🔥 FIXED LOCATION)
// =========================
function displayBusinesses(businesses) {

  const businessList = document.getElementById("business-list");
  businessList.innerHTML = "";

  if (businesses.length === 0) {
    businessList.innerHTML = "<p>No businesses found</p>";
    return;
  }

  businesses.forEach(b => {

    const state = b.state || "";
    const lga = b.lga || "";

    const location = state && lga
      ? `${state} - ${lga}`
      : state || "N/A";

    // 🔥 PROFILE IMAGE (fallback added)
    const image = b.image || "https://via.placeholder.com/100";

    const card = document.createElement("div");
    card.className = "business-card";

    card.innerHTML = `

      <!-- PROFILE IMAGE -->
      <div class="profile-img">
        <img src="${image}" alt="profile">
      </div>

      <h3>${b.name}</h3>

      <p>⭐ ${b.rating || 0} (${b.numReviews || 0})</p>

      <p><strong>${b.category}</strong></p>

      <p>📍 ${location}</p>

      <p>📞 ${b.phone}</p>

      <a href="https://wa.me/${b.phone}" target="_blank" class="whatsapp-btn">
        💬 Chat on WhatsApp
      </a>
    `;

    businessList.appendChild(card);
  });
}