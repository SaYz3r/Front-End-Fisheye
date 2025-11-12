document.addEventListener('DOMContentLoaded', function() {
    const sortButton = document.getElementById('sort-button');
    const sortOptions = document.getElementById('sort-options');
    const sortOptionItems = document.querySelectorAll('.sort-option');
    
    if (!sortButton || !sortOptions) return;
    
    // Toggle du dropdown au clic sur le bouton
    sortButton.addEventListener('click', function(e) {
        e.stopPropagation();
        sortOptions.classList.toggle('show');
        
        // Changer la direction de la flèche
        const arrow = sortButton.querySelector('span');
        if (sortOptions.classList.contains('show')) {
            arrow.textContent = '▲';
        } else {
            arrow.textContent = '▼';
        }
    });
    
    // Gestion des options de tri
    sortOptionItems.forEach(option => {
        option.addEventListener('click', function() {
            const sortType = this.getAttribute('data-sort');
            const sortText = this.textContent;
            
            // Mettre à jour le texte du bouton
            sortButton.childNodes[0].textContent = sortText + ' ';
            
            // Fermer le dropdown
            sortOptions.classList.remove('show');
            sortButton.querySelector('span').textContent = '▼';
            
            // Appeler la fonction de tri
            sortMedia(sortType);
        });
    });
    
    // Fermer le dropdown si on clique en dehors
    document.addEventListener('click', function(e) {
        if (!sortButton.contains(e.target) && !sortOptions.contains(e.target)) {
            sortOptions.classList.remove('show');
            sortButton.querySelector('span').textContent = '▼';
        }
    });
});

// Fonction de tri des médias
function sortMedia(sortType) {
    const mediaSection = document.querySelector('.photographer-media');
    const mediaCards = Array.from(mediaSection.querySelectorAll('.media-card'));
    
    mediaCards.sort((a, b) => {
        switch(sortType) {
            case 'popularity':
                // Trier par nombre de likes (décroissant)
                const likesA = parseInt(a.querySelector('.likes-count').textContent);
                const likesB = parseInt(b.querySelector('.likes-count').textContent);
                return likesB - likesA;
                
            case 'date':
                // Trier par date (décroissant - plus récent en premier)
                const dateA = a.dataset.date || '1970-01-01';
                const dateB = b.dataset.date || '1970-01-01';
                return new Date(dateB) - new Date(dateA);
                
            case 'title':
                // Trier par titre (alphabétique)
                const titleA = a.querySelector('h3').textContent.toLowerCase();
                const titleB = b.querySelector('h3').textContent.toLowerCase();
                return titleA.localeCompare(titleB);
                
            default:
                return 0;
        }
    });
    
    // Réorganiser les cartes dans le DOM
    mediaCards.forEach(card => {
        mediaSection.appendChild(card);
    });
}