// Import the latest LOL version
import LATEST_VERSION from './fetchVersionAPI.js'

// API endpoint for fetching champion data
const API_CHAMPION = `https://ddragon.leagueoflegends.com/cdn/${LATEST_VERSION}/data/en_US/champion`
const API_SPELLS = `https://ddragon.leagueoflegends.com/cdn/${LATEST_VERSION}/img/spell`
const API_PASSIVE = `https://ddragon.leagueoflegends.com/cdn/${LATEST_VERSION}/img/passive`

// VARIABLE TO HOLD THE CHAMPION ID
export let championId = ""

// Cache to store fetched champion data to avoid redundant API calls
let cachedChampionData = null

// ASYNC FUNCTION TO FETCH ONLY 1 CHAMPION INFORMATION WITH THE URL PARAMS
async function FetchChampion() {
    // Return cached data if available
    if (cachedChampionData) {
        return cachedChampionData
    }

    try {
        // GET THE CHAMPION ID FROM THE URL PARAMS
        championId = new URLSearchParams(window.location.search).get("id")
        if (!championId) {
            throw new Error('Champion ID not found in URL parameters')
        }

        // Full built URL
        const API_CHAMPION_FULL_URL = `${API_CHAMPION}/${championId}.json`

        // Fetch the champion information with the URL params
        const response = await fetch(API_CHAMPION_FULL_URL)
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`)
        }

        const data = await response.json()
        if (!data.data || !data.data[championId]) {
            throw new Error('Champion data not found in response')
        }

        // Cache the fetched data
        cachedChampionData = data

        return data
    } catch (error) {
        console.error(`FETCH CHAMPION ERROR : ${error}`)
    }
}

export async function GetChampionName() {
    try {
        const championData = await FetchChampion()
        if (championData) {
            const championName = championData.data[championId].name
            return championName
        }
    } catch (error) {
        console.error(`GET CHAMPION NAME ERROR: ${error}`)
    }
}

export async function GetChampionTitle() {
    try {
        const championData = await FetchChampion()
        if (championData) {
            const championTitle = championData.data[championId].title
            return championTitle
        }
    } catch (error) {
        console.error(`GET CHAMPION TITLE ERROR: ${error}`)
    }
}

export async function GetChampionTag() {
    try {
        const championData = await FetchChampion()
        if (championData) {
            const championTags = championData.data[championId].tags
            return championTags
        }
    } catch (error) {
        console.error(`GET CHAMPION TAG ERROR: ${error}`)
    }
}

export async function GetChampionLore() {
    try {
        const championData = await FetchChampion()
        if (championData) {
            const championLore = championData.data[championId].lore
            return championLore
        }
    } catch (error) {
        console.error(`GET CHAMPION LORE ERROR: ${error}`)
    }
}

export async function GetChampionPassive() {
    try {
        const championData = await FetchChampion()
        if (championData) {
            const championPassive = championData.data[championId].passive
            let passiveImageLink = `${API_PASSIVE}/${championPassive.image.full}`
            return [championPassive, passiveImageLink]
        }
    } catch (error) {
        console.error(`GET CHAMPION PASSIVE ERROR: ${error}`)
    }
}

export async function GetChampionSpells() {
    try {
        const championData = await FetchChampion()
        if (championData) {
            const championSpells = championData.data[championId].spells
            const spellsDetails = championSpells.map(spell => {
                let spellImageLink = `${API_SPELLS}/${spell.image.full}`
                const spellDetails = {
                    name: spell.name,
                    description: spell.description,
                    cooldown: spell.cooldownBurn,
                    cost: spell.costBurn,
                    range: spell.rangeBurn,
                    image: spellImageLink
                }
                return spellDetails
            })
            return spellsDetails
        }
    } catch (error) {
        console.error(`GET CHAMPION SPELLS ERROR: ${error}`)
    }
}

export async function GetChampionAllyTips() {
    try {
        const championData = await FetchChampion()
        if (championData) {
            const championEnemyTips = championData.data[championId].allytips
            return championEnemyTips
        }
    } catch (error) {
        console.error(`GET CHAMPION ALLY TYPES ERROR: ${error}`)
    }
}

export async function GetChampionEnemyTips() {
    try {
        const championData = await FetchChampion()
        if (championData) {
            const championEnemyTips = championData.data[championId].enemytips
            return championEnemyTips
        }
    } catch (error) {
        console.error(`GET CHAMPION ENEMY TYPES ERROR: ${error}`)
    }
}

export async function GetChampionInfos() {
    try {
        const championData = await FetchChampion()
        if (championData) {
            const championInfo = championData.data[championId].info
            return championInfo
        }
    } catch (error) {
        console.error(`GET CHAMPION INFOS ERROR: ${error}`)
    }
}

export async function GetChampionStats() {
    try {
        const championData = await FetchChampion()
        if (championData) {
            const championStats = championData.data[championId].stats
            return championStats
        }
    } catch (error) {
        console.error(`GET CHAMPION STATS ERROR: ${error}`)
    }
}


export async function GetChampionSkinsList() {
    const championData = await FetchChampion()
    if (championData) {
        let championSkinsList = []
        const championSkins = championData.data[championId].skins
        championSkins.forEach(skin => {
            championSkinsList.push(skin.num)
        })
        return championSkinsList
    }
}

export async function GetChampionSpellsVideosLinksList() {
    try {
        const championData = await FetchChampion()
        if (championData) {
            const championSpellsVideoLinksList = []
            const championSpellsList = ["P1", "Q1", "W1", "E1", "R1"]
            const championSpellsVideoKey = championData.data[championId].key

            const formatKey = (key) => {
                if (key.length === 1) {
                    return `000${key}`
                } else if (key.length === 2) {
                    return `00${key}`
                } else if (key.length === 3) {
                    return `0${key}`
                } else {
                    return key
                }
            }

            const formattedKey = formatKey(championSpellsVideoKey)

            const checkVideoExists = (url) => {
                return new Promise((resolve) => {
                    const video = document.createElement('video')
                    video.src = url
                    video.onloadeddata = () => resolve(true)
                    video.onerror = () => resolve(false)
                })
            }

            for (const spell of championSpellsList) {
                const videoUrl = `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${formattedKey}/ability_${formattedKey}_${spell}.mp4`
                const exists = await checkVideoExists(videoUrl)
                if (exists) {
                    championSpellsVideoLinksList.push(videoUrl)
                } else {
                    championSpellsVideoLinksList.push("NA")
                }
            }

            console.log(championSpellsVideoLinksList)
            return championSpellsVideoLinksList
        }
    } catch (error) {
        console.error(`GET CHAMPION SPELLS VIDEO ERROR: ${error}`)
    }
}

