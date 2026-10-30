// Vite fingerprints these local photos and serves them from the deployment CDN.
const files = import.meta.glob('../assets/images/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
})

const u = id => files[`../assets/images/${id}-1200.webp`]

export const IMAGE_SOURCES = Object.fromEntries(
  Object.entries(files)
    .filter(([path]) => path.endsWith('-1200.webp'))
    .map(([path, src]) => [src, `${files[path.replace('-1200.webp', '-480.webp')]} 480w, ${src} 1200w`]),
)

export const IMAGES = {
  heroCupFallback: u('photo-1461023058943-07fcbe16d735'),
  aboutMain: u('photo-1554118811-1e0d58224f24'),
  aboutDetail: u('photo-1442512595331-e89e73853f31'),
  signature: u('photo-1495474472287-4d71bcdd2085'),
}

export const MENU = [
  {
    name: 'Cappuccino',
    tag: 'Espresso Bar',
    description: 'Double shot, velvet micro-foam, a dusting of single-origin cocoa.',
    price: '$4.50',
    img: u('photo-1572442388796-11668a67e53d'),
    tone: '#2a1a11',
  },
  {
    name: 'Cold Coffee',
    tag: 'Slow Brewed',
    description: 'Eighteen-hour cold brew over ice, finished with sweet cold foam.',
    price: '$5.20',
    img: u('photo-1461023058943-07fcbe16d735'),
    tone: '#1c2530',
  },
  {
    name: 'Pizza',
    tag: 'Stone Oven',
    description: 'Blistered sourdough base, San Marzano, torn basil, aged mozzarella.',
    price: '$13.00',
    img: u('photo-1513104890138-7c749659a591'),
    tone: '#3a2114',
  },
  {
    name: 'Waffles',
    tag: 'All Day',
    description: 'Buttermilk waffle, brown-butter syrup, macerated berries.',
    price: '$9.50',
    img: u('photo-1562376552-0d160a2f238d'),
    tone: '#3b2a16',
  },
  {
    name: 'Pasta',
    tag: 'Kitchen',
    description: 'Hand-rolled tagliatelle, slow ragù, parmesan aged twenty-four months.',
    price: '$15.00',
    img: u('photo-1621996346565-e3dbc646d9a9'),
    tone: '#33221a',
  },
  {
    name: 'Desserts',
    tag: 'Pastry',
    description: 'A rotating selection of freshly made pastries and sweet treats.',
    price: '$7.00',
    img: u('photo-1551024506-0bccd828d307'),
    tone: '#2b1a14',
  },
]

export const ATMOSPHERE = [
  { key: 'coffee', caption: 'The Pour', img: u('photo-1509042239860-f550ce710b93'), tone: '#2a1a11', span: 'lg:col-span-7 lg:row-span-2' },
  { key: 'food', caption: 'The Kitchen', img: u('photo-1513104890138-7c749659a591'), tone: '#3a2114', span: 'lg:col-span-5' },
  { key: 'interior', caption: 'The Room', img: u('photo-1554118811-1e0d58224f24'), tone: '#241a14', span: 'lg:col-span-5' },
  { key: 'friends', caption: 'The Company', img: u('photo-1521017432531-fbd92d768814'), tone: '#2d2118', span: 'lg:col-span-6' },
  { key: 'evening', caption: 'The Evening', img: u('photo-1453614512568-c4024d13c247'), tone: '#1a1a1f', span: 'lg:col-span-6' },
]

export const GALLERY = [
  { img: u('photo-1495474472287-4d71bcdd2085'), label: 'Morning Ritual' },
  { img: u('photo-1461023058943-07fcbe16d735'), label: 'First Pour' },
  { img: u('photo-1442512595331-e89e73853f31'), label: 'The Long Table' },
  { img: u('photo-1521017432531-fbd92d768814'), label: 'Good Company' },
  { img: u('photo-1497935586351-b67a49e012bf'), label: 'Golden Hour' },
  { img: u('photo-1445116572660-236099ec97a0'), label: 'After Hours' },
]
