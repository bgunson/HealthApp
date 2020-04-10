'use strict'


function onRegisterFormSubmit(e) {
    e.preventDefault();

    if (checkForm()) {
        registerUser();
        // window.location.href = "account.html";
    }
}

function checkForm() {
    return true;
}

function registerUser() {
    let userType_span = document.querySelector( 
        'input[name="userType"]:checked'); 
    let jsonGroups = {};
    jsonGroups[userType_span.value] = true
    
    firebase.firestore().collection("users").doc(inputEmail_span.value).set({
        password: inputPassword1_span.value,
        groups : jsonGroups
    }).catch(function (error) {
        console.error('Error writing new message to database', error);
    });
}




function checkSetup() {
    if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
        window.alert('You have not configured and imported the Firebase SDK. ' +
            'Make sure you go through the codelab setup instructions and make ' +
            'sure you are running the codelab using `firebase serve`');
    }
}

checkSetup();

const signupForm_span = document.getElementById('signup-form');
const inputEmail_span = document.getElementById('inputEmail');
const inputPassword1_span = document.getElementById('inputPassword1');
const inputPassword2_span = document.getElementById('inputPassword2');
const registerBtn_span = document.getElementById('register-btn');

signupForm_span.addEventListener('submit', onRegisterFormSubmit);


