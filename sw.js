self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('v1').then((cache) => {
            return cache.addAll(['index.html', 'js/index.js', 'offline.html']);
        })
    )
    self.skipWaiting();
    console.log('ServiceWorker installerades klockan: ', new Date().toLocaleTimeString());
});

self.addEventListener('activate', event => {
    self.skipWaiting();
    console.log('ServiceWorker installerades klockan: ', new Date().toLocaleTimeString());
});

self.addEventListener('fetch', event => {
    console.log(event.request.url);
    if (!navigator.onLine) {
        event.respondWith(
            caches.match(event.request)
            .then((response) => {
                console.log('RESPONSE: ', response);
                if (response) {
                    return response;
                } else {
                    return caches.match(new Request('offline.html'));
                }
            })
        )
    } else {
        console.log('Online!');
        return updateCache(event.request);
    }
});

async function updateCache(request) {
    return fetch(request).then((response) => {
        return caches.open('v1').then((cache) => {
            return cache.put(request, response.clone())
            .then(() => {
                return response;
            })
        });
    })
}