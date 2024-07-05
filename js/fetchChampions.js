const homeSearchChampionInput = document.querySelector("#search-champion-input")
const homeChampionsSuggestions = document.querySelector("#champions-suggestions")
const championsList = document.querySelector("#champions-list")
const VERSION = "14.13.1"
const API_CHAMPIONS = `https://ddragon.leagueoflegends.com/cdn/${VERSION}/data/en_US/champion.json`
const IMG_SQUARE_CHAMPION = `https://ddragon.leagueoflegends.com/cdn/${VERSION}/img/champion`
const IMG_RECTANGLE_CHAMPION = "https://ddragon.leagueoflegends.com/cdn/img/champion/loading"

// ASYNC FUNCTION TO FETCH LEAGUE OF LEGENDS API ===> CHAMPIONS
async function fetchLolApi() {
    try {
        return await fetch(API_CHAMPIONS).then((response) => response.json())
    
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

// FUNCTION TO CREATE THE URL TO GET THE CHAMPION RECTANGLE IMAGE FROM THE ID
function getRectangleChampionImageURL(championId) {
    return `${IMG_RECTANGLE_CHAMPION}/${championId}_0.jpg`
}
// FUNCTION TO CREATE THE URL TO GET THE CHAMPION SQUARE IMAGE FROM THE ID
function getSquareChampionImageURL(championId) {
    return `${IMG_SQUARE_CHAMPION}/${championId}.png`
}

// ASYNC FUNCTION TO GET ALL THE CHAMPIONS IMAGES AND NAMES
async function getAllChampionsImagesNames() {
    try {
        // get all the champions datas
        let champions = await getChampionsDatas()
        // list of all the names of the champions 
        let championsNamesList = []
        // list of all the RECTANGLE images of the champions
        let championsImagesList = []
        // loop to push images and names inside the lists
        for (let champion in champions) {
            championsNamesList.push(champions[champion].name)
            // push the champion id into the list
            const championdId = champions[champion].id
            championsImagesList.push(getChampionImageURL(championdId))
        }
        return [championsNamesList, championsImagesList]

    } catch (error) {
        console.error(`GET ALL CHAMPIONS IMAGES AND NAMES ERROR : ${error}`)
    }
}

// FUNCTION TO DISPLAY ALL CHAMPIONS
async function displayAllChampions(displayChampionsLocation, imageSize) {
    // clear the current list
    displayChampionsLocation.textContent = ''

    // get all the champions datas
    let championsDatas = await getChampionsDatas()

    let fragment = document.createDocumentFragment()
    // display all champions
    for (let champion in championsDatas) {
        const li = document.createElement("li")
        const a = document.createElement("a")
        const img = document.createElement("img")
        const h2 = document.createElement("h2")

        const championId = championsDatas[champion].id;
        a.href = `champion.html?champion=${championId}`
        
        img.src = imageSize === "square" ? getSquareChampionImageURL(championId) : imageSize === "rectangle" ? getRectangleChampionImageURL(championId) : null
        img.alt = `${championId}`
        h2.textContent = championsDatas[champion].name

        a.append(img, h2)
        li.appendChild(a)
        fragment.appendChild(li)
    }

    displayChampionsLocation.appendChild(fragment)
}

// FUNCTION TO FILTER CHAMPIONS
function filterChampions() {
    const searchValue = homeSearchChampionInput.value.toLowerCase();
    const champions = homeChampionsSuggestions.querySelectorAll('li');

    champions.forEach(champion => {
        const name = champion.querySelector('h2').textContent.toLowerCase();
        const id = champion.querySelector('img').alt.toLowerCase();
        champion.style.display = (name.includes(searchValue) || id.includes(searchValue)) ? 'flex' : 'none';
    });
}

// EVENT LISTENER ON THE SEARCH INPUT
homeSearchChampionInput.addEventListener('input', filterChampions)

// Initial display of champions
displayAllChampions(championsList, "rectangle")
displayAllChampions(homeChampionsSuggestions, "square")

//ajouter pleins de filtres comme par letrre, par classe(assassins, tank...)
