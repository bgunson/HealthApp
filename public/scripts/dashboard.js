'use strict'


function handleSignedInUser(user) {

}

function handleSignedOutUser() {
    window.location.assign("../index.html");
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

firebase.auth().onAuthStateChanged(function(user) {
    user ? handleSignedInUser(user) : handleSignedOutUser();
});


function initPage() {
    signOutButton_span.addEventListener('click', function() {firebase.auth().signOut()});
    console.log(firebase.auth().currentUser);
}


window.addEventListener('load', initPage);

const signOutButton_span = document.getElementById('sign-out-button');
