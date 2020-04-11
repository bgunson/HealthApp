'use strict'

function onMessageFormSubmit() {
    if(inputEmail_span && inputPassword_span) {
        let docRef = db.collection("users").doc(inputEmail_span.value);
        docRef.get().then(function(doc) {
            if (doc.exists) {
                if (doc.data()['password'] == inputPassword_span.value) {
                    window.location.href = "account.html";
                 } else {
                    alert("Incorrect username/password.")
                 }
            } else {
                alert("No such user.")
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    }
}



function toggleButton() {
    if (inputEmail_span.value && inputPassword_span.value) {
        submitButton_span.removeAttribute('disabled');
    } else {
        submitButton_span.setAttribute('disabled', 'true');
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
const submitButton_span = document.getElementById('login-button');
const googleLogin_span = document.getElementById('google-signin');

console.log(inputForm_span);

submitButton_span.addEventListener('click', onMessageFormSubmit);

inputEmail_span.addEventListener('keyup', toggleButton);
inputEmail_span.addEventListener('change', toggleButton);
inputPassword_span.addEventListener('keyup', toggleButton);
inputPassword_span.addEventListener('change', toggleButton);

console.log('End of script.');