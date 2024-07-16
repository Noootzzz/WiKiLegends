// dynamic year for the footer
let dateYear = new Date().getFullYear()
let copyright = document.querySelector("footer h2")

copyright.textContent = `\u00A9 ${dateYear} Boisleux Nathan. All Rights Reserved.`