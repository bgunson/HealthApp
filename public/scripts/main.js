'use strict'

// Checks that the Firebase SDK has been correctly setup and configured.
function checkSetup() {
    if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
        window.alert('You have not configured and imported the Firebase SDK. ' +
            'Make sure you go through the codelab setup instructions and make ' +
            'sure you are running the codelab using `firebase serve`');
    }
}


function verify_User() {
    // For now we assume password/user pair is correct and print out for debuggin
    var username = inputEmail_span.value
    var password = inputPassword_span.value
    console.log("Username: " + username)
    console.log("Password: " + password)

    if (username == 'Bob' && password == "Bob is cool") {
        window.location = "pages/account.html"
    } else {
        alert('Bad username password!')
    }
}

function toggleButton() {
    if (inputEmail_span.value && inputPassword_span.value) {
        submitButtonElement.removeAttribute('disabled');
    } else {
        submitButtonElement.setAttribute('disabled', 'true');
    }
}

function onMessageFormSubmit() {
    if(inputEmail_span && inputPassword_span) {
        console.log("Email:" + inputEmail_span.value);
        console.log("Password:" + inputPassword_span.value);
    }
}

function main() {
    // Checks that Firebase has been imported.
    checkSetup();
}


var provider = new firebase.auth.GoogleAuthProvider();

const inputForm_span = document.getElementById("login-form");
const inputEmail_span = document.getElementById("input-Email");
const inputPassword_span = document.getElementById("input-Password");
const loginButton_span = document.getElementById("login-button");
const submitButtonElement = document.getElementById('login-button');
const googleLogin_Span = document.getElementById('google-signin');

googleLogin_Span.addEventListener('click', googleLogin);

function googleLogin() {
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user isnfo.
        var user = result.user;
        // ...
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
}



// console.log(inputForm_span);

// inputForm_span.addEventListener('submit', onMessageFormSubmit);

// inputEmail_span.addEventListener('keyup', toggleButton);
// inputEmail_span.addEventListener('change', toggleButton);
// inputPassword_span.addEventListener('keyup', toggleButton);
// inputPassword_span.addEventListener('change', toggleButton);


// main();
