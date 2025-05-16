import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getToken, ErrorToast } from '../utilities/helper.js';

const CategoryEvents = () => {
    const { category } = useParams();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch events by category
    useEffect(() => {
        const fetchEventsByCategory = async () => {
            const BaseURL = "https://event-back-end.vercel.app/api";
            const URL = `${BaseURL}/events/category/${category}`;

            try {
                setLoading(true);
                const res = await axios.get(URL, {
                    headers: { "Authorization": getToken() }
                });

                if (res.status === 200) {
                    setEvents(res.data.events);
                    setError(null);
                }
            } catch (err) {
                setError('Failed to fetch events: ' + (err.response?.data?.message || err.message));
                ErrorToast("Failed to load events");
                console.error('Error fetching events by category:', err);
            } finally {
                setLoading(false);
            }
        };

        if (category) {
            fetchEventsByCategory();
        }
    }, [category]);

    // Format date function
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    // Get background color for category badge
    const getCategoryColor = (category) => {
        const colorMap = {
            'Music': 'bg-purple-100 text-purple-800',
            'Technology': 'bg-blue-100 text-blue-800',
            'Food & Drink': 'bg-yellow-100 text-yellow-800',
            'Sports': 'bg-green-100 text-green-800',
            'Art': 'bg-pink-100 text-pink-800'
        };
        return colorMap[category] || 'bg-gray-100 text-gray-800';
    };

    // Render based on loading/error state
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto p-4">
                <div className="bg-red-100 text-red-700 p-4 rounded">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-8">
                <Link to="/" className="flex items-center text-blue-600 hover:text-blue-800 mb-4">
                    <ArrowLeft size={20} className="mr-2" />
                    Back to Home
                </Link>
                <h1 className="text-3xl font-bold">{category} Events</h1>
                <p className="text-gray-600 mt-2">
                    Showing {events.length} {events.length === 1 ? 'event' : 'events'} in {category} category
                </p>
            </div>

            {events.length === 0 ? (
                <div className="text-center py-16 bg-gray-50 rounded-lg">
                    <h3 className="text-xl font-medium text-gray-600 mb-4">No events found in this category</h3>
                    <Link
                        to="/"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg"
                    >
                        Return to Homepage
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map((event) => (
                        <div key={event._id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1">
                            <div className="h-48 bg-gray-200 relative">
                                <img
                                    src={`/api/placeholder/400/300?text=${encodeURIComponent(event.category)}`}
                                    alt={event.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full ${getCategoryColor(event.category)}`}>
                                    {event.category}
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="font-bold text-xl mb-2">{event.name}</h3>
                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center text-gray-600">
                                        <Calendar size={16} className="mr-2" />
                                        {formatDate(event.date)}
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <Clock size={16} className="mr-2" />
                                        {event.time}
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <MapPin size={16} className="mr-2" />
                                        {event.location}
                                    </div>
                                </div>
                                <p className="text-gray-600 line-clamp-2 mb-4">{event.description}</p>
                                <Link
                                    to={`/events/${event._id}`}
                                    className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoryEvents;