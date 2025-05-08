import React, {Fragment} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import Page404 from "./pages/Page404.jsx";
import RegistrationPage from "./pages/RegistrationPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";



const App = () => {
    return (
        <Fragment>
            <BrowserRouter>
                <Routes>

                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/registration" element={<RegistrationPage />} />
                    <Route path="/" element={<DashboardPage />} />




                    <Route path="*" element={<Page404/>} />
                </Routes>
            </BrowserRouter>

        </Fragment>
    );
};

export default App;