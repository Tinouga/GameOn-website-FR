const overlay = document.querySelector(".overlay");
const openBtns  = document.querySelectorAll(".modal-btn");
const closeBtn = document.querySelector(".overlay .close");

// retrieve the animation duration of the modal defined in CSS
const modalAnimationDuration = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--modal-animation-duration"));

openBtns.forEach(btn => {
    btn.addEventListener("click", launchModal);
});

closeBtn.addEventListener("click", closeModal);

/*
 * Open the modal
 */
function launchModal() {
    overlay.style.display = "block";
    setTimeout(() => {
        overlay.classList.add("show");
    });
}

/*
 * Close the modal
 */
function closeModal() {
    overlay.classList.remove("show");
    setTimeout(() => {
        overlay.style.display = "none";
    }, modalAnimationDuration/2);
}