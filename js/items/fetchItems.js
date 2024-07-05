import LATEST_VERSION from "../fetchLolVersion.js"

const API_ITEMS = `https://ddragon.leagueoflegends.com/cdn/${LATEST_VERSION}/data/en_US/item.json`
const IMG_ITEMS = `https://ddragon.leagueoflegends.com/cdn/${LATEST_VERSION}/img/item`

const homeSearchItemInput = document.querySelector("#search-item-input")
const homeItemsSuggestions = document.querySelector("#items-suggestions")
const itemsList = document.querySelector("#items-list")




// ASYNC FUNCTION TO FETCH LEAGUE OF LEGENDS API ===> ITEMS
async function FetchItems() {
    try {
        const allItemsDatas =  await fetch(API_ITEMS).then((response) => response.json())
        return allItemsDatas.data
    
    } catch (error) {
        console.error(`FETCH LOL API ITEMS ERROR : ${error}`)
    }
}

// FUNCTION TO CREATE THE URL TO GET THE ITEM IMAGE
function GetItemImage(itemId) {
    return `${IMG_ITEMS}/${itemId}.png`
}


// FUNCTION TO DISPLAY ALL itemS
async function DisplayAllItems(displayItemsLocation) {
    // clear the current list
    displayItemsLocation.textContent = ''

    try {
        // get all the items datas
        let itemsDatas = await FetchItems()
        let fragment = document.createDocumentFragment()
        let seenNames = new Set()

        // display all items
        Object.entries(itemsDatas).forEach(([itemId, itemData]) => {
            if (!seenNames.has(itemData.name)) {
                seenNames.add(itemData.name)

                const li = document.createElement("li")
                const a = document.createElement("a")
                const img = document.createElement("img")
                const h2 = document.createElement("h2")

                a.href = `item.html?item=${itemId}`
                img.src = GetItemImage(itemId)
                img.alt = `${itemId}`
                h2.textContent = itemData.name

                a.append(img, h2)
                li.appendChild(a)
                fragment.appendChild(li)
            }
        })

        displayItemsLocation.appendChild(fragment)
    } catch (error) {
        console.error(`Error displaying items: ${error}`)
    }
}

// FUNCTION TO FILTER CHAMPIONS
function FilterItems() {
    const searchValue = homeSearchItemInput.value.toLowerCase()
    const items = homeItemsSuggestions.querySelectorAll('li')

    items.forEach(item => {
        const name = item.querySelector('h2').textContent.toLowerCase()
        const id = item.querySelector('img').alt.toLowerCase()
        item.style.display = (name.includes(searchValue) || id.includes(searchValue)) ? 'flex' : 'none'
    })
}

// EVENT LISTENER ON THE SEARCH INPUT
homeSearchItemInput.addEventListener('input', FilterItems)

DisplayAllItems(itemsList)
DisplayAllItems(homeItemsSuggestions)
