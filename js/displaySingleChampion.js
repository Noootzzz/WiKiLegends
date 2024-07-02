let championId = ""
const championDatasSection = document.querySelector("#champion-datas")
let pageTitle = document.title

// ASYNC FUNCTION TO FETCH ONLY 1 CHAMPION INFORMATIONS WITH THE URL PARAMS
async function fetchChampion() {
    try {
        // api url
        const SINGLE_CHAMPION_URL = "https://ddragon.leagueoflegends.com/cdn/14.12.1/data/en_US/champion"
        // GET THE CHAMPION ID FROM THE URL PARAMS
        championId = new URLSearchParams(window.location.search).get("champion")
        // full built url
        const FULL_URL = `${SINGLE_CHAMPION_URL}/${championId}.json`
        // fetch the champion informations with the url params
        return await fetch(FULL_URL).then((response) => response.json())
        
    } catch (error) {
        console.error(`FETCH CHAMPION ERROR : ${error}`)
    }
}

// ASYNC FUNCTION TO DISPLAY ONLY 1 CHAMPION
async function displayChampion() {
    try {
        const championDatas = await fetchChampion()
        // champion informations
        const champion = championDatas.data[championId]

        let fragment = document.createDocumentFragment()

        let h1 = document.createElement('h1')
        h1.textContent = champion.name
        fragment.appendChild(h1)

        let h2 = document.createElement('h2')
        h2.textContent = champion.title
        fragment.appendChild(h2)

        let h3 = document.createElement('h3')
        h3.textContent = champion.lore
        fragment.appendChild(h3)

        championDatasSection.appendChild(fragment)

        // document name take the champion's name
        document.title = `${champion.name}`
    } catch (error) {
        console.error(`DISPLAY CHAMPION ERROR : ${error}`)
    }
}

displayChampion()