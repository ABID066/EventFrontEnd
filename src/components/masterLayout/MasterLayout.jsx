import React from 'react';
import Header from './Header';
import Footer from './Footer';

const MasterLayout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <Header />

            {/* Main Content */}
            <main className="flex-grow container mx-auto p-6">
                {children}
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default MasterLayout;
