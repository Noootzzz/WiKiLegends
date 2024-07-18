import {
    GetChampionName,
    GetChampionTitle,
    GetChampionTag,
    GetChampionLore,
    GetChampionPassive,
    GetChampionSpells,
    GetChampionAllyTips,
    GetChampionEnemyTips,
    GetChampionInfos,
    GetChampionStats
} from './fetchSingleChampion.js'



// Call the functions and log the returned values as needed
const championName = await GetChampionName()
const championTitle = await GetChampionTitle()
const championTags = await GetChampionTag()
const championLore = await GetChampionLore()
const championPassive = await GetChampionPassive()
const championSpells = await GetChampionSpells()
const championAllyTips = await GetChampionAllyTips()
const championEnemyTips = await GetChampionEnemyTips()
const championInfo = await GetChampionInfos()
const championStats = await GetChampionStats()

console.log('Fetched Champion Data:', {
    championName,
    championTitle,
    championTags,
    championLore,
    championPassive,
    championSpells,
    championAllyTips,
    championEnemyTips,
    championInfo,
    championStats
})
