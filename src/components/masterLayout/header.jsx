import React from 'react';
import { Link } from 'react-router-dom';
import { User, LogOut } from 'lucide-react'; // Importing Lucide icons

const Header = () => {
    return (
        <header className="bg-blue-600 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo and Brand */}
                <div className="text-xl font-bold">
                    <Link to="/">EventFinder</Link>
                </div>

                {/* Navigation Links */}
                <nav className="flex space-x-6">
                    <Link to="/dashboard" className="hover:text-gray-300">
                        Dashboard
                    </Link>
                    <Link to="/events" className="hover:text-gray-300">
                        Events
                    </Link>
                    <Link to="/profile" className="hover:text-gray-300">
                        Profile
                    </Link>
                </nav>

                {/* User Profile & Logout */}
                <div className="flex items-center space-x-4">
                    <User className="text-xl cursor-pointer" />
                    <LogOut
                        className="text-xl cursor-pointer"
                        onClick={() => alert("Logout functionality here")}
                    />
                </div>
            </div>
        </header>
    );
};

export default Header;
