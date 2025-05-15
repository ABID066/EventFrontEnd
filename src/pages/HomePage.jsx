import React from 'react';
import Dashboard from "../components/Dashboard.jsx";
import MasterLayout from "../components/masterLayout/MasterLayout.jsx";
import FirstHome from "../components/FirstHome.jsx";

const HomePage = () => {
    return (
        <MasterLayout>
            <FirstHome/>
        </MasterLayout>
    );
};

export default HomePage;