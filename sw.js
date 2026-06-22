const CACHE_VERSION = "mitotrivia-v0.2.0";
const APP_SHELL = [
    "./",
    "./index.html",
    "./styles.css",
    "./questions.js",
    "./app.js",
    "./manifest.webmanifest",
    "./icons/icon-192.png",
    "./icons/icon-512.png",
    "./icons/icon-maskable-512.png"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_VERSION)
            .then(cache => cache.addAll(APP_SHELL))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys()
            .then(keys => Promise.all(
                keys
                    .filter(key => key !== CACHE_VERSION)
                    .map(key => caches.delete(key))
            ))
            .then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", event => {
    if (event.request.method !== "GET") return;

    const requestUrl = new URL(event.request.url);
    const isSameOrigin = requestUrl.origin === self.location.origin;

    if (isSameOrigin) {
        event.respondWith(cacheFirst(event.request));
        return;
    }

    event.respondWith(networkFirst(event.request));
});

async function cacheFirst(request) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) return cachedResponse;

    const networkResponse = await fetch(request);
    const cache = await caches.open(CACHE_VERSION);
    cache.put(request, networkResponse.clone());
    return networkResponse;
}

async function networkFirst(request) {
    const cache = await caches.open(CACHE_VERSION);
    try {
        const networkResponse = await fetch(request);
        cache.put(request, networkResponse.clone());
        return networkResponse;
    } catch {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) return cachedResponse;
        throw new Error(`No cached response for ${request.url}`);
    }
}
