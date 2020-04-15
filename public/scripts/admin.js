// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: 'AIzaSyB2j1bGOOC9pWCy7YlNcyVmmI29PMQyBR4',
    authDomain: 'health-app-502a4.firebaseapp.com',
    projectId: 'health-app-502a4'
});

var db = firebase.firestore();


$(document).ready(function () {
    //Enable all popovers
    $('[data-toggle="popover"]').popover();
});

function showModalAdd() {
    //Hiding the popover so it does not get in the way of the modal
    $('.remove-popover').popover('dispose');
    //Show the modal and clear values
    $('.add-modal').modal('show');
    document.querySelector('.name-input').value = '';
    document.querySelector('.email-input').value = '';
}

function showModalRemove() {
    //Hiding the popover so it does not get in the way of the modal
    $('.remove-popover').popover('dispose');
    //Show the modal and clear values
    $('.remove-modal').modal('show');
    document.querySelector('.email-input-remove').value = '';
}

function inviteClicked() {
    //Check if valid name and email
    if (document.querySelector('.name-input').value == '' || !document.querySelector('.email-input').value.includes('.') || !document.querySelector('.email-input').value.includes('@')) {
        //Name or email invalid
        //alert('Please enter a valid name and email.');
    } else {
        //Valid name and email, send invite
        $('.invite-button').popover('dispose');
        $('.add-modal').modal('hide');
        //Enable the popover becasue disposing of it disables it
        $('.invite-button').popover('enable');

        //Send email via elastic mail and SMTP.js

        Email.send({
            SecureToken: "8e9e8139-1e26-4380-920d-1bb449dc46af",
            To: document.querySelector('.email-input').value,
            From: "questionbox17@gmail.com",
            Subject: "Healthpump Invitation!",
            Body: "Hello " + document.querySelector('.name-input').value + ", <br><br>You are receiving this message because you have been invited to check out HealthPump. HealthPump makes it easier to manage patients and appointments. <br><br>Head over to https://healthpump.firebaseapp.com/ to create an account today! <br><br>- The HealthPump Team"
        }).then(
            //message => alert(message)
        );
    }
}

//Removes the user given the email
function removeClicked() {
    $('.remove-button').popover('dispose');
    $('.remove-modal').modal('hide');
    //Enable the popover becasue disposing of it disables it
    $('.remove-button').popover('enable');

    //Delete user from users users firebase collection
    db.collection("users").where("email", "==", document.querySelector('.email-input-remove').value)
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                db.collection("users").doc(doc.id).delete();
                console.log(doc.id, " => ", doc.data());
            });
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });
}