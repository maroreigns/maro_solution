const SERVICE_LOCATIONS = [
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

const locationMap = new Map();

SERVICE_LOCATIONS.forEach((location) => {
  locationMap.set(location.value.toLowerCase(), location);
  locationMap.set(location.label.toLowerCase(), location);
});

function normalizeLocation(input) {
  if (typeof input !== 'string') {
    return null;
  }

  const normalizedInput = input.trim().toLowerCase();
  return locationMap.get(normalizedInput) || null;
}

module.exports = {
  SERVICE_LOCATIONS,
  normalizeLocation
};
