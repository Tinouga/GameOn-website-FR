// DOM Elements
const modalOverlay = document.querySelector(".overlay");
// const modalContent = document.querySelector(".overlay .content");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
    modalOverlay.style.display = "block";
    setTimeout(() => {
        modalOverlay.classList.add("show");
    })
}

// retrieve the animation duration of the modal defined in CSS
const modalAnimationDuration = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--modal-duration"));

const closeBtn = document.querySelector(".overlay .close");
closeBtn.addEventListener("click", closeModal);

/*
 * Close the modal
 */
function closeModal() {
    modalOverlay.classList.remove("show");
    setTimeout(() => {
        modalOverlay.style.display = "none";
    }, modalAnimationDuration/2);
}