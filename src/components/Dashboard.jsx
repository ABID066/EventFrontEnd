// src/components/FirstHome.js

import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ShowAllEvent } from "../APIRequest/APIRequest.jsx";
import { Calendar, MapPin, Clock, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FirstHome = () => {
    // Redux dispatch
    const dispatch = useDispatch();

    // Get events from Redux store
    const { All: events, loading, error } = useSelector((state) => state.event);

    const [categories, setCategories] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

    // Sample banner images
    const bannerImages = [
        "../assets/banner1.jpeg",
        "../assets/banner2.jpeg",
        "../assets/banner2.jpeg"
    ];

    useEffect(() => {
        dispatch(ShowAllEvent());
        const bannerInterval = setInterval(() => {
            setCurrentBannerIndex(prev => (prev + 1) % bannerImages.length);
        }, 5000);

        return () => clearInterval(bannerInterval);
    }, [dispatch]);

    // Filter upcoming events (events with dates after today)
    useEffect(() => {
        const today = new Date();
        const upcoming = events.filter(event => new Date(event.date) > today);
        upcoming.sort((a, b) => new Date(a.date) - new Date(b.date));
        setUpcomingEvents(upcoming);

        // Extract unique categories
        const uniqueCategories = [...new Set(events.map(event => event.category))];
        setCategories(uniqueCategories);
    }, [events]);

    // Function to format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    // Get background color for category badge based on category name
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
        <div className="min-h-screen">
            {/* Banner Section with Carousel */}
            <div className="relative h-96 overflow-hidden">
                {bannerImages.map((image, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ${index === currentBannerIndex ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <img
                            src={image}
                            alt={`Banner ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white px-4 text-center">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Amazing Events</h1>
                            <p className="text-xl mb-8 max-w-2xl">Find and book tickets for concerts, conferences, workshops, and more!</p>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg">
                                Explore Events
                            </button>
                        </div>
                    </div>
                ))}

                {/* Carousel indicators */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                    {bannerImages.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentBannerIndex(index)}
                            className={`w-3 h-3 rounded-full ${index === currentBannerIndex ? 'bg-white' : 'bg-white bg-opacity-50'}`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12">
                {/* Upcoming Events Section */}
                <div className="mb-16">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-bold">Upcoming Events</h2>
                        <Link to="/events" className="text-blue-600 hover:text-blue-800 flex items-center">
                            View all events <ChevronRight size={20}/>
                        </Link>
                    </div>

                    {upcomingEvents.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            No upcoming events found.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {upcomingEvents.slice(0, 6).map((event) => (
                                <div key={event._id}
                                     className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1">
                                    
                                    <div className="p-6">
                                        <h3 className="font-bold text-xl mb-2">{event.name}</h3>
                                        <div className="space-y-2 mb-4">
                                            <div className="flex items-center text-gray-600">
                                                <Calendar size={16} className="mr-2"/>
                                                {formatDate(event.date)}
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <Clock size={16} className="mr-2"/>
                                                {event.time}
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <MapPin size={16} className="mr-2"/>
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

                {/* Categories Section */}
                <div>
                    <h2 className="text-3xl font-bold mb-8">Browse by Category</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {categories.map((category) => {
                            const count = events.filter(event => event.category === category).length;

                            return (
                                <Link
                                    key={category}
                                    to={`/events/category/${category}`}
                                    className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center text-center hover:shadow-lg transition-shadow group"
                                >
                                    <div
                                        className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mb-4 ${getCategoryColor(category)}`}>
                                        {category.charAt(0).toUpperCase()}
                                    </div>
                                    <h3 className="font-semibold text-lg mb-1">{category}</h3>
                                    <p className="text-gray-500 mb-3">{count} {count === 1 ? 'Event' : 'Events'}</p>
                                    <div
                                        className="text-blue-600 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        Explore <ArrowRight size={16} className="ml-1"/>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FirstHome;
