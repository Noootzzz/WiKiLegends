const championSearchInput = document.querySelector("#champion-search-input")
const championsList = document.querySelector("#champions-list")
const errorMessage = document.querySelector("#error-message")

// Function to filter champions
const searchChampion = () => {
    const searchValue = championSearchInput.value.toLowerCase()
    const championsNames = championsList.querySelectorAll("tbody tr")
    let found = false

    championsNames.forEach(championRow => {
        const championName = championRow.querySelector("td:nth-child(2)").textContent.toLowerCase()
        if (championName.includes(searchValue)) {
            championRow.style.display = 'table-row'
            found = true
        } else {
            championRow.style.display = 'none'
        }
    })
    // Display the error message if no champion is found
    if (!found) {
        errorMessage.classList.remove("hidden")
        return
    }
    errorMessage.classList.add("hidden")
}

// Add an event listener to detect changes in the search field
championSearchInput.addEventListener("input", searchChampion)
