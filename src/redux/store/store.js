import {configureStore} from "@reduxjs/toolkit";
import eventReducer from "../state-slice/event-slice.js";

export default configureStore({
    reducer: {
        event: eventReducer
    }
});