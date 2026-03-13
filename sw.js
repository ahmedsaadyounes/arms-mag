/*
 * Service Worker for Ramses Magazine
 *
 * This service worker provides simple offline support by caching core
 * assets during installation and serving them from the cache on
 * subsequent requests. It also cleans up old caches on activation.
 */
const CACHE_NAME = 'ramses-cache-v1';

// List of files to pre-cache. Update this list if new assets are added.
const ASSETS = [
  './',
  'index.html',
  'style.css',
  'script.js',
  'manifest.json',
  'sw.js',
  'article1.html',
  'article2.html',
  'article3.html',
  'dashboard.html',
  'page.html',
  'images/hero.png',
  'images/placeholder.png',
  'images/icon-192.png',
  'images/icon-512.png'
];

self.addEventListener('install', event => {
  // Pre-cache assets
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('activate', event => {
  // Remove old caches
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

self.addEventListener('fetch', event => {
  // Respond with cached assets when available, else fetch from network
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return (
        cachedResponse ||
        fetch(event.request).catch(() => {
          // When offline and resource not cached, you could return a fallback page/image here
          return cachedResponse;
        })
      );
    })
  );
});