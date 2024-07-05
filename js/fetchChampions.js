import LATEST_VERSION from './fetchLolVersion.js'

const API_CHAMPIONS = `https://ddragon.leagueoflegends.com/cdn/${LATEST_VERSION}/data/en_US/champion.json`
const IMG_SQUARE_CHAMPION = `https://ddragon.leagueoflegends.com/cdn/${LATEST_VERSION}/img/champion`
const IMG_RECTANGLE_CHAMPION = "https://ddragon.leagueoflegends.com/cdn/img/champion/loading"

const homeSearchChampionInput = document.querySelector("#search-champion-input")
const homeChampionsSuggestions = document.querySelector("#champions-suggestions")
const championsList = document.querySelector("#champions-list")



// ASYNC FUNCTION TO FETCH LEAGUE OF LEGENDS API ===> ITEMS
async function FetchChampions() {
    try {
        const allChampionsDatas = await fetch(API_CHAMPIONS).then((response) => response.json())
        return allChampionsDatas.data
    
    } catch (error) {
        console.error(`FETCH LOL API CHAMPIONS ERROR : ${error}`)
    }
}

// FUNCTION TO CREATE THE URL TO GET THE CHAMPION RECTANGLE IMAGE FROM THE ID
function GetRectangleChampionImageURL(championId) {
    return `${IMG_RECTANGLE_CHAMPION}/${championId}_0.jpg`
}
// FUNCTION TO CREATE THE URL TO GET THE CHAMPION SQUARE IMAGE FROM THE ID
function GetSquareChampionImageURL(championId) {
    return `${IMG_SQUARE_CHAMPION}/${championId}.png`
}

// FUNCTION TO DISPLAY ALL CHAMPIONS
async function DisplayAllChampions(displayChampionsLocation, imageSize) {
    // clear the current list
    displayChampionsLocation.textContent = ''

    // get all the champions datas
    let championsDatas = await FetchChampions()

    let fragment = document.createDocumentFragment()
    // display all champions
    for (let champion in championsDatas) {
        const li = document.createElement("li")
        const a = document.createElement("a")
        const img = document.createElement("img")
        const h2 = document.createElement("h2")

        const championId = championsDatas[champion].id
        a.href = `champion.html?champion=${championId}`
        
        img.src = imageSize === "square" ? GetSquareChampionImageURL(championId) : imageSize === "rectangle" ? GetRectangleChampionImageURL(championId) : null
        img.alt = `${championId}`
        h2.textContent = championsDatas[champion].name

        a.append(img, h2)
        li.appendChild(a)
        fragment.appendChild(li)
    }

    displayChampionsLocation.appendChild(fragment)
}

// FUNCTION TO FILTER CHAMPIONS
function FilterChampions() {
    const searchValue = homeSearchChampionInput.value.toLowerCase()
    const champions = homeChampionsSuggestions.querySelectorAll('li')

    champions.forEach(champion => {
        const name = champion.querySelector('h2').textContent.toLowerCase()
        const id = champion.querySelector('img').alt.toLowerCase()
        champion.style.display = (name.includes(searchValue) || id.includes(searchValue)) ? 'flex' : 'none'
    })
}

// EVENT LISTENER ON THE SEARCH INPUT
homeSearchChampionInput.addEventListener('input', FilterChampions)

// Initial display of champions
DisplayAllChampions(championsList, "rectangle")
DisplayAllChampions(homeChampionsSuggestions, "square")


//ajouter pleins de filtres comme par letrre, par classe(assassins, tank...)