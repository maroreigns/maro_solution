// script.js - Shared JavaScript for Maro Solution

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const API_BASE_URL = 'http://localhost:5000/api';
const FALLBACK_CATEGORIES = [
  { value: 'plumber', label: 'Plumber' },
  { value: 'electrician', label: 'Electrician' },
  { value: 'mechanic', label: 'Mechanic' },
  { value: 'carpenter', label: 'Carpenter' },
  { value: 'painter', label: 'Painter' },
  { value: 'welder', label: 'Welder' },
  { value: 'cleaner', label: 'Cleaner' },
  { value: 'cook', label: 'Cook' },
  { value: 'driver', label: 'Driver' },
  { value: 'gateman-security', label: 'Gateman / Security' },
  { value: 'home-tutor', label: 'Home Tutor' },
  { value: 'ac-technician', label: 'AC Technician' },
  { value: 'generator-repair', label: 'Generator Repair' },
  { value: 'phone-repair-technician', label: 'Phone Repair Technician' },
  { value: 'laptop-repair-technician', label: 'Laptop Repair Technician' },
  { value: 'tailor-fashion-designer', label: 'Tailor / Fashion Designer' },
  { value: 'hair-stylist-barber', label: 'Hair Stylist / Barber' },
  { value: 'makeup-artist', label: 'Makeup Artist' },
  { value: 'photographer', label: 'Photographer' },
  { value: 'event-planner', label: 'Event Planner' },
  { value: 'caterer', label: 'Caterer' },
  { value: 'laundry-dry-cleaner', label: 'Laundry / Dry Cleaner' },
  { value: 'interior-decorator', label: 'Interior Decorator' },
  { value: 'tiler', label: 'Tiler' },
  { value: 'pop-ceiling-installer', label: 'POP Ceiling Installer' },
  { value: 'bricklayer', label: 'Bricklayer' },
  { value: 'furniture-maker', label: 'Furniture Maker' },
  { value: 'cctv-installer', label: 'CCTV Installer' },
  { value: 'solar-installer', label: 'Solar Installer' },
  { value: 'borehole-driller', label: 'Borehole Driller' },
  { value: 'moving-service-relocation', label: 'Moving Service / Relocation' },
  { value: 'pest-control', label: 'Pest Control' },
  { value: 'security-guard-service', label: 'Security Guard Service' },
  { value: 'delivery-rider-dispatch', label: 'Delivery Rider / Dispatch' }
];
const FALLBACK_LOCATIONS = [
  { value: 'lagos', label: 'Lagos' },
  { value: 'abuja', label: 'Abuja' },
  { value: 'port-harcourt', label: 'Port Harcourt' },
  { value: 'ibadan', label: 'Ibadan' },
  { value: 'kano', label: 'Kano' },
  { value: 'enugu', label: 'Enugu' },
  { value: 'benin-city', label: 'Benin City' },
  { value: 'aba', label: 'Aba' },
  { value: 'kaduna', label: 'Kaduna' },
  { value: 'owerri', label: 'Owerri' }
];
const categoryLabelMap = new Map(FALLBACK_CATEGORIES.map((category) => [category.value, category.label]));
const categoryValueMap = new Map();
const locationValueMap = new Map();

FALLBACK_CATEGORIES.forEach((category) => {
  categoryValueMap.set(category.value.toLowerCase(), category.value);
  categoryValueMap.set(category.label.toLowerCase(), category.value);
});

FALLBACK_LOCATIONS.forEach((location) => {
  locationValueMap.set(location.value.toLowerCase(), location.label);
  locationValueMap.set(location.label.toLowerCase(), location.label);
});

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

function getUrlParams() {
  const params = {};
  const queryString = window.location.search.substring(1);
  const pairs = queryString.split('&');

  for (const pair of pairs) {
    if (pair) {
      const [key, value] = pair.split('=');
      params[decodeURIComponent(key)] = decodeURIComponent(value);
    }
  }

  return params;
}

async function fetchCategories() {
  try {
    const response = await fetch(`${API_BASE_URL}/businesses/categories`);

    if (!response.ok) {
      throw new Error('Failed to load categories');
    }

    const categories = await response.json();
    return Array.isArray(categories) && categories.length > 0 ? categories : FALLBACK_CATEGORIES;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return FALLBACK_CATEGORIES;
  }
}

async function fetchLocations() {
  try {
    const response = await fetch(`${API_BASE_URL}/businesses/locations`);

    if (!response.ok) {
      throw new Error('Failed to load locations');
    }

    const locations = await response.json();
    return Array.isArray(locations) && locations.length > 0 ? locations : FALLBACK_LOCATIONS;
  } catch (error) {
    console.error('Error fetching locations:', error);
    return FALLBACK_LOCATIONS;
  }
}

function populateCategorySelect(selectElement, categories, defaultLabel) {
  if (!selectElement) {
    return;
  }

  const currentValue = selectElement.value;
  selectElement.innerHTML = '';

  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.textContent = defaultLabel;
  selectElement.appendChild(defaultOption);

  categories.forEach((category) => {
    const option = document.createElement('option');
    option.value = category.value;
    option.textContent = category.label;
    selectElement.appendChild(option);

    categoryLabelMap.set(category.value, category.label);
    categoryValueMap.set(category.value.toLowerCase(), category.value);
    categoryValueMap.set(category.label.toLowerCase(), category.value);
  });

  if (currentValue) {
    selectElement.value = currentValue;
  }
}

function populateLocationSelect(selectElement, locations, defaultLabel) {
  if (!selectElement) {
    return;
  }

  const currentValue = selectElement.value;
  selectElement.innerHTML = '';

  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.textContent = defaultLabel;
  selectElement.appendChild(defaultOption);

  locations.forEach((location) => {
    const option = document.createElement('option');
    option.value = location.label;
    option.textContent = location.label;
    selectElement.appendChild(option);

    locationValueMap.set(location.value.toLowerCase(), location.label);
    locationValueMap.set(location.label.toLowerCase(), location.label);
  });

  if (currentValue) {
    selectElement.value = currentValue;
  }
}

function resolveCategoryValue(input) {
  if (typeof input !== 'string') {
    return '';
  }

  return categoryValueMap.get(input.trim().toLowerCase()) || input;
}

function resolveLocationValue(input) {
  if (typeof input !== 'string') {
    return '';
  }

  return locationValueMap.get(input.trim().toLowerCase()) || input;
}

function formatWhatsAppNumber(phone) {
  const digits = String(phone || '').replace(/\D/g, '');

  if (!digits) {
    return '';
  }

  if (digits.startsWith('234')) {
    return digits;
  }

  if (digits.startsWith('0')) {
    return `234${digits.slice(1)}`;
  }

  return `234${digits}`;
}

function renderStars(rating) {
  const roundedRating = Math.round(Number(rating) || 0);
  return '\u2605'.repeat(roundedRating) + '\u2606'.repeat(5 - roundedRating);
}

if (window.location.pathname.includes('listings.html')) {
  const businessList = document.getElementById('business-list');
  const loading = document.getElementById('loading');
  const categoryFilter = document.getElementById('category-filter');
  const locationFilter = document.getElementById('location-filter');
  const filterBtn = document.getElementById('filter-btn');

  async function fetchBusinesses(category = '', location = '') {
    loading.style.display = 'block';
    businessList.innerHTML = '';

    try {
      const url = `${API_BASE_URL}/businesses?category=${encodeURIComponent(category)}&location=${encodeURIComponent(location)}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to load businesses');
      }

      const businesses = await response.json();
      displayBusinesses(businesses);
    } catch (error) {
      console.error('Error fetching businesses:', error);
      businessList.innerHTML = '<p>Error loading businesses.</p>';
    } finally {
      loading.style.display = 'none';
    }
  }

  async function submitReview(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const businessId = form.dataset.businessId;
    const rating = form.querySelector('select[name="rating"]').value;
    const messageElement = form.querySelector('.review-message');

    try {
      const response = await fetch(`${API_BASE_URL}/businesses/${businessId}/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rating })
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to submit review');
      }

      messageElement.textContent = 'Review submitted successfully.';
      messageElement.classList.add('success');
      messageElement.classList.remove('error');

      fetchBusinesses(categoryFilter.value, locationFilter.value);
    } catch (error) {
      console.error('Error submitting review:', error);
      messageElement.textContent = error.message || 'Could not submit review.';
      messageElement.classList.add('error');
      messageElement.classList.remove('success');
    }
  }

  function displayBusinesses(businesses) {
    if (businesses.length === 0) {
      businessList.innerHTML = '<p>No businesses found.</p>';
      return;
    }

    businesses.forEach((business) => {
      const card = document.createElement('div');
      const whatsappNumber = formatWhatsAppNumber(business.phone);

      card.className = 'business-card';
      card.innerHTML = `
        <h3>${business.name}</h3>
        <div class="rating-summary">
          <span class="stars" aria-label="Rating ${business.rating || 0} out of 5">${renderStars(business.rating)}</span>
          <span class="rating-text">${Number(business.rating || 0).toFixed(1)} (${business.numReviews || 0} review${business.numReviews === 1 ? '' : 's'})</span>
        </div>
        <p><strong>Category:</strong> ${categoryLabelMap.get(business.category) || business.category}</p>
        <p><strong>Location:</strong> ${business.location}</p>
        <p><strong>Phone:</strong> ${business.phone}</p>
        <div class="card-actions">
          <a href="https://wa.me/${whatsappNumber}" class="whatsapp-btn" target="_blank" rel="noopener noreferrer">Contact on WhatsApp</a>
        </div>
        <form class="review-form" data-business-id="${business._id}">
          <label for="rating-${business._id}">Rate this business:</label>
          <div class="review-controls">
            <select id="rating-${business._id}" name="rating" required>
              <option value="">Choose rating</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
            <button type="submit" class="review-btn">Submit Review</button>
          </div>
          <p class="review-message" aria-live="polite"></p>
        </form>
      `;

      businessList.appendChild(card);
    });

    businessList.querySelectorAll('.review-form').forEach((form) => {
      form.addEventListener('submit', submitReview);
    });
  }

  const params = getUrlParams();

  Promise.all([fetchCategories(), fetchLocations()]).then(([categories, locations]) => {
    populateCategorySelect(categoryFilter, categories, 'All Categories');
    populateLocationSelect(locationFilter, locations, 'All Locations');

    if (params.category) {
      categoryFilter.value = resolveCategoryValue(params.category);
    }

    if (params.location) {
      locationFilter.value = resolveLocationValue(params.location);
    }

    fetchBusinesses(resolveCategoryValue(params.category || ''), resolveLocationValue(params.location || ''));
  });

  filterBtn.addEventListener('click', () => {
    const category = categoryFilter.value;
    const location = locationFilter.value;
    fetchBusinesses(category, location);
  });
}

if (window.location.pathname.includes('add.html')) {
  const addForm = document.getElementById('add-form');
  const message = document.getElementById('message');
  const categorySelect = document.getElementById('category');
  const locationSelect = document.getElementById('location');

  Promise.all([fetchCategories(), fetchLocations()]).then(([categories, locations]) => {
    populateCategorySelect(categorySelect, categories, 'Select Category');
    populateLocationSelect(locationSelect, locations, 'Select Location');
  });

  addForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(addForm);
    const data = {
      name: formData.get('name'),
      category: formData.get('category'),
      location: formData.get('location'),
      phone: formData.get('phone')
    };

    try {
      const response = await fetch(`${API_BASE_URL}/businesses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        message.textContent = 'Business added successfully!';
        message.style.color = 'green';
        addForm.reset();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add business');
      }
    } catch (error) {
      console.error('Error adding business:', error);
      message.textContent = error.message || 'Error adding business. Please try again.';
      message.style.color = 'red';
    }
  });
}
