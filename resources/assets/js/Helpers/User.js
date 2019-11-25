import Token from './Token';
import AppStorage from './AppStorage';
class User {

    login(formData) {

        axios.post('api/auth/login', formData)
            .then((response) => {

                /* Token.payload(response.data.access_token); */

                this.responseAfterLogin(response)

            })

        .catch((error) => {

            console.log(error.response.data);
        })
    }

    responseAfterLogin(response) {

        const access_token = response.data.access_token;
        const username = response.data.user
        if (Token.tokenValidity) {

            AppStorage.store(username, access_token);
        }

    }

    hasToken() {

        const storedToken = AppStorage.getToken();

        if (storedToken) {
            return Token.tokenValidity(storedToken) ? true : false;
        }

        return false;
    }


    loggedIn() {

        return this.hasToken();
    }

    logOut() {

        AppStorage.clear();
    }

    name() {

        if (this.loggedIn()) {
            return AppStorage.getUser();
        }
    }

    id() {

        if (this.loggedIn()) {

            const payload = Token.payload(AppStorage.getToken());

            return payload.sub;
        }
    }

}

export default User = new User;