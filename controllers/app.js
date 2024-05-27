document.addEventListener('DOMContentLoaded', function () {


    const apiKey = '659718937fc5941cafefbae7040422e4';
    const urlBase = 'https://api.themoviedb.org/3';
    let generoActual = null;
    let scroll = false;
    let searchQuery = '';

    //FUNCIÓN PARA OBTENER LAS PELICULAS DEL HOME
    async function getPeliculas(pageActual = 1) {

        let url;
        if (searchQuery) {
            url = `${urlBase}/search/movie?api_key=${apiKey}&language=es-ES&query=${searchQuery}&page=${pageActual}`;
        } else if (generoActual) {
            url = `${urlBase}/discover/movie?api_key=${apiKey}&language=es-ES&with_genres=${generoActual}&page=${pageActual}`
        } else {
            url = `${urlBase}/movie/popular?api_key=${apiKey}&language=es-ES&page=${pageActual}`;
        }

        const galleryContainer = document.getElementById('gallery');
        galleryContainer.innerHTML = '';

        try {
            const response = await fetch(url);
            const data = await response.json();
            const movies = data.results;

            if (movies.length === 0) {
                const divContainer = document.createElement('div');
                divContainer.classList.add('container', 'd-flex', 'justify-content-center', 'align-items-center', 'vh-50');

                const p = document.createElement('p');
                p.textContent = "Oops! No se han encontrado películas con ese nombre. ¡Inténtalo de nuevo!";
                p.classList.add('text-center', 'text-primary', 'fw-bold', 'fs-4');
                divContainer.appendChild(p);

                galleryContainer.appendChild(divContainer);
                searchQuery = '';
            } else {
                movies.forEach(movie => {
                    const card = createCard(movie);
                    galleryContainer.appendChild(card);

                });
            }

            createPagination(data.page, data.total_pages);

            if (scroll) {
                galleryContainer.scrollIntoView({ behavior: 'smooth' });
                scroll = false;
            }

        } catch (error) {
            throw new Error(`Error al obtener datos: ${response.status} ${response.statusText}`);
        }

    }
    // FUNCIÓN PARA CREAR PAGINACIÓN
    function createPagination(pageActual, totalPages) {

        const paginationContainer = document.getElementById('pagination');
        paginationContainer.innerHTML = '';

        // CREAR BOTON ANTERIOR
        const anterior = document.createElement('li');
        anterior.classList.add('page-item');
        if (pageActual === 1) {
            anterior.classList.add('disabled');
        }
        anterior.innerHTML = `<a class="page-link" href="#inicio" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a>`;
        anterior.addEventListener('click', function (event) {
            event.preventDefault();
            if (pageActual > 1) {
                pageActual--;
                getPeliculas(pageActual);
                galleryContainer.scrollIntoView({ behavior: 'smooth' });
            }
        });
        paginationContainer.appendChild(anterior);

        // CRAER BOTONES PAGINAS POR NÚMERO
        const maxPaginasMostrar = 10;
        let paginaInicio = Math.max(1, pageActual - Math.floor(maxPaginasMostrar / 2));
        let paginaFin = Math.min(totalPages, paginaInicio + maxPaginasMostrar - 1);
        if (paginaFin - paginaInicio + 1 < maxPaginasMostrar) {
            paginaInicio = Math.max(1, paginaFin - maxPaginasMostrar + 1);
        }
        for (let i = paginaInicio; i <= paginaFin; i++) {
            const pagina = document.createElement('li');
            pagina.classList.add('page-item');
            pagina.innerHTML = `<a class="page-link" href="#pagina${i}">${i}</a>`;
            if (i === pageActual) {
                pagina.classList.add('active');
            }
            pagina.addEventListener('click', function (event) {
                event.preventDefault();
                getPeliculas(i);
                galleryContainer.scrollIntoView({ behavior: 'smooth' });
            });
            paginationContainer.appendChild(pagina);
        }

        // CREAR BOTON SIGUIENTE
        const siguiente = document.createElement('li');
        siguiente.classList.add('page-item');
        if (pageActual === totalPages) {
            siguiente.classList.add('disabled');
        }
        siguiente.innerHTML = `<a class="page-link" href="#inicio" aria-label="Next"><span aria-hidden="true">&raquo;</span></a>`;
        siguiente.addEventListener('click', function (event) {
            event.preventDefault();
            if (pageActual < totalPages) {
                pageActual++;
                getPeliculas(pageActual);
                galleryContainer.scrollIntoView({ behavior: 'smooth' });
            }
        });
        paginationContainer.appendChild(siguiente);

    }

    // FUNCIÓN PARA CREAR CARD
    function createCard(movie) {
        const imageUrl = 'https://image.tmdb.org/t/p/w1280';

        const cardDiv = document.createElement('div');
        cardDiv.classList.add('col', 'mb-5');
        cardDiv.setAttribute('data-aos', 'flip-left');
        const card = document.createElement('div');
        card.classList.add('card', 'h-100', 'bg-dark');

        const imageElement = document.createElement('img');
        imageElement.classList.add('img-fluid');
        imageElement.src = `${imageUrl}/${movie.poster_path}`;
        imageElement.alt = movie.title;

        const textDiv = document.createElement('div');
        textDiv.classList.add('text-center', 'p-3');
        const title = document.createElement('h5');
        title.classList.add('card-title', 'text-white', 'mb-3');
        title.textContent = movie.title;

        const button = document.createElement('a');
        button.classList.add('btn', 'btn-primary', 'mt-auto');
        button.href = `./detalle.html?id=${movie.id}`;
        button.textContent = "Ver película";

        textDiv.appendChild(title);
        textDiv.appendChild(button);
        card.appendChild(imageElement);
        card.appendChild(textDiv);

        cardDiv.appendChild(card);

        return cardDiv;
    }

    // FUNCIÓN PARA OBTENER LOS GENEROS DE PELÍCULAS DE LA API
    async function getGeneros() {
        const url = `${urlBase}/genre/movie/list?api_key=${apiKey}&language=es-ES`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data.genres;

        } catch (error) {
            console.error("Error al obtener la lista de géneros:", error);
            return [];
        }
    }

    // FUNCIÓN PARA MOSTRAR LSO GENEROS EN EL NAV
    async function mostrarGenerosEnNavbar() {
        const generos = await getGeneros();
        const navbarDropdown = document.querySelector('.navbar-nav .dropdown-menu');
        generos.forEach(genero => {
            const menuItem = document.createElement('li');
            menuItem.innerHTML = `<a class="dropdown-item" href="#" data-id="${genero.id}">${genero.name}</a>`;
            menuItem.addEventListener('click', function (event) {
                event.preventDefault();
                generoActual = genero.id;
                scroll = true;
                searchQuery = '';
                getPeliculas();

            });

            navbarDropdown.appendChild(menuItem);

        });
    }

    //FUNCIÓN PARA EL BUSCADOR
    document.getElementById('searchForm').addEventListener('submit', function (event) {

        event.preventDefault();
        searchQuery = document.getElementById('searchInput').value;
        generoActual = null;
        scroll = true;
        getPeliculas();

    });



    getPeliculas();
    mostrarGenerosEnNavbar();

});








