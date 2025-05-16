import React, { useEffect,  } from 'react';
import { PlusCircle, Calendar, Edit, Trash } from 'lucide-react';
import { getUserEmail, getUserInfo } from "../utilities/helper.js";
import { ShowAllEvent } from "../APIRequest/APIRequest.jsx";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const dispatch = useDispatch();
    const events = useSelector((state) => state.event.All);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                // Call the ShowAllEvent function
                await ShowAllEvent(dispatch); // Pass dispatch to store data
            } catch (err) {
                console.error('Error fetching events:', err);
            }
        };
        fetchEvents();
    }, [dispatch]);

    // Function to format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    return (
        <div className="container mx-auto p-6">
            {/* Dashboard Heading */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Welcome to Your Dashboard</h1>

                <Link to="/create-event" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                    <PlusCircle size={20} />
                    <span>Create Event</span>
                </Link>
            </div>

            {/* User Profile Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
                <div className="space-y-2">
                    <p className="text-gray-700">User Name: {getUserInfo()}</p>
                    <p className="text-gray-700">Email: {getUserEmail()}</p>
                </div>
            </div>

            {/* Your Events Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Your Events</h2>

                {/* Event List */}
                <div className="space-y-4">
                    {events.length > 0 ? (
                        events.map((item) => (
                            <div key={item._id} className="border rounded-lg p-4 hover:bg-gray-50">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-medium text-lg">{item.name}</h3>
                                        <p className="text-gray-600 flex items-center gap-1">
                                            <Calendar size={16} />
                                            Date: {formatDate(item.date)}
                                        </p>
                                        {item.location && (
                                            <p className="text-gray-600 mt-1">Location: {item.location}</p>
                                        )}
                                        {item.description && (
                                            <p className="text-gray-600 mt-2">{item.description}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No events found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
