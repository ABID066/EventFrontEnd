import toast from "react-hot-toast";

class helper {
    setToken(token){
        localStorage.setItem('token', token);
    }
    setUserInfo(username){
        localStorage.setItem('username', username);
    }
    setUserEmail(email){
        localStorage.setItem('email', email);
    }
    getUserInfo(){
        return localStorage.getItem('username');
    }
    getUserEmail(){
        return localStorage.getItem('email');
    }
    getToken(){
        return localStorage.getItem('token');
    }

    ErrorToast(msg) {
        toast.error(msg, {position: "bottom-center"});
    }

    SuccessToast(msg) {
        toast.success(msg, {position: "bottom-center"});
    }
}


export const {
    ErrorToast,
    SuccessToast,
    setToken,
    getToken,
    setUserInfo,
    getUserInfo,
    setUserEmail,
    getUserEmail
} = new helper();