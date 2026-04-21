const SERVICE_CATEGORIES = [
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

const categoryMap = new Map();

SERVICE_CATEGORIES.forEach((category) => {
  categoryMap.set(category.value.toLowerCase(), category);
  categoryMap.set(category.label.toLowerCase(), category);
});

function normalizeCategory(input) {
  if (typeof input !== 'string') {
    return null;
  }

  const normalizedInput = input.trim().toLowerCase();
  return categoryMap.get(normalizedInput) || null;
}

module.exports = {
  SERVICE_CATEGORIES,
  normalizeCategory
};
