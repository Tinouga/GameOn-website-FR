const overlay = document.querySelector(".overlay");
const openBtns  = document.querySelectorAll(".modal-btn");
const closeBtns = document.querySelectorAll(".overlay .close, .modal-success-btn");

// retrieve the animation duration of the modal defined in CSS
const modalAnimationDuration = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--modal-animation-duration"));

openBtns.forEach(btn => {
    btn.addEventListener("click", launchModal);
});

closeBtns.forEach(btn => {
    btn.addEventListener("click", closeModal);
});

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

        // if a success message was displayed, we make sure not to show it again if/when the modal is opened a second time
        successContainer.classList.remove("fade-in");
        form.classList.remove("fade-out");
    }, modalAnimationDuration/2);
}