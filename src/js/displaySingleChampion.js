import {
    GetChampionName,
    GetChampionTitle,
    GetChampionTag,
    GetChampionLore,
    GetChampionPassive,
    GetChampionSpells,
    GetChampionAllyTips,
    GetChampionEnemyTips,
    GetChampionInfos,
    GetChampionStats,
    championId,
    GetChampionSkinsList
} from "./fetchSingleChampion.js"

import {
    GetSquareChampionImageURL,
    GetRectangleChampionImageURL,
    GetChampionDamageType
} from "./fetchAllChampions.js"

// Select HTML elements
const htmlChampionName = document.querySelector("#champion-name")
const htmlChampionTitle = document.querySelector("#champion-title")
const htmlChampionAvatar = document.querySelector("#champion-avatar")
const htmlChampionLore = document.querySelector("#champion-lore")
const htmlChampionTags = document.querySelector("#champion-tags")
const htmlChampionDamage = document.querySelector("#champion-damage")
const htmlChampionPassiveIcon = document.querySelector("#champion-passive-icon")
const htmlChampionPassiveName = document.querySelector("#champion-passive-name")
const htmlChampionPassiveDescription = document.querySelector("#champion-passive-description")
const htmlChampionSpellsList = document.querySelector("#champion-spells-list")
const htmlChampionAllyTips = document.querySelector("#champion-ally-tips")
const htmlChampionEnemyTips = document.querySelector("#champion-enemy-tips")
const htmlRectangleImages = document.querySelector("#rectangle-images")

async function DisplaySingleChampion() {
    try {
        // Fetch champion data
        const [
            championName,
            championTitle,
            championTags,
            championLore,
            championPassive,
            championSpells,
            championInfo,
            championDamage,
            championAvatar,
            championStats,
            championAllyTips,
            championEnemyTips,
            championSkinsList
        ] = await Promise.all([
            GetChampionName(),
            GetChampionTitle(),
            GetChampionTag(),
            GetChampionLore(),
            GetChampionPassive(),
            GetChampionSpells(),
            GetChampionInfos(),
            GetChampionDamageType(championId),
            GetSquareChampionImageURL(championId),
            GetChampionStats(),
            GetChampionAllyTips(),
            GetChampionEnemyTips(),
            GetChampionSkinsList()
        ])

        document.title = championName

        // Update HTML elements with fetched data
        htmlChampionName.textContent = championName
        htmlChampionTitle.textContent = championTitle
        htmlChampionAvatar.src = championAvatar
        htmlChampionLore.textContent = championLore
        htmlChampionTags.textContent = "" // Clear current content

        // Create and append tags
        championTags.forEach(tag => {
            const tagElement = document.createElement("h4")
            tagElement.textContent = tag
            tagElement.classList.add("custom-role", `custom-role-${tag.toLowerCase()}`, "p-1", "sm:p-3", "sm:text-sm", "text-xs", "flex-1")
            htmlChampionTags.appendChild(tagElement)
        })

        htmlChampionDamage.textContent = championDamage === "AP" ? "Magical" : championDamage === "AD" ? "Physical" : ""
        

        // Display passive info
        htmlChampionPassiveIcon.src = championPassive[1]
        htmlChampionPassiveName.textContent = championPassive[0].name
        htmlChampionPassiveDescription.textContent = championPassive[0].description

        // Display spells info
        htmlChampionSpellsList.textContent = ""
        const spellListNames = ["Q", "W", "E", "R"]
        championSpells.forEach((spell, index) => {
            const spellElement = document.createElement("div")
            spellElement.classList.add("flex", "flex-col", "bg-background", "border", "border-border", "rounded-md", "p-4", "gap-4", "text-white")

            const small = document.createElement("small")
            small.textContent = `${spellListNames[index]} Spell`
            small.classList.add("text-white", "bg-primary", "w-fit", "px-2", "py-1", "rounded-md")

            const spellContainer = document.createElement("div")
            spellContainer.classList.add("flex", "items-center", "gap-4", "flex-col", "sm:flex-row")

            const spellIcon = document.createElement("img")
            spellIcon.src = spell.image
            spellIcon.alt = `${spell.name}-icon`
            spellIcon.classList.add("w-16", "h-16")

            const spellDetails = document.createElement("div")
            spellDetails.classList.add("space-y-8", "sm:space-y-0")

            const spellName = document.createElement("h5")
            spellName.textContent = spell.name
            spellName.classList.add("text-lg", "font-semibold", "text-center", "sm:text-start")

            const spellDescription = document.createElement("p")
            spellDescription.textContent = spell.description.replace(/<br\s*\/?>/gi, ' ')
            spellDescription.classList.add("text-sm", "text-justify")

            const spellStats = document.createElement("div")
            spellStats.classList.add("ml-auto", "flex", "justify-center", "items-center", "flex-col", "sm:flex-row", "gap-4", "text-xs", "sm:text-sm", "bg-border", "rounded-md", "text-white", "w-full", "sm:w-fit", "p-2")

            const spellCooldown = document.createElement("div")
            spellCooldown.textContent = `Cooldown(s): ${spell.cooldown}`
            const spellCost = document.createElement("div")
            spellCost.textContent = `Cost(s): ${spell.cost}`
            const spellRange = document.createElement("div")
            spellRange.textContent = `Range(s): ${spell.range}`

            spellStats.appendChild(spellRange)
            spellStats.appendChild(spellCost)
            spellStats.appendChild(spellCooldown)
            spellDetails.appendChild(spellName)
            spellDetails.appendChild(spellDescription)
            spellContainer.appendChild(spellIcon)
            spellContainer.appendChild(spellDetails)
            spellElement.appendChild(small)
            spellElement.appendChild(spellContainer)
            spellElement.appendChild(spellStats)

            htmlChampionSpellsList.appendChild(spellElement)
        })

        // Update progress bars
        const updateBars = (sectionId, scoreId, value) => {
            const bars = document.getElementById(sectionId).children
            for (let i = 0; i < bars.length; i++) {
                bars[i].classList.remove('bg-white', 'bg-border')
                bars[i].classList.add(i < value ? 'bg-white' : 'bg-border')
            }
            document.getElementById(scoreId).textContent = value > 0 ? `${value}/10` : "No Data"
        }

        updateBars("attack-bars", "attack-score", championInfo.attack)
        updateBars("defense-bars", "defense-score", championInfo.defense)
        updateBars("magic-bars", "magic-score", championInfo.magic)
        updateBars("difficulty-bars", "difficulty-score", championInfo.difficulty)

        // Display ally and enemy tips with "No Data" if empty
        htmlChampionAllyTips.innerHTML = championAllyTips.length > 0
            ? championAllyTips.map(tip => `<p>${tip}</p>`).join("")
            : "<p>No Tips</p>";

        htmlChampionEnemyTips.innerHTML = championEnemyTips.length > 0
            ? championEnemyTips.map(tip => `<p>${tip}</p>`).join("")
            : "<p>No Tips</p>";

        // Display rectangle images
        htmlRectangleImages.textContent = ""
        championSkinsList.forEach(skin => {
            const image = document.createElement("img")
            image.src = GetRectangleChampionImageURL(championId, skin)
            image.alt = `${championId} Skin`
            htmlRectangleImages.appendChild(image)
        })

    } catch (error) {
        console.error(`ERROR DISPLAY SINGLE CHAMPION: ${error}`)
    }
}

// Display the champion data
DisplaySingleChampion()

