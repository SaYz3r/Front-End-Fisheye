function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "flex"; // Utiliser flex pour centrer

    // Récupérer le nom du photographe et l'afficher dans la modal
    const photographerName = document.querySelector('[data-photographer-name]').dataset.photographerName;
    const nameContainer = document.querySelector('.photographer-name-modal');
    nameContainer.textContent = photographerName;
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

// Fermer le modal en cliquant en dehors
window.onclick = function(event) {
    const modal = document.getElementById("contact_modal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

document.addEventListener("keydown", function(event) {
  // Vérifie si la touche pressée est "Escape" et si la modal est visible
  if (event.key === "Escape" && contact_modal.style.display === "flex") {
    // Si on est sur la page de confirmation, vider le formulaireS
      closeModal();
  }
});
