const applist = document.querySelector('#appointment-list');
const form = document.querySelector('#add-appointment-form');
const db = firebase.firestore();

//create element and display appointments
function displayApp(doc){
    let li = document.createElement('li');
    let doctor = document.createElement('span');
    let date = document.createElement('span');
    let time = document.createElement('span');

    li.setAttribute('data-id', doc.id);
    doctor.textContent = doc.data().doctor;
    date.textContent = doc.data().date;
    time.textContent = doc.data().time;
    
    li.appendChild(doctor);
    li.appendChild(date);
    li.appendChild(time);

    applist.appendChild(li);
}


function onSubmitAppointment(evt) {
    evt.preventDefault();

    let user = firebase.auth().currentUser;

    db.collection('appointments').add({
        doctor : form.doctor.value,
        date : form.date.value,
        time : form.time.value,
        patient : user.uid
    }).then(ref => {
        let docGet = db.collection('users').doc(String(user.uid)).get().then(doc => {
            let jsonApts = doc['appointments'] ? doc['appointments'] : {};
            jsonApts[ref.id] = true;
            db.collection('users').doc(String(user.uid)).update({appointmentss : jsonApts});
        }).catch(err => {
            // Error who cares?
        });
    });

    form.doctor.value = '';
    form.date.value = '';
    form.time.value = '';
}

//getting data
// db.collection('appointments').get().then((snapshot) => {
//     console.log(snapshot.docs);
//     snapshot.docs.forEach(doc => {
//         console.log(doc.data());
//         displayApp(doc);
//     })
// });

//saving data


firebase.auth().signInWithEmailAndPassword(firebase.auth().currentUser.email, '123456').then(function () {
    // What ever we need to do after login in user
}).catch(function (error) {
    let errorCode = error.code;
    let errorMessage = error.message;
    console.log("Error: ", error);
});

console.log(firebase.auth().currentUser);

form.addEventListener('submit', function (evt) {onSubmitAppointment(evt)});
