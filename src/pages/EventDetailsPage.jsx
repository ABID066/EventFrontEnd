import React from 'react';
import MasterLayout from "../components/masterLayout/MasterLayout.jsx";
import EventDetails from "../components/EventDetails.jsx";

const EventDetailsPage = () => {
    return (
        <MasterLayout>
            <EventDetails />
        </MasterLayout>
    );
};

export default EventDetailsPage;