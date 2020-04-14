const applist = document.getElementById('appointment-list');
const form = document.querySelector('#add-appointment-form');
const db = firebase.firestore();

//create element and display appointments
function displayApp(doc) {
    let li = document.createElement('li');
    let doctor = document.createElement('span');
    let date = document.createElement('span');
    let time = document.createElement('span');
    let cancel = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    doctor.textContent = doc.data().doctor;
    date.textContent = doc.data().date;
    time.textContent = doc.data().time;
    cancel.textContent = 'Cancel Appointment'

    li.appendChild(doctor);
    li.appendChild(date);
    li.appendChild(time);
    li.appendChild(cancel);

    applist.appendChild(li);

    //Cancel appointments via user input
    cancel.addEventListener('click', (evt) => {
        evt.stopPropagation();
        let id = evt.target.parentElement.getAttribute('data-id');
        db.collection('appointments').doc(id).delete();
    });
}


function onSubmitAppointment(evt) {
    evt.preventDefault();

    let user = firebase.auth().currentUser;

    db.collection('appointments').add({
        doctor: form.doctor.value,
        date: form.date.value,
        time: form.time.value,
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
    form.date.value = '';
    form.time.value = '';
}


function handleSignedInUser(user) {
    console.log("user: ", firebase.auth().currentUser);
    form.addEventListener('submit', function (evt) { onSubmitAppointment(evt) });
    db.collection('users').doc(String(user.uid)).onSnapshot(doc => {
        console.log("UsrDoc: ", doc);
        let usrApts = doc.data()['appointments'];
        console.log("User Apts: ", usrApts);

        usrApts.forEach(function (apt, idx) {
            if (idx < 12) {
                db.collection('appointments').doc(apt).get().then(apt => {
                    displayApp(apt);
                }).catch(err => {
                    console.log("Error: ", err);
                });
            }
        });
    });
}

function handleSignedOutUser() {
    window.location.assign("../index.html");
}


function initPage() {
    signOutButton_span.addEventListener('click', function() {firebase.auth().signOut()});
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
