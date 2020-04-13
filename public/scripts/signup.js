'use strict'


function onRegisterFormSubmit(e) {
    e.preventDefault();

    if (checkForm()) {
        registerUser();
        // window.location.href = "dashboard.html";
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

}

function registerUser() {
    let userType_span = document.querySelector('input[name="userType"]:checked');

    firebase.auth().createUserWithEmailAndPassword(inputEmail_span.value, inputPassword1_span.value).then(function (s) {
        let user = firebase.auth().currentUser;
        console.log(user);

        db.collection(String(userType_span.value)).doc(user.uid).set({
            userID: user.uid,
            name : "",
            email : ""
        }).then(function () {
            // If we need to do something after writting user into database
        }).catch(function (Error) {
            firebase.auth().currentUser.delete();
            console.error("Error writting user data: ", error);
        });

        // Delete user for testing purposes
        firebase.auth().currentUser.delete();
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
        } else {
            alert(errorMessage);
        }
        console.log(error);
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
