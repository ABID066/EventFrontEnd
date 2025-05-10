import React, {Fragment} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import Page404 from "./pages/Page404.jsx";
import RegistrationPage from "./pages/RegistrationPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import {getToken} from "./utilities/helper.js";

const ProtectedRoute = ({ children }) => {
    return getToken() ? children : <Navigate to="/login" replace />;
};

const App = () => {
    return (
        <Fragment>
            <BrowserRouter>
                <Routes>

                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/registration" element={<RegistrationPage />} />



                    <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />






                    <Route path="*" element={<Page404/>} />
                </Routes>
            </BrowserRouter>

        </Fragment>
    );
};

export default App;