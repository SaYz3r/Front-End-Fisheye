function photographerPageTemplate(photographer) {
    const { name, city, country, tagline, portrait } = photographer;
    const picture = `assets/photographers/${portrait}`;

    function getPhotographerHeaderDOM() {
        const header = document.createElement('div');
        header.classList.add('photographer-header');
        
        // Conteneur des informations
        const infoDiv = document.createElement('div');
        infoDiv.classList.add('photographer-info');
        
        const nameElement = document.createElement('h1');
        nameElement.textContent = name;
        
        const location = document.createElement('p');
        location.textContent = `${city}, ${country}`;
        location.classList.add('location');
        
        const taglineElement = document.createElement('p');
        taglineElement.textContent = tagline;
        taglineElement.classList.add('tagline');
        
        infoDiv.appendChild(nameElement);
        infoDiv.appendChild(location);
        infoDiv.appendChild(taglineElement);
        
        // Photo du photographe
        const img = document.createElement('img');
        img.setAttribute('src', picture);
        img.setAttribute('alt', name);
        img.classList.add('photographer-portrait');
        
        header.appendChild(infoDiv);
        header.appendChild(img);
        
        return header;
    }
    
    return { getPhotographerHeaderDOM };
}