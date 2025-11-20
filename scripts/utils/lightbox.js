let currentMediaIndex = 0;
let allMedias = [];

function initLightbox(medias) {
    allMedias = medias;
    
    const mediaCards = document.querySelectorAll('.media-card');
    mediaCards.forEach((card, index) => {
        const mediaContainer = card.querySelector('.media-container');
        mediaContainer.addEventListener('click', function() {
            openLightbox(index);
        });
    });
}

function openLightbox(index) {
    currentMediaIndex = index;
    const lightboxModal = document.getElementById('lightbox_modal');
    lightboxModal.style.display = 'flex';
    displayCurrentMedia();
}

function closeLightbox() {
    const lightboxModal = document.getElementById('lightbox_modal');
    lightboxModal.style.display = 'none';
    
    const video = lightboxModal.querySelector('video');
    if (video) {
        video.pause();
    }
}

function displayCurrentMedia() {
    const lightboxModal = document.getElementById('lightbox_modal');
    const mediaContainer = lightboxModal.querySelector('.lightbox-media-container');
    const footerTitle = lightboxModal.querySelector('.lightbox-footer-title');
    const counterElement = lightboxModal.querySelector('.lightbox-counter');
    
    // Vider le conteneur
    mediaContainer.innerHTML = '';
    
    const media = allMedias[currentMediaIndex];
    const photographerName = document.querySelector('[data-photographer-name]').dataset.photographerName;
    const folderName = photographerName.replace(/\s+/g, '').replace(/-/g, '');
    
    if (media.image) {
        const img = document.createElement('img');
        img.setAttribute('src', `assets/photographers/${folderName}/${media.image}`);
        img.setAttribute('alt', media.title);
        mediaContainer.appendChild(img);
    } else if (media.video) {
        const video = document.createElement('video');
        video.setAttribute('src', `assets/photographers/${folderName}/${media.video}`);
        video.setAttribute('controls', '');
        video.setAttribute('autoplay', '');
        mediaContainer.appendChild(video);
    }
    
    footerTitle.textContent = media.title;
    counterElement.textContent = `${currentMediaIndex + 1} / ${allMedias.length}`;
    
    updateNavigationButtons();
}

function updateNavigationButtons() {
    const prevButton = document.querySelector('.lightbox-prev');
    const nextButton = document.querySelector('.lightbox-next');
    
    prevButton.disabled = currentMediaIndex === 0;
    nextButton.disabled = currentMediaIndex === allMedias.length - 1;
}

function previousMedia() {
    if (currentMediaIndex > 0) {
        currentMediaIndex--;
        displayCurrentMedia();
    }
}

function nextMedia() {
    if (currentMediaIndex < allMedias.length - 1) {
        currentMediaIndex++;
        displayCurrentMedia();
    }
}

document.addEventListener('keydown', function(e) {
    const lightboxModal = document.getElementById('lightbox_modal');
    
    if (lightboxModal && lightboxModal.style.display === 'flex') {
        if (e.key === 'ArrowLeft') {
            previousMedia();
        } else if (e.key === 'ArrowRight') {
            nextMedia();
        } else if (e.key === 'Escape') {
            closeLightbox();
        }
    }
});

window.addEventListener('click', function(event) {
    const lightboxModal = document.getElementById('lightbox_modal');
    
    if (event.target === lightboxModal) {
        closeLightbox();
    }
});
