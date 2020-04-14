'use strict'

const reflist = document.getElementById('refferal-list');
const form = document.querySelector('#add-refferal-form');
const db = firebase.firestore();

//create element and display appointments
function displayApp(user, doc) {
    let li = document.createElement('li');
    let apptype = document.createElement('span');
    let urgency = document.createElement('span');
    let reason = document.createElement('span');
    let cancel = document.createElement('div');
    cancel.setAttribute('class', 'btn btn-secondary');

    li.setAttribute('data-id', doc.id); 
    console.log("aptdoc2: ", doc.data());
    doctor.textContent = doc.data().doctor;
    datetime.textContent = doc.data().datetime;
    cancel.textContent = 'Cancel Request'

    li.appendChild(apptype);
    li.append("; ");
    li.appendChild(urgency);
    li.append("; ");
    li.appendChild(reason);
    li.append(";");
    li.appendChild(cancel);

    reflist.appendChild(li);

    //Cancel appointments via user input
    cancel.addEventListener('click', (evt) => {
        evt.stopPropagation();
        let aptID = evt.target.parentElement.getAttribute('data-id');
        db.collection('refferals').doc(aptID).delete();

        db.collection('refferals').doc(aptID).delete().then(ref => {
            console.log("User new: ", user);
            let docGet = db.collection('users').doc(String(user.uid)).get().then(doc => {
                let apptsArr = doc.data()['refferals'];
                console.log(apptsArr);
                if (apptsArr) {
                    let indx = apptsArr.indexOf(aptID);
                    if (indx > -1) {
                        apptsArr.splice(indx, 1);
                        db.collection('users').doc(String(user.uid)).update({ refferals: apptsArr });
                    }
                }
            }).catch(err => {
                console.log("Error: ", err);
            });
        }).catch(err => {
            console.log("Error: ", err);
        });
    });
}

function onSubmitRefferal(user, evt) {
    evt.preventDefault();
    
    db.collection('refferals').add({
        type: form.apptype.value,
        urgency: form.urgency.value,
        reason: form.reason.value,
        user: user.uid
    }).then(ref => {
        let docGet = db.collection('users').doc(String(user.uid)).get().then(doc => {
            let apptsArr = doc.data()['refferals'] ? doc.data()['refferals'] : [];
            console.log(apptsArr);
            apptsArr.unshift(ref.id);
            db.collection('users').doc(String(user.uid)).update({ refferals: apptsArr });
        }).catch(err => {
            console.log("Error: ", err);
        });
    }).catch(err => {
        console.log("Error: ", err);
    });

    form.reason.value = '';
}

function handleSignedInUser(user) {
    console.log("user: ", firebase.auth().currentUser);
    form.addEventListener('submit', function (evt) { onSubmitAppointment(user, evt) });

    db.collection('users').doc(String(user.uid)).onSnapshot(function (doc) {
        console.log("UsrDoc: ", doc);
        let usrApts = doc.data()['refferals'];
        console.log("User Apts: ", usrApts);

        reflist.innerHTML = '';
        if (usrApts) {
            usrApts.forEach(function (apt, idx) {
                if (idx < 12) {
                    db.collection('refferals').doc(apt).get().then(apt => {
                        console.log("aptDoc: ", apt);
                        displayApp(user, apt);
                    }).catch(err => {
                        console.log("Error: ", err);
                    });
                }
            });
        }
    });
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

function runPage() {

}

function initPage() {
    signOutButton_span.addEventListener('click', function() {firebase.auth().signOut()});
}


window.addEventListener('load', initPage);

const signOutButton_span = document.getElementById('sign-out-button');