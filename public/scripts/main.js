'use strict'

function onMessageFormSubmit() {
    console.log('Log in pushed');
    if(inputEmail_span && inputPassword_span) {
        console.log("Email:" + inputEmail_span.value);
        console.log("Password:" + inputPassword_span.value);

        let docRef = db.collection("users").doc(inputEmail_span.value);
        console.log(docRef);
    }
}



function toggleButton() {
    if (inputEmail_span.value && inputPassword_span.value) {
        submitButtonElement.removeAttribute('disabled');
    } else {
        submitButtonElement.setAttribute('disabled', 'true');
    }
}

// Checks that the Firebase SDK has been correctly setup and configured.
function checkSetup() {
    if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
        window.alert('You have not configured and imported the Firebase SDK. ' +
            'Make sure you go through the codelab setup instructions and make ' +
            'sure you are running the codelab using `firebase serve`');
    }
}

checkSetup();

const db = firebase.firestore();

const inputForm_span = document.getElementById("login-form");
const inputEmail_span = document.getElementById("input-Email");
const inputPassword_span = document.getElementById("input-Password");
const loginButton_span = document.getElementById("login-button");
const submitButtonElement = document.getElementById('login-button');
const googleLogin_Span = document.getElementById('google-signin');

console.log(inputForm_span);


// inputForm_span.addEventListener('submit', onMessageFormSubmit);

inputEmail_span.addEventListener('keyup', toggleButton);
inputEmail_span.addEventListener('change', toggleButton);
inputPassword_span.addEventListener('keyup', toggleButton);
inputPassword_span.addEventListener('change', toggleButton);

console.log('End of script.');