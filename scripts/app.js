'use strict'

const inputEmail_span = document.getElementById("input-Email");
const inputPassword_span = document.getElementById("input-Password");
const loginButton_span = document.getElementById("login-button");


const firebaseConfig = {
    apiKey: "AIzaSyB2j1bGOOC9pWCy7YlNcyVmmI29PMQyBR4",
    authDomain: "health-app-502a4.firebaseapp.com",
    databaseURL: "https://health-app-502a4.firebaseio.com",
    projectId: "health-app-502a4",
    storageBucket: "health-app-502a4.appspot.com",
    messagingSenderId: "407596506008",
    appId: "1:407596506008:web:700a3f928a6c5c772d69ed"
  };
  firebase.ini
const database = firebase.database();


main();
 
function main() {
    // This seems like a stupid main
    loginButton_span.addEventListener('click', verify_User);

}



function verify_User() {
    // For now we assume password/user pair is correct and print out for debuggin
    var username = inputEmail_span.value
    var password = inputPassword_span.value
    console.log("Username: " + username)
    console.log("Password: " + password)

    if (username =='Bob' && password == "Bob is cool") {
        window.location = "pages/account.html"
    } else {
        alert('Bad username password!')
    }
}

