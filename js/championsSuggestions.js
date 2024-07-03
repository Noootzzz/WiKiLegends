const searchChampionInput = document.querySelector("#search-champion-input");
const championsSuggestions = document.querySelector("#champions-suggestions");

// DISPLAY THE SEARCH CHAMPIONS SUGGESTIONS UNDER THE INPUT
searchChampionInput.addEventListener("input", () => {
    championsSuggestions.classList.toggle("visible", searchChampionInput.value.length > 0);
    championsSuggestions.classList.toggle("hidden", searchChampionInput.value.length === 0);
});