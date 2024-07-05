const API_VERSIONS = "https://ddragon.leagueoflegends.com/api/versions.json"

// ASYNC FUNCTION TO FETCH ALL THE LOL VERSIONS
async function GetLolLatestVersions() {
    try {
        const versions = await fetch(API_VERSIONS).then((response) => response.json())
        return versions[0]
    } catch (error) {
        console.error(`ERROR FETCHING LOL VERSIONS: ${error}`)
    }
}

const LATEST_VERSION = await GetLolLatestVersions()

export default LATEST_VERSION