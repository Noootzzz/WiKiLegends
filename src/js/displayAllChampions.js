import { GetAllChampionsIds, GetAllChampionsNames, GetChampionLink, GetRectangleChampionImageURL, GetSquareChampionImageURL, GetChampionDamageType, GetChampionTags } from "./fetchChampionsAPI.js"

// Function to create and append rows dynamically
async function CreateTableRow(championId, championIndex) {

    // Table body and row
    const tbody = document.querySelector("#champions-tbody")
    const tr = document.createElement("tr")

    // AVATAR FIRST COLUMN
    const tdAvatar = document.createElement("td")
    const img = document.createElement("img")
    // Get the square img url from the champion Id
    let squareChampionImgUrl = GetSquareChampionImageURL(championId)

    img.src = squareChampionImgUrl
    img.alt = squareChampionImgUrl

    // Adding classLists
    tr.classList.add("custom-tr")
    tdAvatar.classList.add("custom-td")
    img.classList.add("avatar-img")

    // Append the children to the row
    tdAvatar.appendChild(img)
    tr.appendChild(tdAvatar)
    tbody.appendChild(tr)

    // NAME SECOND COLUMN
    // All champions Names
    const championsNames = await GetAllChampionsNames()
    let tdName = document.createElement("td")

    tdName.textContent = championsNames[championIndex]
    tdName.classList.add("custom-td")

    tr.appendChild(tdName)

    // CATEGORY THIRD COLUMN
    let tdCategories = document.createElement("td")
    let divTags = document.createElement("div")
    const championTags = await GetChampionTags(championId)

    championTags.forEach(championTag => {
        let divTag = document.createElement("div")

        divTag.classList.add("custom-role")
        divTag.textContent = championTag
        divTag.classList.add("custom-role-" + championTag.toLowerCase())

        // if (championTag === "Support") {
        //     divTag.classList.add("custom-role-support")
        // }
        // if (championTag === "Fighter") {
        //     divTag.classList.add("custom-role-fighter")
        // }
        // if (championTag === "Marksman") {
        //     divTag.classList.add("custom-role-marksman")
        // }
        // if (championTag === "Mage") {
        //     divTag.classList.add("custom-role-mage")
        // }
        // if (championTag === "Assassin") {
        //     divTag.classList.add("custom-role-assassin")
        // }
        // if (championTag === "Tank") {
        //     divTag.classList.add("custom-role-tank")
        // }

        divTags.appendChild(divTag)
    })

    divTags.classList.add("custom-role-flex")
    tdCategories.classList.add("custom-td")

    tdCategories.appendChild(divTags)
    tr.appendChild(tdCategories)

    // DAMAGE FOURTH COLUMN
    let tdDamage = document.createElement("td")
    let divMagic = document.createElement("div")
    let divPhysic = document.createElement("div")
    const damageType = await GetChampionDamageType(championId)

    divMagic.textContent = "Magic"
    divPhysic.textContent = "Physic"
    damageType === "AD" ? (divPhysic.classList.add("custom-damage-main"), divMagic.classList.add("custom-damage-secondary")) : damageType === "AP" ? (divMagic.classList.add("custom-damage-main"), divPhysic.classList.add("custom-damage-secondary")) : null

    divMagic.classList.add("custom-damage")
    divPhysic.classList.add("custom-damage")

    tdDamage.classList.add("custom-td")
    tdDamage.appendChild(divMagic)
    tdDamage.appendChild(divPhysic)
    tr.appendChild(tdDamage)

    // LINK FIFTH COLUMN
    let tdLink = document.createElement("td")
    let link = document.createElement("a")

    link.href = await GetChampionLink(championId)
    link.textContent = "More"
    link.classList.add("more-btn")
    tdLink.classList.add("custom-td")

    tdLink.appendChild(link)
    tr.appendChild(tdLink)
}

// All champions Ids
const championsIds = await GetAllChampionsIds()

// Add rows for each champion
championsIds.forEach((championId, championIndex) => {
    CreateTableRow(championId, championIndex)
})
