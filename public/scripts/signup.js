'use strict'


function onRegisterFormSubmit(e) {
    e.preventDefault();

    if (checkForm()) {
        registerUser();
        window.location.assign("dashboard.html");
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
    return true;
}

function formFilled() {
    return inputEmail_span.value && inputPassword1_span.value && inputPassword2_span.value;
}

/**
 * Register user and add their data to database
 */
function registerUser() {
    let userType_span = document.querySelector('input[name="userType"]:checked');

    // console.log("email: ", inputEmail_span.value);
    // console.log("psw1: ", inputPassword1_span.value);
    // console.log("psw2: ", inputPassword2_span.value);
    // console.log("usr: ", userType_span.value);



    firebase.auth().createUserWithEmailAndPassword(inputEmail_span.value, inputPassword1_span.value).then(function () {
        let user = firebase.auth().currentUser;

        // console.log(getUserData(user, userType_span));

        db.collection('users').doc(user.uid).set(getUserData(user, userType_span)).then(function () {
            // If we need to do something after writting user into database
        }).catch(function (Error) {
            // If a database error occurs delete user
            firebase.auth().currentUser.delete();
            console.error("Error writting user data: ", error);
        });

        let jsonUserGroups = {};
        jsonUserGroups[user.uid] = true;
        db.collection('groups').doc(String(userType_span.value)).update(jsonUserGroups).then(function () {
            // If we need to do something after writting user into database
        }).catch(function (Error) {
            // If a database error occurs delete user
            firebase.auth().currentUser.delete();
            console.error("Error writting user data: ", error);
        });
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
        } else {
            alert(errorMessage);
        }
        console.log(error);
    });
}

/**
 * Create JSON element representing the new users data
 * @param {firebase.user} user 
 * @param {HTMLRadioElement} userType_span 
 */
function getUserData(user, userType_span) {
    let jsonGroups = {};
    jsonGroups[userType_span.value] = true;

    return {
        userID: user.uid,
        name: "",
        email: user.email,
        groups : jsonGroups
    };
}

function toggleButton() {
    if (formFilled()) {
        registerBtn_span.removeAttribute('disabled');
    } else {
        registerBtn_span.setAttribute('disabled', true);
    }
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
