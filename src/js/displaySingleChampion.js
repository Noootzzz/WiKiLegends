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
    championId
} from "./fetchSingleChampion.js"

import {
    GetSquareChampionImageURL,
    GetChampionDamageType
} from "./fetchAllChampions.js"

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


async function DisplaySingleChampion() {
    try {
        // Récupérer les données du champion
        const championName = await GetChampionName()
        const championTitle = await GetChampionTitle()
        const championTags = await GetChampionTag()
        const championLore = await GetChampionLore()
        const championPassive = await GetChampionPassive()
        const championSpells = await GetChampionSpells()
        const championAllyTips = await GetChampionAllyTips()
        const championEnemyTips = await GetChampionEnemyTips()
        const championInfo = await GetChampionInfos()
        const championStats = await GetChampionStats()
        // Récupérer le type de damage et l"URL de l"avatar du champion
        const championDamage = await GetChampionDamageType(championId)
        const championAvatar = GetSquareChampionImageURL(championId)

        // Mettre à jour les éléments HTML avec les données récupérées
        htmlChampionName.textContent = championName
        htmlChampionTitle.textContent = championTitle
        htmlChampionAvatar.src = championAvatar
        htmlChampionLore.textContent = championLore
        // Vider le contenu actuel de htmlChampionTags
        htmlChampionTags.textContent = ""

        // Créer un élément <h4> pour chaque tag et l"ajouter au conteneur
        championTags.forEach(tag => {
            const tagElement = document.createElement("h4")
            tagElement.textContent = tag
            tagElement.classList.add("custom-role", `custom-role-${tag.toLowerCase()}`, "p-1", "sm:p-3", "sm:text-sm", "text-xs", "flex-1")
            htmlChampionTags.appendChild(tagElement)
        })

        championDamage == "AP" ? htmlChampionDamage.textContent = "Magical" : championDamage == "AD" ? htmlChampionDamage.textContent = "Physical" : null  // Affichage des dégâts du champion

        // console.log("Fetched Champion Data:", {
        //     championName,
        //     championTitle,
        //     championTags,
        //     championLore,
        //     championPassive,
        //     championSpells,
        //     championAllyTips,
        //     championEnemyTips,
        //     championInfo,
        //     championStats,
        //     championAvatar
        // })



        // Afficher les informations du passif
        htmlChampionPassiveIcon.src = championPassive[1]
        htmlChampionPassiveName.textContent = championPassive[0].name
        htmlChampionPassiveDescription.textContent = championPassive[0].description

        // Afficher les informations des sorts
        htmlChampionSpellsList.textContent = ""
        championSpells.forEach(spell => {
            const spellElement = document.createElement("div")
            spellElement.classList.add("flex", "flex-col", "bg-background", "border", "border-border", "rounded-md", "p-4", "gap-4")

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
            // Supprimer les balises <br> de la description
            spellDescription.textContent = spell.description.replace(/<br\s*\/?>/gi, ' ')
            spellDescription.classList.add("text-sm", "text-justify")

            spellDetails.appendChild(spellName)
            spellDetails.appendChild(spellDescription)
            spellContainer.appendChild(spellIcon)
            spellContainer.appendChild(spellDetails)
            spellElement.appendChild(spellContainer)

            htmlChampionSpellsList.appendChild(spellElement)
        })




    } catch (error) {
        console.error(`ERROR DISPLAY SINGLE CHAMPION: ${error}`)
    }
}

// Afficher les données du champion
DisplaySingleChampion()