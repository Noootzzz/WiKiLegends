const homeSearchChampionInput = document.querySelector("#search-champion-input")
const homeChampionsSuggestions = document.querySelector("#champions-suggestions")
const championsList = document.querySelector("#champions-home-list")
const LOL_API_CHAMPIONS_URL = "https://ddragon.leagueoflegends.com/cdn/14.12.1/data/en_US/champion.json"

// ASYNC FUNCTION TO FETCH LEAGUE OF LEGENDS API ===> CHAMPIONS
async function fetchLolApi() {
    try {
        return await fetch(LOL_API_CHAMPIONS_URL).then((response) => response.json())
    
    } catch (error) {
        console.error(`FETCH LOL API ERROR : ${error}`)
    }
}

// ASYNC FUNCTION TO GET THE CHAMPIONS DATAS
async function getChampionsDatas() {
    try {
        let championsDatas = await fetchLolApi()
        return championsDatas = championsDatas.data

    } catch (error) {
        console.error(`GET CHAMPIONS DATAS ERROR : ${error}`)
    }
}

// ASYNC FUNCTION TO GET THE CHAMPIONS IDs
async function getAllChampionsIds() {
    try {
        // get all the champions datas
        let championsDatas = await fetchLolApi()
        let champions = championsDatas.data
        // list of all the id's of the champions 
        let championsIdsList = []
        // loop to push id's inside the list
        for (let champion in champions) {
            championsIdsList.push(champions[champion].id)
        }
        return championsIdsList

    } catch (error) {
        console.error(`GET CHAMPIONS IDs ERROR : ${error}`)
    }
}

// ASYNC FUNCTION TO GET ALL THE CHAMPIONS IMAGES AND NAMES
async function getAllChampionsImagesNames() {
    try {
        // get all the champions datas
        let champions = await getChampionsDatas()
        // list of all the names of the champions 
        let championsNamesList = []
        // list of all the loading images of the champions
        let championsImagesList = []
        // loop to push images and names inside the lists
        for (let champion in champions) {
            championsNamesList.push(champions[champion].name)
            championsImagesList.push(`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champions[champion].id}_0.jpg`)
        }
        return [championsNamesList, championsImagesList]

    } catch (error) {
        console.error(`GET ALL CHAMPIONS IMAGES AND NAMES ERROR : ${error}`)
    }
}

// FUNCTION TO DISPLAY ALL CHAMPIONS
async function displayAllChampions() {
    // clear the current list
    championsList.innerHTML = ''

    // get all the champions datas
    let championsDatas = await getChampionsDatas()

    // display all champions
    let fragment = document.createDocumentFragment()
    for (let champion in championsDatas) {
        const li = document.createElement("li")
        const a = document.createElement("a")
        const img = document.createElement("img")
        const h2 = document.createElement("h2")

        a.href = `single-champion.html?champion=${championsDatas[champion].id}`
        img.src = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championsDatas[champion].id}_0.jpg`
        img.alt = `${championsDatas[champion].id}`
        h2.textContent = championsDatas[champion].name

        a.appendChild(img)
        li.append(a, h2)
        fragment.appendChild(li)
    }

    championsList.appendChild(fragment)
}

// FUNCTION TO FILTER CHAMPIONS
function filterChampions() {
    // get the value of the search input
    let searchValue = homeSearchChampionInput.value.toLowerCase()

    // get all the champions
    let champions = championsList.getElementsByTagName('li')

    // filter the champions
    for (let champion of champions) {
        let name = champion.getElementsByTagName('h2')[0].textContent
        let id = champion.getElementsByTagName('img')[0].alt
        if (name.toLowerCase().includes(searchValue) || id.toLowerCase().includes(searchValue)) {
            champion.style.display = 'block'
        } else {
            champion.style.display = 'none'
        }
    }
}

// EVENT LISTENER ON THE SEARCH INPUT
homeSearchChampionInput.addEventListener('input', filterChampions)

// Initial display of champions
displayAllChampions()