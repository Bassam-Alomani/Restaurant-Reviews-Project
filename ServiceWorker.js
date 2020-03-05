const staticCacheName= 'RRA-cash-1';
const casheElements=[
  '/',
  'index.html',
  'restaurant.html',
  '/js/main.js',
  '/css/styles.css',
  '/data/restaurants.json',
  '/js/restaurant_info.js',
  '/js/dbhelper.js',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg',
];
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then( (cache) => {
      return cache.addAll(casheElements);
    }).catch(error=>{console.log(error)})
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
      caches.keys().then( (cacheNames) => {
        return Promise.all(
          cacheNames.filter(function (cacheName) {
              return cacheName.startsWith('restaurant-') && cacheName != staticCacheName;
          }).map(function (cacheName) {
              return caches.delete(cacheName);
            })
        );
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
