import axios from "axios";
import {ErrorToast, getToken, setToken, setUserEmail, setUserInfo, SuccessToast} from "../utilities/helper.js";
import store from "../redux/store/store.js";
import {SetAll} from "../redux/state-slice/event-slice.js";


const BaseURL = "https://event-back-end.vercel.app/api";

const AxiHeaders = () => ({
    headers: {"Authorization": getToken()}
});


// Registration
export async function RegistrationRequest(username, email, password) {

    let URL = BaseURL + "/auth/register";
    let PostBody = {username, email, password};

    try {

        const res = await axios.post(URL, PostBody);

        if (res.status === 201) {
            if (res.data.message === "User registered successfully") {
                setToken(res.data["token"]);
                setUserInfo(res.data["user"]["username"]);
                setUserEmail(res.data["user"]["email"]);
                SuccessToast("Registration Success");
                return true;
            }
        }
    } catch (err) {

            if (err.data.message === "User already exists") {
                ErrorToast("Email Already Exists!");
                return false;
            }
        
        else {
        ErrorToast("Something Went Wrong");
        console.error("Registration Error:", err);
        return false;
        }
    }
}

// Login
export async function LoginRequest(email, password) {


    let URL = BaseURL + "/auth/login";
    let PostBody = { email, password };

    try {
        let res = await axios.post(URL, PostBody);

        if (res.status === 200) {
            if (res.data.message === "Login successful") {
            setToken(res.data["token"]);
            setUserInfo(res.data["user"]["username"]);
            setUserEmail(res.data["user"]["email"]);
            SuccessToast("Login Success");
            return true;
            }
        }
    } catch (err) {
        ErrorToast("Invalid Email or Password"); // More specific error
        console.error("Login Error:", err);
        return false;
    }
}


// Updated ShowAllEvent
export async function ShowAllEvent(dispatch) {
    let URL = BaseURL + "/events";
    try {
        let res = await axios.get(URL, AxiHeaders());
        if (res.status === 200) {
            dispatch(SetAll(res.data.events)); // Dispatch data to Redux
            console.log(res.data.events); // Debugging API response
        }
    } catch (err) {
        console.log(err);
        ErrorToast("Something Went Wrong");
    }
}
