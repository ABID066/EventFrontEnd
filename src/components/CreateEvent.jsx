import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, MapPin, Type, FileText, Tag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getToken, ErrorToast, SuccessToast } from '../utilities/helper.js';

const CreateEvent = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        date: '',
        time: '',
        location: '',
        description: '',
        category: 'Technology' // Default category
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
            const response = await axios.post(
                `${BaseURL}/events`,
                formData,
                {
                    headers: {
                        "Authorization": getToken(),
                        "Content-Type": "application/json"
                    }
                }
            );

            if (response.status === 201) {
                SuccessToast("Event created successfully!");
                // Redirect to dashboard
                navigate('/dashboard');
            }
        } catch (error) {
            console.error("Error creating event:", error);
            ErrorToast(error.response?.data?.message || "Failed to create event");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-12">
            {/* Back button */}
            <Link to="/dashboard" className="flex items-center text-blue-600 hover:text-blue-800 mb-8">
                <ArrowLeft size={20} className="mr-2" />
                Back to Dashboard
            </Link>

            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-bold mb-6">Create New Event</h1>

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
                            {loading ? 'Creating Event...' : 'Create Event'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateEvent;