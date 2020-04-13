'use strict'


function handleSignedInUser(user) {
    console.log("user signed in.");
    console.log(firebase.auth().currentUser);
    window.location.assign("pages/dashboard.html");
    // firebase.auth().signOut();
}

function handleSignedOutUser() {
    console.log("user signed out.");
}

function onMessageFormSubmit() {
    if (checkMessageForm()) {
        firebase.auth().signInWithEmailAndPassword(inputEmail_span.value, inputPassword_span.value).then(function () {
            // What ever we need to do after login in user
        }).catch(function (error) {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log("Error: ", error);
        });
    }
}

function checkMessageForm() {
    return !!(inputEmail_span && inputPassword_span);
}

function toggleButton() {
    if (inputEmail_span.value && inputPassword_span.value) {
        submitButton_span.removeAttribute('disabled');
    } else {
        submitButton_span.setAttribute('disabled', 'true');
    }
}


function initApp() {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(function() {

    }).catch(function(Error) {

    });
    firebase.auth().onAuthStateChanged(function (user) {
        // Some loading screen
        user ? handleSignedInUser(user) : handleSignedOutUser();
    });

    submitButton_span.addEventListener('click', onMessageFormSubmit);

    inputEmail_span.addEventListener('keyup', toggleButton);
    inputEmail_span.addEventListener('change', toggleButton);
    inputPassword_span.addEventListener('keyup', toggleButton);
    inputPassword_span.addEventListener('change', toggleButton);
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

window.addEventListener('load', initApp);

const inputForm_span = document.getElementById("login-form");
const inputEmail_span = document.getElementById("input-Email");
const inputPassword_span = document.getElementById("input-Password");
const loginButton_span = document.getElementById("login-button");
const submitButton_span = document.getElementById('login-button');
const googleLogin_span = document.getElementById('google-signin');
