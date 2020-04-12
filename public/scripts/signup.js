'use strict'


function onRegisterFormSubmit(e) {
    e.preventDefault();

    if (checkForm()) {
        registerUser();
        window.location.href = "dashboard.html";
    } else {
        signupForm_span.reset();
    }
}

function checkForm() {
    if (!formFilled()) {
        return false;
    }

    if (inputPassword1_span.value != inputPassword2_span.value) {
        alert("The passwords do not match.");
        return false;
    }

    if (!true) {
        alert("That username or email is already registered.");
        return false;
    }

    return true;
}

function newRegistration() {
    let userType_span = document.querySelector('input[name="userType"]:checked');
    let docRef = db.collection(userType_span.value).doc(inputEmail_span.value);

    docRef.get().then(function (doc) {
        if (doc.exists) {
            return false;
        } else {
            return true;
        }
    }).catch(function (error) {
        console.log("Error checking database for users:", error);
    });
}

function registerUser() {
    let userType_span = document.querySelector('input[name="userType"]:checked');
    db.collection(String(userType_span.value)).doc(inputEmail_span.value).set({
        password: inputPassword1_span.value
    }).catch(function (error) {
        console.error('Error writing new user to users database', error);
    });
}

function toggleButton() {
    if (formFilled()) {
        registerBtn_span.removeAttribute('disabled');
    } else {
        registerBtn_span.setAttribute('disabled', true);
    }
}

function formFilled() {
    return inputEmail_span.value && inputPassword1_span.value && inputPassword2_span.value;
}


function checkSetup() {
    if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
        window.alert('You have not configured and imported the Firebase SDK. ' +
            'Make sure you go through the codelab setup instructions and make ' +
            'sure you are running the codelab using `firebase serve`');
    }
}

checkSetup();

let db = firebase.firestore();


const signupForm_span = document.getElementById('signup-form');
const inputEmail_span = document.getElementById('inputEmail');
const inputPassword1_span = document.getElementById('inputPassword1');
const inputPassword2_span = document.getElementById('inputPassword2');
const registerBtn_span = document.getElementById('register-btn');

signupForm_span.addEventListener('submit', onRegisterFormSubmit);


inputEmail_span.addEventListener('keyup', toggleButton);
inputEmail_span.addEventListener('change', toggleButton);
inputPassword1_span.addEventListener('keyup', toggleButton);
inputPassword1_span.addEventListener('change', toggleButton);
inputPassword2_span.addEventListener('keyup', toggleButton);
inputPassword2_span.addEventListener('change', toggleButton);
