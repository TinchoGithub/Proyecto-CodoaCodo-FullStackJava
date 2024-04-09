// Datos de ejemplo (URL de imágenes y nombres de películas)
const images = [
    {src:"../assets/img/aclamada_1.jpg", title: "Shawshank"},
    {src:"../assets/img/aclamada_2.jpg", title: "El Padrino"},
    {src:"../assets/img/aclamada_4.jpg", title: "Schindler´sList"},
    {src:"../assets/img/aclamada_5.jpg", title: "12 Angry Men"},
    {src:"../assets/img/aclamada_6.jpg", title: "Spirited Away"},
    {src:"../assets/img/aclamada_7.jpg", title: "Batman"},
    {src:"../assets/img/aclamada_8.jpg", title: "Parasite"},
    {src:"../assets/img/aclamada_9.jpg", title: "The Green Mile"},
    {src:"../assets/img/aclamada_10.jpg", title: "Forrest Gump"},
    {src:"../assets/img/aclamada_11.jpg", title: "Pull Fiction"},
    {src:"../assets/img/aclamada_12.jpg", title: "Lord of the Rings"},
    {src:"../assets/img/mario.jpg", title: "Mario Bross Movie"},
    {src:"../assets/img/peli_1.jpg", title: "The Beekeeper"},
    {src:"../assets/img/peli_2.jpg", title: "Badland Hunters"},
    {src:"../assets/img/peli_3.jpg", title: "ParasThe Marvels"},
    {src:"../assets/img/peli_4.jpg", title: "Wonka"}
    // Se pueden añadir mas imagenes...
];

// Función para crear una  Card para cada imagen
function createCard(image) {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('col', 'mb-5', 'bg');
    cardDiv.setAttribute('data-aos', 'flip-left');

    const card = document.createElement('div');
    card.classList.add('card', 'h-100', 'bg-dark');

    const imageElement = document.createElement('img');
    imageElement.classList.add('img-fluid');
    imageElement.src = image.src;
    imageElement.alt = "Image";

    const textDiv = document.createElement('div');
    textDiv.classList.add('text-center', 'p-3');

    const title = document.createElement('h5');
    title.classList.add('card-title', 'text-secondary', 'mb-3');
    title.textContent = image.title;

    const button = document.createElement('a');
    button.classList.add('btn', 'btn-primary', 'mt-auto');
    button.href = "#";
    button.textContent = "Ver película";

    textDiv.appendChild(title);
    textDiv.appendChild(button);

    card.appendChild(imageElement);
    card.appendChild(textDiv);

    cardDiv.appendChild(card);

    return cardDiv;
}

// Obtener el contenedor de la galería
const galleryContainer = document.getElementById('gallery');

// Iterar sobre las imágenes y agregar cards al contenedor
images.forEach(image => {
    const card = createCard(image);
    galleryContainer.appendChild(card);
});
