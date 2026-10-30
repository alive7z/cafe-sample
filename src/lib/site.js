export const SITE = {
  name: 'Your Restaurant',
  tagline: 'Specialty Coffee · Kitchen · Since 2014',
  email: 'hello@yourrestaurant.example',
  address: '24 Ember Lane, Bandra West, Mumbai 400050',
  mapEmbed: 'https://www.google.com/maps?q=Bandra%20West%20Mumbai&z=14&output=embed',
  directions:
    'https://www.google.com/maps/dir/?api=1&destination=' +
    encodeURIComponent('24 Ember Lane, Bandra West, Mumbai 400050'),
  hours: [
    { d: 'Monday — Thursday', h: '7:30 — 23:00' },
    { d: 'Friday', h: '7:30 — 00:00' },
    { d: 'Saturday — Sunday', h: '8:00 — 00:00' },
  ],
}
