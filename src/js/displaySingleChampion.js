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
            tagElement.classList.add("custom-role", `custom-role-${tag.toLowerCase()}`, "p-1", "sm:p-3", "sm:text-sm", "text-xs")
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
    } catch (error) {
        console.error(`ERROR DISPLAY SINGLE CHAMPION: ${error}`)
    }
}

// Afficher les données du champion
DisplaySingleChampion()