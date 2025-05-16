import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Clock, MapPin, Type, FileText, Tag, Loader } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { getToken, ErrorToast, SuccessToast } from '../utilities/helper.js';

const UpdateEvent = () => {
    const navigate = useNavigate();
    const { eventId } = useParams();
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        date: '',
        time: '',
        location: '',
        description: '',
        category: ''
    });

    // Available categories
    const categories = [
        'Technology',
        'Music',
        'Food & Drink',
        'Sports',
        'Art',
        'Business',
        'Education',
        'Health',
        'Social'
    ];

    // Fetch event details
    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                setFetchLoading(true);
                const BaseURL = "https://event-back-end.vercel.app/api";
                const response = await axios.get(
                    `${BaseURL}/events/${eventId}`,
                    {
                        headers: { "Authorization": getToken() }
                    }
                );

                if (response.status === 200) {
                    const event = response.data.event;

                    // Format date to YYYY-MM-DD for input
                    const dateObj = new Date(event.date);
                    const formattedDate = dateObj.toISOString().split('T')[0];

                    setFormData({
                        name: event.name || '',
                        date: formattedDate || '',
                        time: event.time || '',
                        location: event.location || '',
                        description: event.description || '',
                        category: event.category || 'Technology'
                    });
                    setError(null);
                }
            } catch (err) {
                console.error("Error fetching event details:", err);
                setError("Failed to load event details. Please try again.");
                ErrorToast("Failed to load event details");
            } finally {
                setFetchLoading(false);
            }
        };

        if (eventId) {
            fetchEventDetails();
        }
    }, [eventId]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Form validation
        if (!formData.name || !formData.date || !formData.time || !formData.location || !formData.description || !formData.category) {
            ErrorToast("Please fill in all required fields");
            return;
        }

        try {
            setLoading(true);
            const BaseURL = "https://event-back-end.vercel.app/api";
            const response = await axios.put(
                `${BaseURL}/events/${eventId}`,
                formData,
                {
                    headers: {
                        "Authorization": getToken(),
                        "Content-Type": "application/json"
                    }
                }
            );

            if (response.status === 200) {
                SuccessToast("Event updated successfully!");
                // Redirect to dashboard
                navigate('/dashboard');
            }
        } catch (error) {
            console.error("Error updating event:", error);
            ErrorToast(error.response?.data?.message || "Failed to update event");
        } finally {
            setLoading(false);
        }
    };

    // Display loading state while fetching data
    if (fetchLoading) {
        return (
            <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-screen">
                <div className="flex flex-col items-center">
                    <Loader size={40} className="animate-spin text-blue-600 mb-4" />
                    <p className="text-gray-600">Loading event details...</p>
                </div>
            </div>
        );
    }

    // Display error state
    if (error) {
        return (
            <div className="container mx-auto px-4 py-12">
                <Link to="/dashboard" className="flex items-center text-blue-600 hover:text-blue-800 mb-8">
                    <ArrowLeft size={20} className="mr-2" />
                    Back to Dashboard
                </Link>

                <div className="max-w-3xl mx-auto bg-red-50 text-red-700 p-6 rounded-lg">
                    <h2 className="text-xl font-bold mb-2">Error</h2>
                    <p>{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            {/* Back button */}
            <Link to="/dashboard" className="flex items-center text-blue-600 hover:text-blue-800 mb-8">
                <ArrowLeft size={20} className="mr-2" />
                Back to Dashboard
            </Link>

            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-bold mb-6">Update Event</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Event Name */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                            <div className="flex items-center">
                                <Type size={18} className="mr-2" />
                                Event Name <span className="text-red-500">*</span>
                            </div>
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter event name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    {/* Date & Time */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2" htmlFor="date">
                                <div className="flex items-center">
                                    <Calendar size={18} className="mr-2" />
                                    Event Date <span className="text-red-500">*</span>
                                </div>
                            </label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2" htmlFor="time">
                                <div className="flex items-center">
                                    <Clock size={18} className="mr-2" />
                                    Event Time <span className="text-red-500">*</span>
                                </div>
                            </label>
                            <input
                                type="time"
                                id="time"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="location">
                            <div className="flex items-center">
                                <MapPin size={18} className="mr-2" />
                                Location <span className="text-red-500">*</span>
                            </div>
                        </label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Enter event location"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="category">
                            <div className="flex items-center">
                                <Tag size={18} className="mr-2" />
                                Category <span className="text-red-500">*</span>
                            </div>
                        </label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            required
                        >
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="description">
                            <div className="flex items-center">
                                <FileText size={18} className="mr-2" />
                                Description <span className="text-red-500">*</span>
                            </div>
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter event description"
                            rows="6"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            required
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <Loader size={20} className="animate-spin mr-2" />
                                    Updating Event...
                                </div>
                            ) : 'Update Event'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateEvent;