'use strict'



function getUiConfig() {
    return {
        'callbacks': {
            // Called when the user has been successfully signed in.
            'signInSuccessWithAuthResult': function (authResult, redirectUrl) {
                if (authResult.user) {
                    handleSignedInUser(authResult.user);
                }
                if (authResult.additionalUserInfo) {
                    document.getElementById('is-new-user').textContent =
                        authResult.additionalUserInfo.isNewUser ?
                            'New User' : 'Existing User';
                }
                // Do not redirect.
                return false;
            }
        },
        // Opens IDP Providers sign-in flow in a popup.
        'signInFlow': 'popup',
        'signInOptions': [
            {
                provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                // Required to enable this provider in One-Tap Sign-up.
                authMethod: 'https://accounts.google.com'
            },
            {
                provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                // Whether the display name should be displayed in Sign Up page.
                requireDisplayName: true,
                signInMethod: 'password'
            }
        ],
        // Terms of service url.
        'tosUrl': 'https://www.google.com',
        // Privacy policy url.
        'privacyPolicyUrl': 'https://www.google.com',
        'credentialHelper':firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM
    };
}

function handleSignedInUser(user) {
    console.log("user signed in.");
    // window.location.assign("pages/account.html");
    firebase.auth().signOut();
    console.log(firebase.auth().currentUser);
}

function handleSignedOutUser() {
    ui.start('#firebaseui-container', getUiConfig());
}

function initApp() {
    // Start ui 
    // ui.start('#firebaseui-container', getUiConfig());

    
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

// Sign in interface
let ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.disableAutoSignIn();

firebase.auth().onAuthStateChanged(function (user) {
    // Some loading screen
    user ? handleSignedInUser(user) : handleSignedOutUser();
});

window.addEventListener('load', initApp);