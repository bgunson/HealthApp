const applist = document.querySelector('#appointment-list');
const form = document.querySelector('#add-appointment-form');
const db = firebase.firestore();

//create element and display appointments
function displayApp(doc){
    let li = document.createElement('li');
    let doctor = document.createElement('span');
    let date = document.createElement('span');
    let time = document.createElement('span');
    let cancel = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    doctor.textContent = doc.data().doctor;
    date.textContent = doc.data().date;
    time.textContent = doc.data().time;
    cancel.textContent = 'Cancel';
    
    li.appendChild(doctor);
    li.appendChild(date);
    li.appendChild(time);
    li.appendChild(cancel);

    applist.appendChild(li);
    
    cancel.addEventListener('click', (evt) => {
        evt.stopPropagation();
        let id = evt.target.parentElement.getAttribute('data-id');
        db.collection('appointments').doc(id).delete();
    });
}

//getting data
db.collection('appointments').get().then((snapshot) => {
    console.log(snapshot.docs);
    snapshot.docs.forEach(doc => {
        console.log(doc.data());
        displayApp(doc);
    })
});

//saving data
form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    db.collection('appointments').add({
        doctor: form.doctor.value,
        date: form.date.value,
        time: form.time.value
    });
    form.doctor.value = '';
    form.date.value = '';
    form.time.value = '';
});
