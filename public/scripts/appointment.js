const applist = document.getElementById('appointment-list');
const form = document.querySelector('#add-appointment-form');
const db = firebase.firestore();

//create element and display appointments
function displayApp(user, doc) {
    let li = document.createElement('li');
    let doctor = document.createElement('span');
    let datetime = document.createElement('span');
    let cancel = document.createElement('div');
    cancel.setAttribute('class', 'btn btn-secondary');

    li.setAttribute('data-id', doc.id);
    console.log("aptdoc2: ", doc.data());
    doctor.textContent = doc.data().doctor;
    datetime.textContent = doc.data().datetime;
    cancel.textContent = 'Cancel Appointment'

    li.appendChild(doctor);
    li.append('\t');
    li.appendChild(datetime);
    li.appendChild(cancel);

    applist.appendChild(li);

    //Cancel appointments via user input
    cancel.addEventListener('click', (evt) => {
        evt.stopPropagation();
        let aptID = evt.target.parentElement.getAttribute('data-id');
        db.collection('appointments').doc(aptID).delete();

        db.collection('appointments').doc(aptID).delete().then(ref => {
            console.log("User new: ", user);
            let docGet = db.collection('users').doc(String(user.uid)).get().then(doc => {
                let apptsArr = doc.data()['appointments'];
                console.log(apptsArr);
                if (apptsArr) {
                    let indx = apptsArr.indexOf(aptID);
                    if (indx > -1) {
                        apptsArr.splice(indx, 1);
                        db.collection('users').doc(String(user.uid)).update({ appointments: apptsArr });
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


function onSubmitAppointment(user, evt) {
    evt.preventDefault();
    
    db.collection('appointments').add({
        doctor: form.doctor.value,
        datetime: form.datetime.value,
        patient: user.uid
    }).then(ref => {
        let docGet = db.collection('users').doc(String(user.uid)).get().then(doc => {
            let apptsArr = doc.data()['appointments'] ? doc.data()['appointments'] : [];
            console.log(apptsArr);
            apptsArr.unshift(ref.id);
            db.collection('users').doc(String(user.uid)).update({ appointments: apptsArr });
        }).catch(err => {
            console.log("Error: ", err);
        });
    }).catch(err => {
        console.log("Error: ", err);
    });

    form.doctor.value = '';
    form.datetime.value = '';
}


function handleSignedInUser(user) {
    console.log("user: ", firebase.auth().currentUser);

    form.addEventListener('submit', function (evt) { onSubmitAppointment(user, evt) });

    db.collection('users').doc(String(user.uid)).onSnapshot(function (doc) {
        console.log("UsrDoc: ", doc);
        let usrApts = doc.data()['appointments'];
        console.log("User Apts: ", usrApts);

        applist.innerHTML = '';
        if (usrApts) {
            usrApts.forEach(function (apt, idx) {
                if (idx < 12) {
                    db.collection('appointments').doc(apt).get().then(apt => {
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


function initPage() {
    signOutButton_span.addEventListener('click', function () { firebase.auth().signOut() });
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

firebase.auth().onAuthStateChanged(function (user) {
    user ? handleSignedInUser(user) : handleSignedOutUser();
});


window.addEventListener('load', initPage);

const signOutButton_span = document.getElementById('sign-out-button');