document.addEventListener("DOMContentLoaded", () => {
    const sortOrderAlphabetical = document.querySelector("#sortAlphabetical")
    const sortOrderReverseAlphabetical = document.querySelector("#sortReverseAlphabetical")
    const roleAssassin = document.querySelector("#roleAssassin")
    const roleFighter = document.querySelector("#roleFighter")
    const roleMage = document.querySelector("#roleMage")
    const roleSupport = document.querySelector("#roleSupport")
    const roleTank = document.querySelector("#roleTank")
    const damageMagic = document.querySelector("#damageMagic")
    const damagePhysic = document.querySelector("#damagePhysic")
    const resetFilters = document.querySelector("#resetFilters")
    const championsTable = document.querySelector("#champions-tbody")

    // Event listeners for radio buttons and checkboxes
    ;[
        sortOrderAlphabetical,
        sortOrderReverseAlphabetical,
        roleAssassin,
        roleFighter,
        roleMage,
        roleSupport,
        roleTank,
        damageMagic,
        damagePhysic,
    ].forEach(element => {
        element.addEventListener("change", applyFilters)
    })
    resetFilters.addEventListener("click", resetAllFilters)

    function applyFilters() {
        const rows = championsTable.querySelectorAll("tr")

        rows.forEach(row => {
            const roleCell = row.querySelector("td:nth-child(3)")
            const damageCellMagical = row.querySelector("td:nth-child(4) div")
            const damageCellPhysical = row.querySelector(
                "td:nth-child(4) div:nth-child(2)"
            )

            const showRole =
                (roleAssassin.checked &&
                    roleCell.textContent.includes("Assassin")) ||
                (roleFighter.checked && roleCell.textContent.includes("Fighter")) ||
                (roleMage.checked && roleCell.textContent.includes("Mage")) ||
                (roleSupport.checked &&
                    roleCell.textContent.includes("Support")) ||
                (roleTank.checked && roleCell.textContent.includes("Tank")) ||
                (!roleAssassin.checked &&
                    !roleFighter.checked &&
                    !roleMage.checked &&
                    !roleSupport.checked &&
                    !roleTank.checked)

            let showDamage = false
            if (damageMagic.checked) {
                showDamage =
                    damageCellMagical.textContent.trim() === "Magic" &&
                    damageCellMagical.classList.contains("custom-damage-main")
            } else if (damagePhysic.checked) {
                showDamage =
                    damageCellPhysical &&
                    damageCellPhysical.textContent.trim() === "Physic" &&
                    damageCellPhysical.classList.contains("custom-damage-main")
            } else {
                showDamage = true // Show row if neither damage type is checked
            }

            const showRow = showRole && showDamage

            row.style.display = showRow ? "table-row" : "none"
        })

        // Reset the sort order after filtering
        sortRows()
    }

    function resetAllFilters() {
        // Uncheck all checkboxes and radios
        ;[
            sortOrderReverseAlphabetical,
            roleAssassin,
            roleFighter,
            roleMage,
            roleSupport,
            roleTank,
            damageMagic,
            damagePhysic,
        ].forEach(element => {
            element.checked = false
        })
        sortOrderAlphabetical.checked = true

        // Reset the display of all rows
        const rows = championsTable.querySelectorAll("tr")
        rows.forEach(row => {
            row.style.display = "table-row"
        })

        // Reset the sort order after resetting filters
        sortRows()
    }

    function sortRows() {
        const rows = Array.from(championsTable.querySelectorAll("tr"))
        let sortValue = "alphabetical"
        if (sortOrderReverseAlphabetical.checked) {
            sortValue = "reverseAlphabetical"
        }

        rows.sort((a, b) => {
            const nameA = a.querySelector("td:nth-child(2)").textContent
            const nameB = b.querySelector("td:nth-child(2)").textContent

            if (sortValue === "alphabetical") {
                return nameA.localeCompare(nameB)
            } else if (sortValue === "reverseAlphabetical") {
                return nameB.localeCompare(nameA)
            }

            return 0
        })

        // Clear the current table content
        rows.forEach(row => championsTable.removeChild(row))

        // Re-append sorted rows
        rows.forEach(row => championsTable.appendChild(row))
    }

    // Initial load: apply filters and sorting to show all rows correctly
    applyFilters()
})
