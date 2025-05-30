import React, { Fragment } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import Page404 from "./pages/Page404.jsx";
import RegistrationPage from "./pages/RegistrationPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import { getToken } from "./utilities/helper.js";
import HomePage from "./pages/HomePage.jsx";
import CategoryEventsPage from "./pages/CategoryEventsPage.jsx";
import EventDetailsPage from "./pages/EventDetailsPage.jsx";
import CreateEventPage from "./pages/CreateEventPage.jsx";
import UpdateEventPage from "./pages/UpdateEventPage.jsx";


const ProtectedRoute = ({ children }) => {
    return getToken() ? children : <Navigate to="/login" replace />;
};

const App = () => {
    return (
        <Fragment>
            <BrowserRouter>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/registration" element={<RegistrationPage />} />

                    {/* Protected Routes */}
                    <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                    <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                    <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />

                    <Route path="/events/category/:category" element={<ProtectedRoute><CategoryEventsPage /></ProtectedRoute>} />
                    <Route path="/events/:eventId" element={<ProtectedRoute><EventDetailsPage /></ProtectedRoute>} />


                    <Route path="/create-event" element={<ProtectedRoute><CreateEventPage /></ProtectedRoute>} />
                    <Route path="/update-event/:eventId" element={<ProtectedRoute><UpdateEventPage /></ProtectedRoute>} />

                    {/*Catch-all Route for 404
                    <Route path="*" element={<Page404 />} />*/}
                </Routes>
            </BrowserRouter>
        </Fragment>
    );
};

export default App;
