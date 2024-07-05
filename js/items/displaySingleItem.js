import LATEST_VERSION from '../fetchLolVersion.js'

const API_ITEMS = `https://ddragon.leagueoflegends.com/cdn/${LATEST_VERSION}/data/en_US/item.json`
const IMG_ITEMS = `https://ddragon.leagueoflegends.com/cdn/${LATEST_VERSION}/img/item`

const itemDatasSection = document.querySelector("#item-datas")
let itemId = ""

// ASYNC FUNCTION TO FETCH ONLY 1 ITEM INFORMATIONS WITH THE URL PARAMS
async function FetchItem() {
    try {
        // GET THE ITEM ID FROM THE URL PARAMS
        itemId = new URLSearchParams(window.location.search).get("item")
        // fetch the champion informations with the url params
        const itemDatas = await fetch(API_ITEMS).then((response) => response.json())
        return itemDatas.data[itemId]
        
    } catch (error) {
        console.error(`FETCH ITEM ERROR : ${error}`)
    }
}

// FUNCTION TO CREATE THE URL TO GET THE ITEM IMAGE
function GetItemImage(itemId) {
    return `${IMG_ITEMS}/${itemId}`
}

async function DisplayItems() {
    try {
        const item = await FetchItem()
        let fragment = document.createDocumentFragment()

        // Create and append item name
        let h1 = document.createElement('h1')
        h1.textContent = item.name || "No data"
        fragment.appendChild(h1)

        // Create and append item image
        let img = document.createElement('img')
        if (item.image && item.image.full) {
            img.src = GetItemImage(item.image.full)
            img.alt = item.name || "No data"
        } else {
            img.src = "placeholder.png" // Placeholder image if no data
            img.alt = "No data"
        }
        fragment.appendChild(img)

        // Create and append item description
        let h2 = document.createElement('h2')
        h2.textContent = "Description"
        fragment.appendChild(h2)

        let descriptionDiv = document.createElement('div')
        if (item.description) {
            const parser = new DOMParser()
            const doc = parser.parseFromString(item.description, 'text/html')
            Array.from(doc.body.childNodes).forEach(child => {
                descriptionDiv.appendChild(child)
            })
        } else {
            descriptionDiv.textContent = "No description available"
        }
        fragment.appendChild(descriptionDiv)

        // Create and append item gold information
        let h3 = document.createElement('h3')
        let price = item.gold && item.gold.total ? item.gold.total : "No data"
        let sell = item.gold && item.gold.sell ? item.gold.sell : "No data"
        h3.textContent = `Price: ${price} / Sell: ${sell}`
        fragment.appendChild(h3)

        // Create and append item build path (items it builds into)
        if (Array.isArray(item.into) && item.into.length > 0) {
            let buildPath = document.createElement('div')
            let buildPathTitle = document.createElement('h3')
            buildPathTitle.textContent = "Can be built into:"
            buildPath.appendChild(buildPathTitle)
            item.into.forEach(buildId => {
                let buildImg = document.createElement('img')
                buildImg.src = `${GetItemImage(buildId)}.png`
                buildImg.alt = `Item ${buildId}`
                buildPath.appendChild(buildImg)
            })
            fragment.appendChild(buildPath)
        } else {
            let noBuildPath = document.createElement('p')
            noBuildPath.textContent = "Can not be built into other items."
            fragment.appendChild(noBuildPath)
        }

        // Create and append item build from (items it builds from)
        if (Array.isArray(item.from) && item.from.length > 0) {
            let buildFrom = document.createElement('div')
            let buildFromTitle = document.createElement('h3')
            buildFromTitle.textContent = "Builds from:"
            buildFrom.appendChild(buildFromTitle)
            item.from.forEach(buildId => {
                let buildImg = document.createElement('img')
                buildImg.src = `${GetItemImage(buildId)}.png`
                buildImg.alt = `Item ${buildId}`
                buildFrom.appendChild(buildImg)
            })
            fragment.appendChild(buildFrom)
        } else {
            let noBuildFrom = document.createElement('p')
            noBuildFrom.textContent = "No components from available"
            fragment.appendChild(noBuildFrom)
        }

        // Append the fragment to the item display section
        itemDatasSection.appendChild(fragment)

        // Set the document title to the item's name
        document.title = item.name || "No data"

    } catch (error) {
        console.error(`DISPLAY ITEMS ERROR: ${error}`)
    }
}

DisplayItems()
