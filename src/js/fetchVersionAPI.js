const API_VERSIONS = "https://ddragon.leagueoflegends.com/api/versions.json"

// Async function to fetch all the LoL versions
async function GetLolLatestVersions() {
    try {
        // Fetch the versions from the API and parse the response as JSON
        const versions = await fetch(API_VERSIONS).then((response) => response.json())
        // Return the latest version (the first one in the list)
        return versions[0]
    } catch (error) {
        // Log any errors that occur during the fetch
        console.error(`ERROR FETCHING LOL VERSIONS: ${error}`)
    }
}

// Get the latest version by calling the async function and waiting for its result
const LATEST_VERSION = await GetLolLatestVersions()

// Export the latest version as the default export
export default LATEST_VERSION
