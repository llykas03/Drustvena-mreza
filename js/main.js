let session = new Session();
session = session.getSesion();

if (session != "") {
    window.location.href = 'hexa.html';
}


// modal

document.querySelector('#registracija').addEventListener('click', () => {
    document.querySelector('.custom-modal').style.display = 'block';
});
document.querySelector('#clodeModal').addEventListener('click', () => {
    document.querySelector('.custom-modal').style.display = 'none';
});

// singup form

let config = {
    'korisnickoIme': {
        required: true,
        minlength: 5,
        maxlength: 50
    },
    'registerEmail': {
        required: true,
        email: true,
        minlength: 5,
        maxlength: 50
    },
    'registerLozinka': {
        required: true,
        minlength: 7,
        maxlength: 25,
        matching: 'ponoviLozinku'
    },
    'ponoviLozinku': {
        required: true,
        minlength: 7,
        maxlength: 25,
        matching: 'registerLozinka'
    },
};

let validator = new Validator(config, '#registrationForm');

document.querySelector('#registrationForm').addEventListener('submit', e => {
    e.preventDefault();

    if (validator.validationPassed()) {
        let user = new User();
        user.username = document.querySelector('#username').value;
        user.email = document.querySelector('#reginEmail').value;
        user.password = document.querySelector('#reginPassword').value;
        user.create();
    } else {
        alert('Polja nisu dobro popunjena');
    }
});

// login form

document.querySelector('#loginForm').addEventListener('submit', e => {
    //let btn = document.querySelector('#btn');
    //btn.preventDefault();
    e.preventDefault();

    let email = document.querySelector('#loginEmail').value;
    let password = document.querySelector('#loginPassword').value;

    let user = new User();
    user.email = email;
    user.password = password;
    user.login();

});
// 123456789  1:09:00 