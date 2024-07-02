const searchChampionInput = document.querySelector("#search-champion-input")
const championsSuggestions = document.querySelector("#champions-suggestions")

championsSuggestions.style.opacity = 0
searchChampionInput.addEventListener("input", () => {
    if (searchChampionInput.value.length > 0) {
        championsSuggestions.style.opacity = 1
    } else {
        championsSuggestions.style.opacity = 0
    }
})