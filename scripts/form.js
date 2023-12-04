const form = document.getElementById("inscriptionForm");

form.addEventListener("submit", e => {
    if(!validateForm()) {
        e.preventDefault();
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

    // necessary to print multiple error messages
    validateName(firstName);
    validateName(lastName);
    validateEmail(email);
    validateBirthdate(birthdate);
    validateQuantity(quantity);

    return validateName(firstName) &&
        validateName(lastName) &&
        validateEmail(email) &&
        validateBirthdate(birthdate) &&
        validateQuantity(quantity);
}

/**
 * Test the first/last name field
 * @param {HTMLInputElement} name - input element
 * @return {boolean} true if it has at least 2 characters, false otherwise
 */
function validateName(name) {
    const nameValue = name.value.trim();
    if(nameValue.length < 2) {
        setErrorMessage(name, "Veuillez entrer 2 caractères ou plus.");
        return false;
    }
    return true;
}

/**
 * Test the email field
 * @param {HTMLInputElement} email - input element
 * @returns {boolean} true if it is a valid email, false otherwise
 */
function validateEmail(email) {
    const emailValue = email.value.trim();
    const emailRegex = /^[\w._-]+@[\w._-]+\.[\w]+$/;

    if(!emailRegex.test(emailValue)) {
        setErrorMessage(email, "Veuillez entrer une adresse mail valide.");
        return false;
    }
    return true;
}

/**
 * Test the birthdate field
 * @param {HTMLInputElement} birthdate - input element
 * @returns {boolean} true if the user is older than 12, false otherwise
 */
function validateBirthdate(birthdate) {
    const birthdateValue = new Date(birthdate.value);

    // calculate the age of the user
    const today = new Date();
    let age = today.getFullYear() - birthdateValue.getFullYear();
    // if the user's birthday has not yet passed this year, subtract 1
    const months = today.getMonth() - birthdateValue.getMonth();
    if(months < 0 || (months === 0 && today.getDate() < birthdateValue.getDate())) {
        age--;
    }

    if(age < 12) {
        setErrorMessage(birthdate, "Vous devez avoir au moins 12 ans.");
        return false;
    }
    return true;
}

/**
 * Test the quantity field
 * @param quantity - input element
 * @returns {boolean} true if the quantity is between 0 and 99, false otherwise
 */
function validateQuantity(quantity) {
    const quantityValue = parseInt(quantity.value, 10);

    if(quantityValue < 0 || quantityValue > 99) {
        setErrorMessage(quantity, "Veuillez entrer un nombre entre 0 et 99.");
        return false;
    }
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
}