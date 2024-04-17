const images = [
    {src:"../assets/img/peli_1.jpg", title: "The Beekeeper"},
    {src:"../assets/img/peli_2.jpg", title: "Badland Hunters"},
    {src:"../assets/img/peli_3.jpg", title: "The Marvels"},
    {src:"../assets/img/peli_4.jpg", title: "Wonka"},
    {src:"../assets/img/peli_5.jpg", title: "Aquaman"},
    {src:"../assets/img/peli_6.jpg", title: "Migration"},
    {src:"../assets/img/peli_7.jpg", title: "60 Minutes"},
    {src:"../assets/img/peli_8.jpg", title: "Wish"},
    {src:"../assets/img/peli_9.jpg", title: "The Masked Saint"},
    {src:"../assets/img/peli_10.jpg", title: "Due Justice"},
    {src:"../assets/img/peli_11.jpg", title: "Orion and the Dark"},
    {src:"../assets/img/peli_12.jpg", title: "..."},
    {src:"../assets/img/peli_13.jpg", title: "Lift"},
    {src:"../assets/img/peli_14.jpg", title: "Attack"},
    {src:"../assets/img/peli_15.jpg", title: "Mutant ghost wargirl"},
    {src:"../assets/img/peli_16.jpg", title: "Poors things"},
    {src:"../assets/img/peli_17.jpg", title: "The 5"},
    {src:"../assets/img/peli_18.jpg", title: "Trunk Locked in"},
    {src:"../assets/img/peli_19.jpg", title: "Anyone but you"}
];

// Función para crear una  Card para cada imagen
function createCard(image) {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('col', 'mb-5');
    cardDiv.setAttribute('data-aos', 'flip-left');

    const card = document.createElement('div');
    card.classList.add('card', 'h-100', 'bg-black');

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
