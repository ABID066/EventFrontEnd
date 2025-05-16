import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, ArrowLeft, User, Share2, Heart, Ticket } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { getToken, ErrorToast, SuccessToast } from '../utilities/helper.js';

const EventDetails = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [liked, setLiked] = useState(false);

    // Fetch event details
    useEffect(() => {
        const fetchEventDetails = async () => {
            const BaseURL = "https://event-back-end.vercel.app/api";
            const URL = `${BaseURL}/events/${eventId}`;

            try {
                setLoading(true);
                const res = await axios.get(URL, {
                    headers: { "Authorization": getToken() }
                });

                if (res.status === 200) {
                    setEvent(res.data.event);
                    setError(null);
                }
            } catch (err) {
                setError('Failed to fetch event details: ' + (err.response?.data?.message || err.message));
                ErrorToast("Failed to load event details");
                console.error('Error fetching event details:', err);
            } finally {
                setLoading(false);
            }
        };

        if (eventId) {
            fetchEventDetails();
        }
    }, [eventId]);

    // Format date function
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
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

    // Handle like button click
    const handleLikeClick = () => {
        setLiked(!liked);
        if (!liked) {
            SuccessToast("Event added to favorites");
        } else {
            SuccessToast("Event removed from favorites");
        }
    };

    // Handle share button click
    const handleShareClick = () => {
        // Copy the current URL to clipboard
        navigator.clipboard.writeText(window.location.href);
        SuccessToast("Event link copied to clipboard");
    };

    // Handle booking button click
    const handleBookTickets = () => {
        // Placeholder for booking functionality
        SuccessToast("Booking functionality will be implemented soon!");
    };

    // Render based on loading/error state
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error || !event) {
        return (
            <div className="container mx-auto p-4">
                <div className="bg-red-100 text-red-700 p-4 rounded">
                    {error || "Event not found"}
                </div>
                <Link to="/" className="flex items-center text-blue-600 hover:text-blue-800 mt-4">
                    <ArrowLeft size={20} className="mr-2" />
                    Back to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            {/* Back button */}
            <Link to="/" className="flex items-center text-blue-600 hover:text-blue-800 mb-8">
                <ArrowLeft size={20} className="mr-2" />
                Back to All Events
            </Link>

            {/* Event header */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
                {/* Event image */}
                <div className="h-64 md:h-96 bg-gray-200 relative">
                    <img
                        src={`/api/placeholder/800/400?text=${encodeURIComponent(event.name)}`}
                        alt={event.name}
                        className="w-full h-full object-cover"
                    />
                    <div className={`absolute top-6 right-6 px-4 py-2 rounded-full ${getCategoryColor(event.category)}`}>
                        {event.category}
                    </div>
                </div>

                {/* Event details */}
                <div className="p-6 md:p-8">
                    <div className="flex flex-wrap justify-between items-start">
                        <div className="w-full md:w-3/4">
                            <h1 className="text-3xl md:text-4xl font-bold mb-4">{event.name}</h1>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div className="flex items-center text-gray-700">
                                    <Calendar size={20} className="mr-3" />
                                    <div>
                                        <p className="font-medium">Date</p>
                                        <p>{formatDate(event.date)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <Clock size={20} className="mr-3" />
                                    <div>
                                        <p className="font-medium">Time</p>
                                        <p>{event.time}</p>
                                    </div>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <MapPin size={20} className="mr-3" />
                                    <div>
                                        <p className="font-medium">Location</p>
                                        <p>{event.location}</p>
                                    </div>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <User size={20} className="mr-3" />
                                    <div>
                                        <p className="font-medium">Organizer</p>
                                        <p>{event.organizer || "Event Organizer"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/4 flex flex-col items-center md:items-end mt-4 md:mt-0">
                            <div className="flex space-x-4 mb-6">
                                <button
                                    onClick={handleLikeClick}
                                    className={`flex items-center justify-center h-10 w-10 rounded-full border ${liked ? 'bg-red-50 border-red-300 text-red-500' : 'bg-gray-50 border-gray-300 text-gray-500'} hover:bg-gray-100`}
                                >
                                    <Heart size={20} fill={liked ? "#ef4444" : "none"} />
                                </button>
                                <button
                                    onClick={handleShareClick}
                                    className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-50 border border-gray-300 text-gray-500 hover:bg-gray-100"
                                >
                                    <Share2 size={20} />
                                </button>
                            </div>
                            <div className="w-full">
                                <button
                                    onClick={handleBookTickets}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center"
                                >
                                    <Ticket className="mr-2" size={20} />
                                    Book Tickets
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Event description */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
                        <h2 className="text-2xl font-bold mb-4">About This Event</h2>
                        <div className="prose max-w-none">
                            <p className="text-gray-700 whitespace-pre-line">{event.description}</p>
                        </div>
                    </div>
                </div>

                {/* Event sidebar */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 sticky top-8">
                        <h2 className="text-xl font-bold mb-4">Event Details</h2>

                        {/* Event price */}
                        <div className="mb-6">
                            <h3 className="font-medium text-gray-500 mb-1">Price</h3>
                            <p className="text-2xl font-bold">{event.price ? `$${event.price}` : 'Free'}</p>
                        </div>

                        {/* Ticket availability */}
                        <div className="mb-6">
                            <h3 className="font-medium text-gray-500 mb-1">Availability</h3>
                            <div className="flex items-center">
                                <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-green-500 rounded-full"
                                        style={{ width: '65%' }}
                                    ></div>
                                </div>
                                <span className="ml-2 text-sm text-gray-600">65%</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">Tickets are selling fast!</p>
                        </div>

                        {/* CTA button */}
                        <button
                            onClick={handleBookTickets}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg mb-4"
                        >
                            Book Now
                        </button>

                        {/* Additional info */}
                        <div className="text-sm text-gray-500">
                            <p>* Booking fees may apply</p>
                            <p>* All sales are final</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;