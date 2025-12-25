function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {

        const link = document.createElement('a');
        link.setAttribute('href', `photographer.html?id=${id}`);
        link.setAttribute('aria-label', name);

        const article = document.createElement('article');
        
        // Image
        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);
        
        // Nom
        const h2 = document.createElement('h2');
        h2.textContent = name;
        
        // Localisation (ville, pays)
        const location = document.createElement('p');
        location.textContent = `${city}, ${country}`;
        location.classList.add('location');
        
        // Tagline (slogan)
        const taglineElement = document.createElement('p');
        taglineElement.textContent = tagline;
        taglineElement.classList.add('tagline');
        
        // Prix
        const priceElement = document.createElement('p');
        priceElement.textContent = `${price}€/jour`;
        priceElement.classList.add('price');
        
        // Ajout des éléments à l'article
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(location);
        article.appendChild(taglineElement);
        article.appendChild(priceElement);

        link.appendChild(article);
        
        return link;
    }
    
    return { name, picture, getUserCardDOM };
}

export { photographerTemplate };