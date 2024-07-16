// Import the latest LOL version
import LATEST_VERSION from './fetchVersionAPI.js'

// API endpoint for fetching champion data
const API_CHAMPION = `https://ddragon.leagueoflegends.com/cdn/${LATEST_VERSION}/data/en_US/champion`

// VARIABLE TO HOLD THE CHAMPION ID
let championId = ""


// ASYNC FUNCTION TO FETCH ONLY 1 CHAMPION INFORMATIONS WITH THE URL PARAMS
async function FetchChampion() {
    try {
        // GET THE CHAMPION ID FROM THE URL PARAMS
        championId = new URLSearchParams(window.location.search).get("id")
        // full built url
        const API_CHAMPION_FULL_URL = `${API_CHAMPION}/${championId}.json`
        // fetch the champion informations with the url params
        return await fetch(API_CHAMPION_FULL_URL).then((response) => response.json())

    } catch (error) {
        console.error(`FETCH CHAMPION ERROR : ${error}`)
    }
}

async function DisplaySingleChampion() {
    const datas = await FetchChampion()
    const champion = datas.data[championId]

    let h1 = document.createElement("h1")
    h1.classList.add("text-7xl", "font-bold")
    const main = document.querySelector("main")

    h1.textContent = champion.name
    main.appendChild(h1)
}

DisplaySingleChampion()