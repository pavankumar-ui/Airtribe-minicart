export default function isUserAuth() {
    const isAuth = localStorage.getItem('Customer');

    if (!isAuth || isAuth !== 'user Authenticated') {
        return false;
    }
    return true;
}


