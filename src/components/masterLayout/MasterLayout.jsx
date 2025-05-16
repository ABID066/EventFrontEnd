import React from 'react';

import {Link} from "react-router-dom";
import {LogOut} from "lucide-react";
import {removeSession} from "../../utilities/helper.js";

const MasterLayout = ({ children }) => {

    const onLogout=()=>{
        removeSession();
    }

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <header className="bg-blue-600 text-white p-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    {/* Logo and Brand */}
                    <div className="text-xl font-bold">
                        <Link to="/">EventFinder</Link>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex space-x-6">
                        <Link to="/home" className="hover:text-gray-300">
                            HomePage
                        </Link>
                        <Link to="/dashboard" className="hover:text-gray-300">
                            Dashboard
                        </Link>


                    </nav>

                    {/* User Profile & Logout */}
                    <div className="flex items-center space-x-4">

                        <LogOut
                            className="text-xl cursor-pointer"
                            onClick={onLogout}
                        />
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow container mx-auto p-6">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white p-4 mt-10">
                <div className="container mx-auto text-center">
                    <p>&copy; {new Date().getFullYear()} EventFinder. All rights reserved.</p>
                    <div className="flex justify-center space-x-4 mt-2">
                        <a href="#" className="hover:text-gray-400">Privacy Policy</a>
                        <a href="#" className="hover:text-gray-400">Terms & Conditions</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default MasterLayout;
