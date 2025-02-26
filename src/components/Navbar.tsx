import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Menu, X } from 'lucide-react';
import Search from './Search';
import NavbarDesktop from './navbar/NavbarDesktop';
import NavbarMobile from './navbar/NavbarMobile';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <div className="flex items-center space-x-8">
                        <Link to="/">
                            <Home className="h-8 w-8 text-blue-600" />
                        </Link>
                    </div>

                    {/* Recherche */}
                    <div className="flex-1 px-4">
                        <Search className="w-full" />
                    </div>

                    {/* Navigation Desktop */}
                    <NavbarDesktop />

                    {/* Bouton Menu Mobile */}
                    <button
                        className="sm:hidden text-gray-700 focus:outline-none"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Navigation Mobile */}
                {isOpen && <NavbarMobile onClose={() => setIsOpen(false)} />}
            </div>
        </nav>
    );
};

export default Navbar;
