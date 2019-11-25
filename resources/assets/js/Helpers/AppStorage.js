class AppStorage {

    storeToken(token) {

        localStorage.setItem('token', token);
    }

    storeUser(user) {

        localStorage.setItem('user', user);
    }

    store(token, user) {

        this.storeToken(token);
        this.storeUser(user);
    }

    clear() {

        localStorage.removeItem('user', user);
        localStorage.removeItem('token', token);
    }


    getUser() {

        localStorage.getItem('user');

    }

    getToken() {

        localStorage.getItem('token');
    }
}

export default AppStorage = new AppStorage;