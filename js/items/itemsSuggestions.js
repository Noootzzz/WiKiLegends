const searchItemsInput = document.querySelector("#search-item-input");
const itemsSuggestions = document.querySelector("#items-suggestions");
const errorMessage = document.querySelector("#error-message");

// Fonction pour mettre à jour la visibilité des suggestions et du message d'erreur
function updateVisibility() {
    const inputValue = searchItemsInput.value.trim().toLowerCase();
    const hasFocus = document.activeElement === searchItemsInput;
    // Sélectionner tous les éléments de liste dans les suggestions
    const itemItems = itemsSuggestions.querySelectorAll('li');
    
    // Vérifier si au moins un élément correspond à la recherche
    const hasMatchingResult = [...itemItems].some(item => {
        const itemName = item.textContent.trim().toLowerCase();
        return itemName.includes(inputValue);
    });
    
    // Mettre à jour la visibilité des suggestions et du message d'erreur
    itemsSuggestions.classList.toggle("visible", inputValue.length > 0 && hasMatchingResult && hasFocus);
    errorMessage.classList.toggle("visible", inputValue.length > 0 && !hasMatchingResult);
}

// Ajout des événements pour mettre à jour la visibilité
["input", "focus", "blur"].forEach(event => searchItemsInput.addEventListener(event, updateVisibility));

// Empêcher le blur lors du clic sur une suggestion
itemsSuggestions.addEventListener("mousedown", (event) => {
    event.preventDefault();
});

// Appeler la fonction une première fois pour régler l'état initial
updateVisibility();
