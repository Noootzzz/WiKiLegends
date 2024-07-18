// Import the latest LOL version
import LATEST_VERSION from './fetchVersionAPI.js'

//LATEST VERSION
let CURRENT_VERSION = LATEST_VERSION
// dynamic year for the footer
let dateYear = new Date().getFullYear()
let copyright = document.querySelector("footer h2")

copyright.textContent = `\u00A9 ${dateYear} Boisleux Nathan. All Rights Reserved. Patch ${CURRENT_VERSION}`