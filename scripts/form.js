const form = document.getElementById("inscriptionForm");

form.addEventListener("submit", e => {
    e.preventDefault();
    if (validateForm()) {
        showSuccessMessage();
        // clear the form's inputs
        form.reset();
    }
});

/**
 * Test each field of the form before validating it
 * @returns {boolean} true if the form is valid, false otherwise
 */
function validateForm() {
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const email = document.getElementById("email");
    const birthdate = document.getElementById("birthdate");
    const quantity = document.getElementById("quantity");
    const tournaments = document.querySelectorAll("input[name='location']");
    const cgu = document.getElementById("cgu");

    // necessary to print multiple error messages
    // if there was a previous error shown which is not needed anymore, we remove it
    validateName(firstName);
    validateName(lastName);
    validateEmail(email);
    validateBirthdate(birthdate);
    validateQuantity(quantity);
    validateTournament(tournaments);
    validateCgu(cgu);

    return validateName(firstName) &&
        validateName(lastName) &&
        validateEmail(email) &&
        validateBirthdate(birthdate) &&
        validateQuantity(quantity) &&
        validateTournament(tournaments) &&
        validateCgu(cgu);
}

/**
 * Test the first/last name field
 * @param {HTMLInputElement} name - input element
 * @return {boolean} true if it has at least 2 characters, false otherwise
 */
function validateName(name) {
    const nameValue = name.value.trim();

    switch(true) {
        case nameValue.length ===0:
            setErrorMessage(name, "Veuillez entrer votre nom.");
            return false;
        case nameValue.length < 2:
            setErrorMessage(name, "Veuillez entrer 2 caractères ou plus.");
            return false;
        default:
            clearErrorMessage(name);
            return true;
    }
}

/**
 * Test the email field
 * @param {HTMLInputElement} email - input element
 * @returns {boolean} true if it is a valid email, false otherwise
 */
function validateEmail(email) {
    const emailValue = email.value.trim();
    const emailRegex = /^[\w.-]+@[\w.-]+\.\w+$/;

    switch(true) {
        case emailValue.length === 0:
            setErrorMessage(email, "Veuillez entrer votre adresse mail.");
            return false;
        case !emailRegex.test(emailValue):
            setErrorMessage(email, "Veuillez entrer une adresse mail valide.");
            return false;
        default:
            clearErrorMessage(email);
            return true;
    }
}

/**
 * Test the birthdate field
 * @param {HTMLInputElement} birthdate - input element
 * @returns {boolean} true if the user is older than 12, false otherwise
 */
function validateBirthdate(birthdate) {
    if(birthdate.value.length === 0) {
        setErrorMessage(birthdate, "Veuillez entrer votre date de naissance.");
        return false;
    }

    const birthdateValue = new Date(birthdate.value);

    // calculate the age of the user
    const today = new Date();
    let age = today.getFullYear() - birthdateValue.getFullYear();
    // if the user's birthday has not yet passed this year, subtract 1
    const months = today.getMonth() - birthdateValue.getMonth();
    if (months < 0 || (months === 0 && today.getDate() < birthdateValue.getDate())) {
        age--;
    }

    if (age < 12) {
        setErrorMessage(birthdate, "Vous devez avoir au moins 12 ans.");
        return false;
    }
    clearErrorMessage(birthdate);
    return true;
}

/**
 * Test the quantity field
 * @param quantity - input element
 * @returns {boolean} true if the quantity is a number between 0 and 99, false otherwise
 */
function validateQuantity(quantity) {
    const quantityValue = quantity.value;
    const quantityRegex = /^0*[0-9]{1,2}$/;

    if (!quantityRegex.test(quantityValue)) {
        setErrorMessage(quantity, "Veuillez entrer un nombre entre 0 et 99.");
        return false;
    }
    clearErrorMessage(quantity);
    return true;
}

/**
 * Test the tournament field
 * @param tournaments - list of all tournaments
 * @returns {boolean} true if a tournament is checked, false otherwise
 */
function validateTournament(tournaments) {
    let checked = false;

    // if one tournament is checked, the form is valid
    for (let i = 0; i < tournaments.length; i++) {
        if (tournaments[i].checked) {
            checked = true;
            break;
        }
    }

    if (!checked) {
        setErrorMessage(tournaments[0], "Veuillez choisir un tournoi.");
        return false;
    }
    clearErrorMessage(tournaments[0]);
    return true;
}

/**
 * Test the CGU field
 * @param cgu - checkbox element
 * @returns {boolean} true if the CGU are checked, false otherwise
 */
function validateCgu(cgu) {
    if (!cgu.checked) {
        setErrorMessage(cgu, "Vous devez accepter les conditions d'utilisation.");
        return false;
    }
    clearErrorMessage(cgu);
    return true;
}

/**
 * Display an error message under the input
 * @param {HTMLElement} input - input element for which we want to show an error
 * @param {String} message - message to display
 */
function setErrorMessage(input, message) {
    const formData = input.parentElement;
    const errorMessage = formData.querySelector(".error-message");
    errorMessage.textContent = message;
    input.classList.add("error");

    // if there isn't already an error message shown for the input, we animate & show one
    if (!errorMessage.classList.contains("fade-in")) {
        errorMessage.classList.remove("fade-out");
        errorMessage.classList.add("fade-in");
    }
}

/**
 * If the input has an error message associated to it, remove it
 * @param {HTMLElement} input - input element for which we want to remove the error message
 */
function clearErrorMessage(input) {
    // if the input does not have an error message, we do nothing
    if (!input.classList.contains("error")) {
        return;
    }

    const formData = input.parentElement;
    const errorMessage = formData.querySelector(".error-message");

    // clear the error message first
    errorMessage.classList.remove("fade-in");
    errorMessage.classList.add("fade-out");
    errorMessage.textContent = "";

    input.classList.remove("error");
}

/**
 * Close the modal and then display a success message
 */
function showSuccessMessage() {
    const banner = document.getElementById("successBanner");

    // first we close the modal
    closeModal();

    // then we display the success message
    banner.classList.remove("fade-out");
    banner.classList.add("fade-in");

    banner.addEventListener("animationend", () => {
        // we do nothing if the banner is already fading out
        if (banner.classList.contains("fade-out")) {
            return;
        }
        banner.classList.remove("fade-in");
        banner.classList.add("fade-out");
    });
}