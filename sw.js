// Nom du cache
const CACHE_NAME = "mayemmood-cache-v1";

// Fichiers à mettre en cache pour que l'app fonctionne offline
const urlsToCache = [
  "index.html",
  "manifest.json",
  "icon-192.png",
  "icon-512.png"
];

// Installer le service worker et mettre les fichiers en cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Cache ouvert et fichiers ajoutés");
      return cache.addAll(urlsToCache);
    })
  );
});

// Intercepter les requêtes et répondre depuis le cache si offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});