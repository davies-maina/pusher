import User from './User';
class Exception {

    handle(error) {
        this.isExpired(error.response.data)

    }

    isExpired() {

        if (error == 'Token is invalid') {
            User.logout()
        }
    }
}

export default Exception = new Exception()