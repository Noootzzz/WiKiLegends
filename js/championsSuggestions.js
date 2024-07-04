const searchChampionInput = document.querySelector("#search-champion-input");
const championsSuggestions = document.querySelector("#champions-suggestions");
const errorMessage = document.querySelector("#error-message");

// Fonction pour mettre à jour la visibilité des suggestions et du message d'erreur
function updateVisibility() {
    const hasFocus = document.activeElement === searchChampionInput;
    const hasValue = searchChampionInput.value.length > 0;
    const visibleResults = [...championsSuggestions.querySelectorAll('li')].some(li => getComputedStyle(li).display === 'flex');

    // Mettre à jour la visibilité des suggestions et du message d'erreur
    championsSuggestions.classList.toggle("visible", hasValue && hasFocus && visibleResults);
    errorMessage.classList.toggle("visible", hasValue && !visibleResults);
}

// Ajout des événements pour mettre à jour la visibilité
["input", "focus", "blur"].forEach(event => searchChampionInput.addEventListener(event, updateVisibility));

// Appeler la fonction une première fois pour régler l'état initial
updateVisibility();
