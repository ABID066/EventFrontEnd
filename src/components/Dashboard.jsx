import React, { useEffect, useState } from 'react';
import { PlusCircle, Calendar, Edit, Trash, Loader } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserEmail, getUserInfo, getToken, SuccessToast, ErrorToast } from "../utilities/helper.js";
import { ShowAllEvent } from "../APIRequest/APIRequest.jsx";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const events = useSelector((state) => state.event.All);
    const [loading, setLoading] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        fetchEvents();
    }, [dispatch]);

    // Function to fetch all events
    const fetchEvents = async () => {
        try {
            setLoading(true);
            await ShowAllEvent(dispatch); // Pass dispatch to store data
        } catch (err) {
            console.error('Error fetching events:', err);
            ErrorToast("Failed to load events");
        } finally {
            setLoading(false);
        }
    };

    // Function to delete an event
    const handleDeleteEvent = async (eventId) => {
        if (window.confirm("Are you sure you want to delete this event?")) {
            try {
                setDeletingId(eventId);
                const BaseURL = "https://event-back-end.vercel.app/api";
                const response = await axios.delete(
                    `${BaseURL}/events/${eventId}`,
                    {
                        headers: { "Authorization": getToken() }
                    }
                );

                if (response.status === 200) {
                    SuccessToast("Event deleted successfully");
                    // Refresh events list
                    fetchEvents();
                }
            } catch (error) {
                console.error("Error deleting event:", error);
                ErrorToast(error.response?.data?.message || "Failed to delete event");
            } finally {
                setDeletingId(null);
            }
        }
    };

    // Function to navigate to update page
    const handleEditEvent = (eventId) => {
        navigate(`/update-event/${eventId}`);
    };

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

                {loading && events.length === 0 ? (
                    <div className="flex justify-center items-center py-12">
                        <Loader size={30} className="animate-spin text-blue-600" />
                    </div>
                ) : (
                    /* Event List */
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
                                                <p className="text-gray-600 mt-2 line-clamp-2">{item.description}</p>
                                            )}
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleEditEvent(item._id)}
                                                className="flex items-center justify-center p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                                title="Edit Event"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteEvent(item._id)}
                                                className="flex items-center justify-center p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                                title="Delete Event"
                                                disabled={deletingId === item._id}
                                            >
                                                {deletingId === item._id ? (
                                                    <Loader size={18} className="animate-spin" />
                                                ) : (
                                                    <Trash size={18} />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center py-8">No events found. Create your first event!</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;