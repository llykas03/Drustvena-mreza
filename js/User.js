class User {
    user_id = '';
    username = '';
    email = '';
    password = '';
    api_url = 'https://62fc0e97e4bcaf5351917d3e.mockapi.io';

    create() {
        //Pravimo objekat User
        let data = {
            username: this.username,
            email: this.email,
            password: this.password
        }

        //pretvaramo data u JSON
        data = JSON.stringify(data);
        console.log(data)

        //saljemo serveru ali samo JSON podatke
        fetch(this.api_url + '/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        })
            .then(response => response.json())
            .then(data => {
                let session = new Session();
                session.user_id = data.id;
                session.startSession();
                window.location.href = 'hexa.html';
            })
    }

    get(user_id) {
        let api_url = this.api_url + '/user/' + user_id;

        fetch(api_url)
            .then(response => response.json())
            .then(data => {
                document.querySelector('#username').innerHTML = data['username'];
                document.querySelector('#email').innerHTML = data['email'];

                document.querySelector('#editUsrn').value = data['username'];
                document.querySelector('#editEmail').value = data['email'];
            })
    }

    edit() {
        let data = {
            username: this.username,
            email: this.email
        };

        data = JSON.stringify(data);

        let session = new Session();
        session_id = session.getSesion();

        fetch(this.api_url + '/user/' + session_id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        })
            .then(response => response.json())
            .then(data => {
                window.location.href = 'hexa.html';
            })

    }

    login() {
        fetch(this.api_url + '/user')
            .then(response => response.json())
            .then(data => {

                let loginSucsess = 0;
                data.forEach(db_user => {
                    if (db_user.email === this.email && db_user.password === this.password) {

                        let session = new Session();
                        session.user_id = db_user.id;
                        session.startSession();
                        loginSucsess = 1;
                        window.location.href = 'hexa.html';
                    }
                });

                if (loginSucsess === 0) {
                    alert('Pogresan email ili lozinka!!!');
                }
            });

    }

    delete() {
        let session = new Session();
        session_id = session.getSesion();

        fetch(this.api_url + '/user/' + session_id, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                let session = new Session();
                session.destroySession();

                window.location.href = "/";
            });
    }
}