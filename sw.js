const CACHE_NAME = 'aprender-horas-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icone512.jpg',
  './paoloargento-quiz-countdown-194417.mp3'
];

// Instala o Service Worker e armazena os arquivos no cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Arquivos em cache com sucesso!');
        return cache.addAll(urlsToCache);
      })
  );
});

// Intercepta as requisições para rodar offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Se o arquivo estiver no cache, retorna ele. Se não, busca na internet.
        return response || fetch(event.request);
      })
  );
});