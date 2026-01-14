// Import the latest LOL version
import GetLolLatestVersions from './fetchVersionAPI.js'

async function initFooter() {
    //LATEST VERSION
    let CURRENT_VERSION = await GetLolLatestVersions()
    // dynamic year for the footer
    let dateYear = new Date().getFullYear()
    let copyright = document.querySelector("footer h2")
    
    if(copyright) {
        copyright.textContent = `\u00A9 ${dateYear} Boisleux Nathan. All Rights Reserved. Patch ${CURRENT_VERSION}`
    }
}

initFooter()