const searchChampionInput = document.querySelector("#search-champion-input");
const championsSuggestions = document.querySelector("#champions-suggestions");
const errorMessage = document.querySelector("#error-message");

// Fonction pour mettre à jour la visibilité des suggestions et du message d'erreur
function updateVisibility() {
    const inputValue = searchChampionInput.value.trim().toLowerCase();
    const hasFocus = document.activeElement === searchChampionInput;
    // Sélectionner tous les éléments de liste dans les suggestions
    const championItems = championsSuggestions.querySelectorAll('li');
    
    // Vérifier si au moins un élément correspond à la recherche
    const hasMatchingResult = [...championItems].some(item => {
        const championName = item.textContent.trim().toLowerCase();
        return championName.includes(inputValue);
    });
    
    // Mettre à jour la visibilité des suggestions et du message d'erreur
    championsSuggestions.classList.toggle("visible", inputValue.length > 0 && hasMatchingResult && hasFocus);
    errorMessage.classList.toggle("visible", inputValue.length > 0 && !hasMatchingResult);
}

// Ajout des événements pour mettre à jour la visibilité
["input", "focus", "blur"].forEach(event => searchChampionInput.addEventListener(event, updateVisibility));

// Empêcher le blur lors du clic sur une suggestion
championsSuggestions.addEventListener("mousedown", (event) => {
    event.preventDefault();
});

// Appeler la fonction une première fois pour régler l'état initial
updateVisibility();
