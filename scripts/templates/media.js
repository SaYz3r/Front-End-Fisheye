function mediaTemplate(media, photographerName) {
    const { id, title, image, video, likes, date } = media;
    
    const folderName = photographerName.replace(/\s+/g, '').replace(/-/g, '');
    
    function getMediaCardDOM() {
        const article = document.createElement('article');
        article.classList.add('media-card');
        article.dataset.mediaId = id;
        article.dataset.originalLikes = likes;
        article.dataset.date = date;
        
        // Conteneur du média - rendre focusable avec TAB
        const mediaContainer = document.createElement('div');
        mediaContainer.classList.add('media-container');
        mediaContainer.setAttribute('tabindex', '0');
        
        if (image) {
            const img = document.createElement('img');
            img.setAttribute('src', `assets/photographers/${folderName}/${image}`);
            img.setAttribute('alt', title);
            mediaContainer.appendChild(img);
        } else if (video) {
            const videoElement = document.createElement('video');
            videoElement.setAttribute('src', `assets/photographers/${folderName}/${video}`);
            videoElement.setAttribute('controls', '');
            videoElement.setAttribute('aria-label', title);
            mediaContainer.appendChild(videoElement);
        }
        
        // Gérer l'ouverture de la lightbox avec Entrée ou Espace
        mediaContainer.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const allCards = document.querySelectorAll('.media-card');
                const index = Array.from(allCards).indexOf(article);
                openLightbox(index);
            }
        });
        
        // Ajouter un focus visible
        mediaContainer.addEventListener('focus', function() {
            this.style.outline = '3px solid #901C1C';
            this.style.outlineOffset = '2px';
        });
        
        mediaContainer.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
        
        // Informations du média
        const infoDiv = document.createElement('div');
        infoDiv.classList.add('media-info');
        
        const titleElement = document.createElement('h3');
        titleElement.textContent = title;
        
        const likesContainer = document.createElement('div');
        likesContainer.classList.add('likes-container');
        
        const likesElement = document.createElement('span');
        likesElement.textContent = getCurrentLikes(id, likes);
        likesElement.classList.add('likes-count');
        
        const heartIcon = document.createElement('span');
        heartIcon.textContent = '❤️';
        heartIcon.classList.add('heart-icon');
        heartIcon.setAttribute('role', 'button');
        heartIcon.setAttribute('aria-label', `Aimer ${title}`);
        heartIcon.setAttribute('tabindex', '0');
        
        // Vérifier si déjà liké
        const likedMedias = getLikedMedias();
        if (likedMedias.includes(id)) {
            heartIcon.classList.add('liked');
        }
        
        // Gestion du clic sur le coeur
        heartIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleLike(id, likes, likesElement, heartIcon);
        });
        
        // Gestion du clavier (accessibilité)
        heartIcon.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.stopPropagation();
                toggleLike(id, likes, likesElement, heartIcon);
            }
        });
        
        likesContainer.appendChild(likesElement);
        likesContainer.appendChild(heartIcon);
        
        infoDiv.appendChild(titleElement);
        infoDiv.appendChild(likesContainer);
        
        article.appendChild(mediaContainer);
        article.appendChild(infoDiv);
        
        return article;
    }
    
    return { id, likes, getMediaCardDOM };
}