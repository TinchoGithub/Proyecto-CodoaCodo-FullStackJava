document.addEventListener('DOMContentLoaded', function () {

    apiKey = '659718937fc5941cafefbae7040422e4';
    const urlBase = 'https://api.themoviedb.org/3'

    // FUNCIÓN PARA MOSTRAR PELICULAS ACLAMADAS EN EL CAROUSEL
    async function getAclamadas() {
        const url = `${urlBase}/movie/top_rated?api_key=${apiKey}&language=es-ES&page=3`
        const carousel = document.getElementById('carousel-inner');
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            const movies = data.results;

            const numeroPorCarousel = 4;
            for (let i = 0; i < movies.length; i += numeroPorCarousel) {
                const nuevaLista = movies.slice(i, i + numeroPorCarousel);
                const carouselItem = document.createElement('div');
                carouselItem.classList.add('carousel-item');
                if (i === 0) {
                    carouselItem.classList.add('active');
                }

                const row = document.createElement('div');
                row.classList.add('row');

                nuevaLista.forEach(movie => {
                    const col = document.createElement('div');
                    col.classList.add('col-6', 'col-md-3');

                    const link = document.createElement('a');
                    link.href = `./detalle.html?id=${movie.id}`;

                    const img = document.createElement('img');
                    img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                    img.classList.add('img-fluid', 'rounded', 'mx-auto', 'd-block');
                    img.alt = movie.title;
                    img.href = `./detalle.html?id=${movie.id}`

                    link.appendChild(img);
                    col.appendChild(link);
                    row.appendChild(col);
                    
                });

                carouselItem.appendChild(row);
                carousel.appendChild(carouselItem);
            }
        } catch (error) {
            throw new Error("Error de conexión");
        }

    }
    getAclamadas();

})

