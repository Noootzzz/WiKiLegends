import {
    GetAllChampionsIds,
    GetAllChampionsNames,
    GetChampionLink,
    GetRectangleChampionImageURL,
    GetSquareChampionImageURL,
    GetChampionDamageType,
    GetChampionTags
} from "./fetchAllChampions.js"

// Function to create and append rows dynamically
async function CreateTableRow(championId, championIndex, championName) {
    // Select the table body
    const tbody = document.querySelector("#champions-tbody")

    // Create a table row
    const tr = document.createElement("tr")
    tr.classList.add("custom-tr")

    // Create the avatar cell
    const tdAvatar = document.createElement("td")
    tdAvatar.classList.add("custom-td")
    const img = document.createElement("img")
    img.src = GetSquareChampionImageURL(championId)
    img.alt = `${championName} avatar`
    img.classList.add("avatar-img")
    tdAvatar.appendChild(img)
    tr.appendChild(tdAvatar)

    // Create the name cell
    const tdName = document.createElement("td")
    tdName.textContent = championName
    tdName.classList.add("custom-td")
    tr.appendChild(tdName)

    // Create the category cell
    const tdCategories = document.createElement("td")
    tdCategories.classList.add("custom-td")
    const divTags = document.createElement("div")
    divTags.classList.add("custom-role-flex")

    const championTags = await GetChampionTags(championId)
    championTags.forEach(tag => {
        const divTag = document.createElement("div")
        divTag.textContent = tag
        divTag.classList.add("custom-role", `custom-role-${tag.toLowerCase()}`)
        divTags.appendChild(divTag)
    })

    tdCategories.appendChild(divTags)
    tr.appendChild(tdCategories)

    // Create the damage cell
    const tdDamage = document.createElement("td")
    tdDamage.classList.add("custom-td", "sm:table-cell", "hidden")

    const divMagic = document.createElement("div")
    divMagic.textContent = "Magic"
    divMagic.classList.add("custom-damage")

    const divPhysic = document.createElement("div")
    divPhysic.textContent = "Physic"
    divPhysic.classList.add("custom-damage")

    const damageType = await GetChampionDamageType(championId)
    if (damageType === "AD") {
        divPhysic.classList.add("custom-damage-main")
        divMagic.classList.add("custom-damage-secondary")
    } else if (damageType === "AP") {
        divMagic.classList.add("custom-damage-main")
        divPhysic.classList.add("custom-damage-secondary")
    }

    tdDamage.appendChild(divMagic)
    tdDamage.appendChild(divPhysic)
    tr.appendChild(tdDamage)

    // Create the link cell
    const tdLink = document.createElement("td")
    tdLink.classList.add("custom-td")
    const link = document.createElement("a")
    link.href = await GetChampionLink(championId)
    link.textContent = "More"
    link.classList.add("more-btn")
    tdLink.appendChild(link)
    tr.appendChild(tdLink)

    // Append the row to the table body
    tbody.appendChild(tr)
}

// Main function to add rows for each champion
async function AddChampionRows() {
    // Get all champions IDs and names
    const championsIds = await GetAllChampionsIds()
    const championsNames = await GetAllChampionsNames()

    // Create and append rows for each champion
    championsIds.forEach((championId, championIndex) => {
        CreateTableRow(championId, championIndex, championsNames[championIndex])
    })
}

// Call the main function to add champion rows
AddChampionRows()