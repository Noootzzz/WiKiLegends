const menu = document.querySelector("#nav-toggle")
const menuContent = document.querySelector("#nav-content")

// toggle the menu on mobile
menu.addEventListener("click", () => {
    menuContent.classList.toggle("hidden")
})