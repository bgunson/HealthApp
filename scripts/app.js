const inputEmail_span = document.getElementById("input-Email");
const inputPassword_span = document.getElementById("input-Password");
const loginButton_span = document.getElementById("login-button");


main();
 
function main() {
    // This seems like a stupid main
    loginButton_span.addEventListener('click', verify_User);
}



function verify_User(username, password) {
    // For now we assume password/user pair is correct and print out for debuggin
    console.log("Username: " + inputEmail_span.value);
    console.log("Password: " + inputPassword_span.value);


}

