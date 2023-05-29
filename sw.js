const nombreCache = 'pwa-airin-archivos-cache';
const archivos = ['/',
                'index.html',
                'styles.css',
                'img',
];



self.addEventListener('install', precatching =>{
    self.skipWaiting();
    precatching.waitUntil(
        caches
            .open(nombreCache)
            .then(cache => {
                cache.addAll(archivos);
            })
    )
})



self.addEventListener('fetch', cargarCache =>{
    cargarCache.respondWith(
        caches
            .match(cargarCache.request)
            .then(respuesta => {
                if (respuesta){
                    return respuesta;
                }


                let peticionCache = cargarCache.request.clone();

                return fetch(peticionCache)
                    .then(respuesta => {
                        if (!respuesta){
                            return respuesta;
                        }
                        let respuestaCache = respuesta.clone();
                        caches
                            .open(nombreCache)
                            .then (cache => {
                                cache.put(peticionCache, respuestaCache);
                            })
                            return respuesta;
                    })
            })
    );
})
