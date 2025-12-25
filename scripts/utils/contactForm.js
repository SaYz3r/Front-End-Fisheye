function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "flex";
    
    // Récupérer le nom du photographe et l'afficher dans la modal
    const photographerName = document.querySelector('[data-photographer-name]').dataset.photographerName;
    const nameContainer = document.querySelector('.photographer-name-modal');
    nameContainer.textContent = photographerName;
    
    // Focus sur le premier champ
    const firstInput = document.getElementById('first-name');
    firstInput.focus();
}

window.displayModal = displayModal;

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

window.closeModal = closeModal;

// Fermer le modal en cliquant en dehors
window.onclick = function(event) {
    const modal = document.getElementById("contact_modal");
    if (event.target === modal) {
        modal.style.display = "none";
    };
};

document.addEventListener("keydown", function(event) {
  // Vérifie si la touche pressée est "Escape" et si la modal est visible
  if (event.key === "Escape" && this.contact_modal.style.display === "flex") {
    // Si on est sur la page de confirmation, vider le formulaireS
      closeModal();
  }
});

// Gérer la soumission du formulaire
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('#contact_modal form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Empêcher le rechargement de la page
            
            // Récupérer les valeurs du formulaire
            const firstName = document.getElementById('first-name').value;
            const lastName = document.getElementById('last-name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Valider les champs
            if (!firstName.trim() || !lastName.trim() || !email.trim() || !message.trim()) {
                alert('Veuillez remplir tous les champs');
                return;
            }
            
            // Ici vous pouvez envoyer les données au serveur
            console.log('Formulaire soumis:', {
                firstName,
                lastName,
                email,
                message
            });
            
            // Afficher un message de confirmation
            alert('Merci ! Votre message a été envoyé.');
            
            // Réinitialiser le formulaire
            form.reset();
            
            // Fermer la modal
            closeModal();
        });
    }
});