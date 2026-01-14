// Import the latest LOL version
import GetLolLatestVersions from './fetchVersionAPI.js'

let LATEST_VERSION = null
let API_CHAMPIONS = null
let IMG_SQUARE_CHAMPION = null
let IMG_RECTANGLE_CHAMPION = 'https://ddragon.leagueoflegends.com/cdn/img/champion/loading'

// Helper to initialize version and URLs
async function ensureVersion() {
    if (LATEST_VERSION) return
    LATEST_VERSION = await GetLolLatestVersions()
    API_CHAMPIONS = `https://ddragon.leagueoflegends.com/cdn/${LATEST_VERSION}/data/en_US/champion.json`
    IMG_SQUARE_CHAMPION = `https://ddragon.leagueoflegends.com/cdn/${LATEST_VERSION}/img/champion`
}

// Cache to store fetched champion data to avoid redundant API calls
let cachedChampionsData = null

// Async function to fetch champion data from the API
async function FetchChampions() {
    // Return cached data if available
    if (cachedChampionsData) {
        return cachedChampionsData
    }

    try {
        await ensureVersion()
        // Fetch data from the API
        const response = await fetch(API_CHAMPIONS)
        const data = await response.json()
        // Cache the data
        cachedChampionsData = data.data
        return cachedChampionsData
    } catch (error) {
        // Log any errors that occur during the fetch
        console.error(`Error fetching champions: ${error}`)
        return {}
    }
}

// Function to get all champion IDs
export async function GetAllChampionsIds() {
    const championsData = await FetchChampions()
    // Return an array of champion IDs
    return Object.keys(championsData)
}

// Function to get all champion names
export async function GetAllChampionsNames() {
    const championsData = await FetchChampions()
    // Return an array of champion names
    return Object.values(championsData).map(champion => champion.name)
}

// Function to get the damage type of a champion (AD or AP)
export async function GetChampionDamageType(championId) {
    try {
        // Fetch damage type data from a local JSON file
        const response = await fetch('../js/damageType.json')
        const damageTypeData = await response.json()

        // Get the damage type for the given champion ID
        const damageType = damageTypeData[championId]
        if (damageType) {
            return damageType
        } else {
            throw new Error(`Champion not found or damage type not defined for ${championId}`)
        }
    } catch (error) {
        // Log any errors that occur during the fetch
        console.error(`Error fetching damage type: ${error}`)
    }
}

// Function to get the tags (roles) of a champion
export async function GetChampionTags(championId) {
    const championsData = await FetchChampions()
    // Return the tags for the given champion ID, or an empty array if not found
    return championsData[championId]?.tags || []
}

// Function to get the link to the champion's detail page
export function GetChampionLink(championId) {
    return `champion.html?id=${championId}`
}

// Function to create the URL for the champion's rectangle image
export async function GetRectangleChampionImageURL(championId, imgNumber) {
    await ensureVersion()
    return `${IMG_RECTANGLE_CHAMPION}/${championId}_${imgNumber}.jpg`
}

// Function to create the URL for the champion's square image
export async function GetSquareChampionImageURL(championId) {
    await ensureVersion()
    return `${IMG_SQUARE_CHAMPION}/${championId}.png`
}
