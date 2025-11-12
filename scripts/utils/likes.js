// Récupérer les modifications de likes (delta par rapport au JSON)
function getLikeDeltas() {
    return JSON.parse(localStorage.getItem('likeDeltas') || '{}');
}

function saveLikeDeltas(likeDeltas) {
    localStorage.setItem('likeDeltas', JSON.stringify(likeDeltas));
}

function getLikedMedias() {
    return JSON.parse(localStorage.getItem('likedMedias') || '[]');
}

function saveLikedMedias(likedMedias) {
    localStorage.setItem('likedMedias', JSON.stringify(likedMedias));
}

// Calculer les likes actuels (JSON + modifications)
function getCurrentLikes(mediaId, originalLikes) {
    const likeDeltas = getLikeDeltas();
    const delta = likeDeltas[mediaId] || 0;
    return originalLikes + delta;
}

// Toggle like/unlike
function toggleLike(mediaId, originalLikes, likesElement, heartIcon) {
    const likedMedias = getLikedMedias();
    const likeDeltas = getLikeDeltas();
    
    // Vérifier si déjà liké
    const isLiked = likedMedias.includes(mediaId);
    
    if (isLiked) {
        // Enlever le like
        const index = likedMedias.indexOf(mediaId);
        likedMedias.splice(index, 1);
        likeDeltas[mediaId] = (likeDeltas[mediaId] || 0) - 1;
        heartIcon.classList.remove('liked');
    } else {
        // Ajouter le like
        likedMedias.push(mediaId);
        likeDeltas[mediaId] = (likeDeltas[mediaId] || 0) + 1;
        heartIcon.classList.add('liked');
    }
    
    // Sauvegarder
    saveLikedMedias(likedMedias);
    saveLikeDeltas(likeDeltas);
    
    // Mettre à jour l'affichage
    const newLikes = getCurrentLikes(mediaId, originalLikes);
    likesElement.textContent = newLikes;
    
    // Mettre à jour le total des likes
    updateTotalLikes();
}

// Calculer et afficher le total des likes
function updateTotalLikes() {
    const allMediaCards = document.querySelectorAll('.media-card');
    let totalLikes = 0;
    
    allMediaCards.forEach(card => {
        const likesCount = card.querySelector('.likes-count');
        if (likesCount) {
            totalLikes += parseInt(likesCount.textContent);
        }
    });
    
    const totalLikesElement = document.getElementById('total-likes');
    if (totalLikesElement) {
        totalLikesElement.textContent = totalLikes;
    }
}

// Calculer le total initial des likes depuis les données
function calculateInitialTotalLikes(medias) {
    const likeDeltas = getLikeDeltas();
    
    const totalLikes = medias.reduce((sum, media) => {
        const delta = likeDeltas[media.id] || 0;
        return sum + media.likes + delta;
    }, 0);
    
    return totalLikes;
}