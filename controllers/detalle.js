document.addEventListener('DOMContentLoaded', function () {

    apiKey = '659718937fc5941cafefbae7040422e4';
    const urlBase = 'https://api.themoviedb.org/3'

    // OBTENGO URL
    const urlParams = new URLSearchParams(window.location.search);

    // OBTENGO EL ID DE LA PELÍCULA PASADO EN LA URL
    const movieId = urlParams.get('id');
    console.log('id: ' + movieId);

    async function getDetalle() {

        try {
            const response = await fetch(`${urlBase}/movie/${movieId}?api_key=${apiKey}&language=es-ES`);
            const data = await response.json();
            console.log(data);

            mostrarDetalle(data);

        } catch (error) {
            throw new Error(`Error ${response.status} ${response.statusText}`);
        }
    }
    getDetalle();
});

function mostrarDetalle(movie) {

    const imageUrl = 'https://image.tmdb.org/t/p/w500';

    const img = document.getElementById('imagen');
    img.src = `${imageUrl}/${movie.poster_path}`;
    img.alt = movie.title;

    const titulo = document.getElementById('titulo');
    titulo.textContent = movie.title;

    const sinopsis = document.getElementById('sinopsis');
    sinopsis.textContent = movie.overview;

    const genero = document.getElementById('genero');
    const generos = movie.genres.map(genre => genre.name).join(', ');
    genero.textContent = `Género: ${generos} | Duración: ${movie.runtime} min`;

    const fecha = document.getElementById('fecha');
    fecha.textContent = movie.release_date;

    const presupuesto = document.getElementById('presupuesto');
    presupuesto.textContent = movie.budget;

    const votos = document.getElementById('votos');
    votos.textContent = movie.vote_count;

    const video = document.getElementById('video');
    if (movie.video == false) {
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('d-flex', 'align-items-center', 'justify-content-center');
        const imageElement = document.createElement('img');
        imageElement.classList.add('img-fluid');
        imageElement.style.width = '70%'
        imageElement.src = `${imageUrl}/${movie.backdrop_path}`;
        imageElement.alt = movie.title;

        imageContainer.appendChild(imageElement);
        video.appendChild(imageContainer);

    } else {

        const videoElement = document.createElement('iframe');
        videoElement.src = `https://www.youtube.com/embed/${movie.video}`;
        videoElement.classList.add('w-100');
        videoElement.height = '500px';
        videoElement.allowFullscreen = true;
        video.appendChild(videoElement);
    }


}
