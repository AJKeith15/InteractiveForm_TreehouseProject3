// focus() method learned from https://www.w3schools.com/jsref/met_html_focus.asp
document.getElementById('name').focus();

// this function will change an HTML element's display property between 'none' and 'inline'
function changeHTMLDisplay(fieldID) {
    (document.getElementById(fieldID).style.display === 'none') ? (document.getElementById(fieldID).style.display = 'inline') : (document.getElementById(fieldID).style.display = 'none');
};

//  JOB ROLE section
//define variables
const jobSelector = document.getElementById('title');
document.getElementById('other-title').style.display = 'none';
let previousJob = jobSelector.value;

// event listener to hide or display "Other" job title
jobSelector.addEventListener('change', (e) => {
    const result = e.target.value;
    if (result !== 'other' && previousJob === 'other') {
        changeHTMLDisplay('other-title');
    } else if (result === 'other') {
        changeHTMLDisplay('other-title');
    };
    previousJob = result;
});

// T-SHIRT INFO section
// define variables
const tshirtDiv = document.getElementsByClassName('shirt-box')[0];
const designSelector = document.getElementById('design');
const colorSelector = document.getElementById('color');
const colorSelectorLabel = document.querySelector("label[for='color']");
colorSelector.style.display = 'none';
colorSelectorLabel.style.display = 'none';
hideColorOptions();

// this function will hide all options from the color selector
function hideColorOptions() {
    for (let i = 0; i < colorSelector.childElementCount; i++) {
        colorSelector.children[i].style.display = 'none';
    };
};

// this function will unhide any color options for the JSPuns theme
function showJSPunsColors() {
    colorSelector.style.display = 'inherit';
    colorSelectorLabel.style.display = 'inherit';
    for (let i = 0; i < 3; i++) {
        colorSelector.children[i].style.display = 'inherit';
    };
    colorSelector.selectedIndex = '0';
};

// this function will unhide any color options for the I <3 JS theme
function showLoveJSColors() {
    colorSelector.style.display = 'inherit';
    colorSelectorLabel.style.display = 'inherit';
    for (let i = 3; i < 6; i++) {
        colorSelector.children[i].style.display = 'inherit';
    };
    colorSelector.selectedIndex = '3';
};

// this event listener displays the color options based on what theme is selected
designSelector.addEventListener('change', (e) => {
    const result = e.target.selectedIndex;
    if (result === 0) {
        colorSelector.style.display = 'none';
        colorSelectorLabel.style.display = 'none';
        hideColorOptions();
    } else if (result === 1) {
        hideColorOptions();
        showJSPunsColors();
    } else {
        hideColorOptions();
        showLoveJSColors();
    };
});

// REGISTER FOR ACTIVITIES section
// define variables
const shopList = document.querySelectorAll("input[type='checkbox']");
const totalLabel = document.createElement('label')
totalLabel.textContent = 'Total: $';
const total = document.createElement('span');
total.textContent = '0';
let totalInt = 0;

document.querySelector('.activities').appendChild(totalLabel);
totalLabel.appendChild(total);

// this function adds an event listener to each workshop checkbox that when checked, the data-cost property is added to the total dollar amount
function checkboxPriceAdders() {
    for (let i = 0; i < shopList.length; i++) {
        shopList[i].addEventListener('change', (e) => {
            let dollarValue = shopList[i].getAttribute('data-cost')
            if (e.target.checked) {
                totalInt += +dollarValue;
                total.textContent = totalInt;
            } else {
                totalInt -= +dollarValue;
                total.textContent = totalInt;
            };
        });
    };
};

// run above property to assign event listeners to all checkboxes
checkboxPriceAdders();

// this function takes two integers as parameters being indexes of checkboxes from a list
// if the first checkbox index is clicked, the second checkbox index is disabled and an error message is appended to the label
function checkboxListeners(num1, num2) {
    shopList[num1].addEventListener('change', (e) => {
        let conflict = document.createElement('span');
        conflict.textContent = ' (TIME CONFLICT)';
        if (e.target.checked) {
            shopList[num2].parentNode.style.color = 'gray';
            shopList[num2].disabled = true;
            shopList[num2].parentNode.appendChild(conflict);
        } else {
            shopList[num2].parentNode.style.color = 'black';
            shopList[num2].disabled = false;
            shopList[num2].parentNode.querySelector('span').remove();
        };
    });
};

// apply event listeners to appropriate checkboxes using above function
checkboxListeners(1, 3);
checkboxListeners(3, 1);
checkboxListeners(2, 4);
checkboxListeners(4, 2);

// PAYMENT INFO section
// define variables
const paymentSelector = document.getElementById('payment');
const paymentLabel = document.querySelector("label[for='payment']");
const creditCard = document.getElementById('credit-card');
const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');
// set default payment option to credit card and hide other payment option divs
paymentSelector.firstElementChild.disabled = true;
paymentSelector.selectedIndex = 1;
creditCard.style.display = 'inline';
paypal.style.display = 'none';
bitcoin.style.display = 'none';

// add event listener to display only that payment's details below selector
paymentSelector.addEventListener('change', (e) => {
    if (e.target.selectedIndex === 1) {
        creditCard.style.display = 'inline';
        paypal.style.display = 'none';
        bitcoin.style.display = 'none';
    } else if (e.target.selectedIndex === 2) {
        creditCard.style.display = 'none';
        paypal.style.display = 'inline';
        bitcoin.style.display = 'none';
    } else {
        creditCard.style.display = 'none';
        paypal.style.display = 'none';
        bitcoin.style.display = 'inline';
    };
});

//FORM VALIDATION
// define variables
const registerButton = document.querySelector('button');
let name = document.getElementById('name');
let nameLabel = document.querySelector("label[for='name']");
let email = document.getElementById('mail');
let emailLabel = document.querySelector("label[for='mail']");
let title = document.getElementById('other-title');
let titleLabel = document.querySelector("label[for='title']");
let ccNum = document.getElementById('cc-num');
let ccNumLabel = document.querySelector("label[for='cc-num']");
let zip = document.getElementById('zip');
let zipLabel = document.querySelector("label[for='zip']");
let cvv = document.getElementById('cvv');
let cvvLabel = document.querySelector("label[for='cvv']");

// event listener for register button
registerButton.addEventListener('click', (e) => {
    // check name field
    updateName();
    // remove error message from name field
    if (nameLabel.querySelector('p')) {
        nameLabel.querySelector('p').remove();
    };
    // define error message to apply if name field is not valid
    let nameError = document.createElement('p');
    nameError.textContent = 'Please enter first and last name separated by a space. Characters A-Z only.';
    // if name field is invalid, apply above error message
    if (!isValidName()) {
        nameLabel.appendChild(nameError);
    };

    //do the same with email as above with name
    updateEmail();
    if (emailLabel.querySelector('p')) {
        emailLabel.querySelector('p').remove();
    };
    let emailError = document.createElement('p');
    emailError.textContent = 'Please enter a valid email address.';
    if (!isValidEmail()) {
        emailLabel.appendChild(emailError);
    };

    // if user selects other as job, run function to validate title and change display options
    if (jobSelector.value === 'other') {
        updateTitle();
    } else {
        // if not other, set display options back to default
        titleLabel.style.color = 'black';
        title.style.borderColor = 'rgb(111, 157, 220)';
    };

    // check that tshirt and workshop fields are valid
    isValidTShirt();
    isValidShops();
    
    // if payment selector is credit card, then remove error message if any, then validate cc fields
    if (paymentSelector.selectedIndex === 1) {  
        if (paymentLabel.querySelector('p')) {
            paymentLabel.querySelector('p').remove();
        };  
        updateCC();
        updateZip();
        updateCVV();
    } else {
        // if other than credit card, remove error message and set display styles back to defaul
        if (paymentLabel.querySelector('p')) {
            paymentLabel.querySelector('p').remove();
        };
        ccNumLabel.style.color = 'black';
        ccNum.style.borderColor = 'rgb(111, 157, 220)';
        zipLabel.style.color = 'black';
        zip.style.borderColor = 'rgb(111, 157, 220)';
        ccvLabel.style.color = 'black';
        ccv.style.borderColor = 'rgb(111, 157, 220)';
    };

    // remove registration error message if it already exists
    if (document.getElementById('register-message')) {
        document.getElementById('register-message').remove();
    }

    // create message to be displayed if registration is unsuccessful
    let registerMessage = document.createElement('p');
    // if any error messages exist from validations above, then do not refresh page and display error message
    if (document.querySelector("[style='color: red;']") || document.querySelector("[style='border-color: red;']")) {
        e.preventDefault();
        registerMessage.textContent = 'Please fix the above issues marked in the color Red.';
        registerMessage.style.color = 'red';
        registerMessage.id = 'register-message';
        registerButton.parentNode.insertBefore(registerMessage, registerButton);
    };
});

// function to change display styles red if validation function returns false and set display back to default if returns true
function changeTextField(fieldName, fieldLabel, validateFunc) {
    if (validateFunc) {
        fieldLabel.style.color = 'black';
        fieldName.style.borderColor = 'rgb(111, 157, 220)';
    } else {
        fieldLabel.style.color = 'red';
        fieldName.style.borderColor = 'red';
    };
};

// use above function to create new functions that runs validation to change display styles
function updateName() { changeTextField(name, nameLabel, isValidName()) };
function updateEmail() { changeTextField(email, emailLabel, isValidEmail()) };
function updateTitle() { changeTextField(title, titleLabel, isValidTitle()) };
function updateCC() { changeTextField(ccNum, ccNumLabel, isValidCC()) };
function updateZip() { changeTextField(zip, zipLabel, isValidZip()) };
function updateCVV() { changeTextField(cvv, cvvLabel, isValidCVV()) };

// add event listeners for all fields - these will run active validations during user input
name.addEventListener('input', () => { updateName() });
email.addEventListener('input', () => { updateEmail() });
title.addEventListener('input', () => { updateTitle() });
jobSelector.addEventListener('change', () => { updateTitle() });
ccNum.addEventListener('input', () => { updateCC() });
zip.addEventListener('input', () => { updateZip() });
cvv.addEventListener('input', () => { updateCVV() });

// validate name field
function isValidName() {
    // if name is valid and the <p> element error message exists, then remove it
    if (/^[a-z]+(\s)[a-z]+$/i.test(name.value) && (nameLabel.querySelector('p'))) {
        nameLabel.querySelector('p').remove();
    }
    return /^[a-z]+(\s)[a-z]+$/i.test(name.value);
};

// validate email field
function isValidEmail() {
    // if email is valid and the <p> element error message exists, then remove it
    if (/^[^@\s]+@[^@.\s]+\.[a-z]+$/i.test(email.value) && (emailLabel.querySelector('p'))) {
        emailLabel.querySelector('p').remove();
    };
    return /^[^@\s]+@[^@.\s]+\.[a-z]+$/i.test(email.value);
};

// validate title field
function isValidTitle() {
    // if the job selector is not 'other' then return true so that display styles can be set back to default (not red)
    if (jobSelector.selectedIndex !== 5) {
        return true;
    } else {
        // if 'other' then run validation for other job text field
        return /^[a-z\s]+$/i.test(title.value);
    };
};

// validate tshirt options
function isValidTShirt() {
    // if error message exists, remove it
    if (tshirtDiv.querySelector('p')) {
        tshirtDiv.querySelector('p').remove();
    };
    // define error message
    const designError = document.createElement('p');
    designError.textContent = '\nPlease select a t-shirt design and color.';
    designError.style.color = 'red';
    // if theme is not selected, then append error message
    if (designSelector.selectedIndex === 0) {
        tshirtDiv.appendChild(designError);
    };
};

// validate workshops
function isValidShops() {
    // remove error message if it exists
    if (totalLabel.querySelector('p')) {
        totalLabel.querySelector('p').remove();
    };
    // check how many shops user has signed up for by checking how many checkboxes are checked
    let totalShops = 0;
    for (let i = 0; i < shopList.length; i++) {
        if (shopList[i].checked) {
            totalShops++;
        }
    }
    // define error message
    const shopsError = document.createElement('p');
    const removeError = totalLabel.querySelector('p');
    shopsError.textContent = 'Please select at least one workshop.';
    shopsError.style.color = 'red';
    // if no workshops are selected, show error message
    if (totalShops === 0) {
        totalLabel.appendChild(shopsError);
    };
};

// validate credit card number
function isValidCC() {
    let ccError = document.createElement('p');
    // remove error message if it exists
    if (paymentLabel.querySelector('p')) {
        paymentLabel.querySelector('p').remove();
    };

    // if field is empty, display this error message
    if (ccNum.value.length === 0) {
        ccError.textContent = 'Please enter a credit card number.';
        ccError.style.color = 'red';
        paymentLabel.append(ccError);
    } else if (ccNum.value.length < 13 || ccNum.value.length > 16) {
        // if field is not empty but wrong length, display this message
        ccError.textContent = 'Please enter a valid credit card number that is between 13 and 16 digits long.';
        ccError.style.color = 'red';
        paymentLabel.append(ccError);
    } else if (/[^0-9]/.test(ccNum.value)) {
        // if field is right length but has incorrect characters, display this message
        ccError.textContent = 'Please enter numbers only.';
        ccError.style.color = 'red';
        paymentLabel.append(ccError);
    };
    return /^[0-9]{13}[0-9]?[0-9]?[0-9]?$/.test(ccNum.value);
};

// vaildate zip code - make sure it is 5 numerical characters
function isValidZip() {
    return /^[0-9]{5}$/.test(zip.value);
};

// validate cvv number - make sure it is 3 characters
function isValidCVV() {
    return /^[0-9]{3}$/.test(cvv.value);
};