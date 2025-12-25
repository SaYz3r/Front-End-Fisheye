import { updateDisplayedMediasOrder } from "./lightbox.js";

document.addEventListener('DOMContentLoaded', function() {
    const sortButton = document.getElementById('sort-button');
    const sortOptions = document.getElementById('sort-options');

    // Ordre original des tris
    const originalOrder = ["popularity", "date", "title"];

    // Fonction qui met à jour la liste des choix
    function updateSortList(selectedSort) {
        // Nettoyer la liste
        sortOptions.innerHTML = "";

        originalOrder.forEach(sortKey => {
            if (sortKey !== selectedSort) {
                const div = document.createElement("div");
                div.classList.add("sort-option");
                div.setAttribute("data-sort", sortKey);

                div.textContent =
                    (sortKey === "popularity" ? "Popularité" :
                    sortKey === "date" ? "Date" :
                    "Titre");

                // Réattacher l'événement de clic
                div.addEventListener('click', function() {
                    handleSortChange(sortKey, div.textContent);
                });

                sortOptions.appendChild(div);
            }
        });
    }

    // Lorsqu'on change de tri
    function handleSortChange(sortType, sortText) {
        // Mettre à jour bouton
        sortButton.childNodes[0].textContent = sortText + " ";

        // Mettre à jour liste
        updateSortList(sortType);

        // Fermer dropdown
        sortOptions.classList.remove('show');
        sortButton.querySelector('span').textContent = '▼';

        // Tri des médias
        sortMedia(sortType);
        
        // Mettre à jour l'ordre dans la lightbox
        updateDisplayedMediasOrder();
    }

    // Ouverture / fermeture dropdown
    sortButton.addEventListener('click', function(e) {
        e.stopPropagation();
        sortOptions.classList.toggle('show');

        const arrow = sortButton.querySelector('span');
        arrow.textContent = sortOptions.classList.contains('show') ? '▲' : '▼';
    });

    document.addEventListener('click', function(e) {
        if (!sortButton.contains(e.target) && !sortOptions.contains(e.target)) {
            sortOptions.classList.remove('show');
            sortButton.querySelector('span').textContent = '▼';
        }
    });

    // Initialisation : tri par défaut = popularity
    updateSortList("popularity");
});

// Fonction de tri des médias
function sortMedia(sortType) {
    const mediaSection = document.querySelector('.photographer-media');
    if (!mediaSection) return;
    const mediaCards = Array.from(mediaSection.querySelectorAll('.media-card'));

    mediaCards.sort((a, b) => {
        switch(sortType) {
            case 'popularity': {
                const likesA = parseInt(a.querySelector('.likes-count').textContent) || 0;
                const likesB = parseInt(b.querySelector('.likes-count').textContent) || 0;
                return likesB - likesA;
            }
            case 'date': {
                const dateA = a.dataset.date || '1970-01-01';
                const dateB = b.dataset.date || '1970-01-01';
                return new Date(dateB) - new Date(dateA);
            }
            case 'title': {
                const titleA = a.querySelector('h3').textContent.toLowerCase();
                const titleB = b.querySelector('h3').textContent.toLowerCase();
                return titleA.localeCompare(titleB);
            }
            default:
                return 0;
        }
    });

    mediaCards.forEach(card => mediaSection.appendChild(card));
}