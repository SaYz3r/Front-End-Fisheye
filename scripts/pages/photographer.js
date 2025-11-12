async function getPhotographerData() {
    try {
        const response = await fetch('data/photographers.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        return null;
    }
}

function getPhotographerId() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id'));
}

async function displayPhotographerHeader(photographer) {
    const headerSection = document.querySelector('.photographer-header-container');
    const photographerModel = photographerPageTemplate(photographer);
    const headerDOM = photographerModel.getPhotographerHeaderDOM();
    headerSection.appendChild(headerDOM);

    const priceElement = document.getElementById('photographer-price');
    if (priceElement) {
        priceElement.textContent = `${photographer.price}€ / jour`;
    }
}

async function displayPhotographerMedia(medias, photographerName) {
    const mediaSection = document.querySelector('.photographer-media');
    
    medias.forEach((media) => {
        const mediaModel = mediaTemplate(media, photographerName);
        const mediaCardDOM = mediaModel.getMediaCardDOM();
        mediaSection.appendChild(mediaCardDOM);
    });
    
    // Mettre à jour le total des likes après l'affichage
    updateTotalLikes();
}

async function init() {
    const photographerId = getPhotographerId();
    const data = await getPhotographerData();
    
    if (!data) {
        console.error('Impossible de charger les données');
        return;
    }
    
    const photographer = data.photographers.find(p => p.id === photographerId);
    
    if (!photographer) {
        console.error('Photographe non trouvé');
        return;
    }
    
    const photographerMedia = data.media.filter(m => m.photographerId === photographerId);
    
    displayPhotographerHeader(photographer);
    displayPhotographerMedia(photographerMedia, photographer.name);
}

init();