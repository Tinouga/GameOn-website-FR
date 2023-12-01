/**
 * Open and close the navigation menu on mobile
 */
function editNav() {
    const header = document.getElementById("topNav");
    header.className = header.classList.length === 0 ? "responsive" : "";
}

document.querySelector(".navbar__menu-btn").addEventListener("click", editNav);