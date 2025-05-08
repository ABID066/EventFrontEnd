import toast from "react-hot-toast";

class helper {
    setToken(token){
        localStorage.setItem('token', token);
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
    getToken
} = new helper();