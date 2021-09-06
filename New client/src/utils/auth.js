import decode from 'jwt-decode'

class AuthService {
    getProfile() {
        return decode(this.getToken())
    }

    loggedIn() {
        const token = this.getToken()
        return token && !this.isExpired(token) ? true : false
    }

    isExpired(token) {
        const decoded = decode(token)
        if (decoded.exp < Date.now() / 1000) {
            localStorage.removeItem('id_token')
            return true
        }
        return false
    }

    getToken() {
        return localStorage.getItem('id_token')
    }

    login(idToken) {
        localStorage.setItem('id_token', idToken)
    }

    logout() {
        localStorage.removeItem('id_token')
        window.location.reload()
    }
}

export default new AuthService()