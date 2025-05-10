import React from 'react';
import { PlusCircle, Calendar, Edit, Trash } from 'lucide-react';
import {getUserEmail, getUserInfo} from "../utilities/helper.js";

const Dashboard = () => {
    return (
        <div>
            {/* Dashboard Heading */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-semibold">Welcome to Your Dashboard</h1>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-blue-700">
                    <PlusCircle className="text-white" />
                    <span>Create Event</span>
                </button>
            </div>

            {/* User Profile Section */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
                <div className="space-y-2">
                    <p><strong>User Name:</strong> {getUserInfo()}</p>
                    <p><strong>Email:</strong> {getUserEmail()}</p>
                </div>
            </div>

            {/* Your Events Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Your Events</h2>

                {/* Event List */}
                <div className="space-y-4">
                    {/* Event Item */}
                    <div className="flex justify-between items-center bg-gray-100 p-4 rounded-md">
                        <div>
                            <h3 className="font-semibold">Event Name</h3>
                            <p className="text-sm text-gray-500">Date: 25th May 2025</p>
                        </div>
                        <div className="flex space-x-4">
                            <button className="text-blue-600 hover:text-blue-700">
                                <Edit className="text-lg" />
                            </button>
                            <button className="text-red-600 hover:text-red-700">
                                <Trash className="text-lg" />
                            </button>
                        </div>
                    </div>

                    {/* Another Event Item (for demo) */}
                    <div className="flex justify-between items-center bg-gray-100 p-4 rounded-md">
                        <div>
                            <h3 className="font-semibold">Another Event</h3>
                            <p className="text-sm text-gray-500">Date: 30th May 2025</p>
                        </div>
                        <div className="flex space-x-4">
                            <button className="text-blue-600 hover:text-blue-700">
                                <Edit className="text-lg" />
                            </button>
                            <button className="text-red-600 hover:text-red-700">
                                <Trash className="text-lg" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;