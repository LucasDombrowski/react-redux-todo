import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { ShoppingCart, Heart, Home, Menu, X } from 'lucide-react';
import Search from './Search';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const cartTotal = useSelector((state: RootState) =>
        state.cart.items.reduce((total, item) => total + (item.quantity ?? 0), 0)
    );
    const wishlistTotal = useSelector((state: RootState) => state.wishlist.items.length);

    const isActive = (path: string) =>
        location.pathname === path ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-600';

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

                    {/* Recherche Disponible sur Desktop et Mobile */}
                    <div className="flex-1 px-4">
                        <Search className="w-full" />
                    </div>

                    {/* Navigation Desktop */}
                    <div className="hidden sm:flex space-x-8 items-center">
                        <Link to="/" className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${isActive('/')}`}>
                            Accueil
                        </Link>
                        <Link to="/cart" className={`relative inline-flex items-center px-1 pt-1 text-sm font-medium ${isActive('/cart')}`}>
                            <ShoppingCart className="w-5 h-5 mr-1" />
                            Panier
                            {cartTotal > 0 && (
                                <span className="absolute top-0 right-0 -translate-y-1/2 translate-x-3/4 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                    {cartTotal}
                                </span>
                            )}
                        </Link>
                        <Link to="/wishlist" className={`relative inline-flex items-center px-1 pt-1 text-sm font-medium ${isActive('/wishlist')}`}>
                            <Heart className="w-5 h-5 mr-1" />
                            Wishlist
                            {wishlistTotal > 0 && (
                                <span className="absolute top-0 right-0 -translate-y-1/2 translate-x-3/4 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                    {wishlistTotal}
                                </span>
                            )}
                        </Link>
                    </div>

                    {/* Bouton Menu Mobile */}
                    <button
                        className="sm:hidden text-gray-700 focus:outline-none"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Menu Mobile */}
                {isOpen && (
                    <div className="sm:hidden bg-white shadow-md rounded-lg mt-2 p-4">
                        <div className="flex flex-col space-y-2">
                            <Link
                                to="/"
                                className={`block px-3 py-2 text-base font-medium ${isActive('/')}`}
                                onClick={() => setIsOpen(false)}
                            >
                                Accueil
                            </Link>
                            <Link
                                to="/cart"
                                className={`relative block px-3 py-2 text-base font-medium ${isActive('/cart')}`}
                                onClick={() => setIsOpen(false)}
                            >
                                <ShoppingCart className="w-5 h-5 inline mr-1" /> Panier
                                {cartTotal > 0 && (
                                    <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                        {cartTotal}
                                    </span>
                                )}
                            </Link>
                            <Link
                                to="/wishlist"
                                className={`relative block px-3 py-2 text-base font-medium ${isActive('/wishlist')}`}
                                onClick={() => setIsOpen(false)}
                            >
                                <Heart className="w-5 h-5 inline mr-1" /> Wishlist
                                {wishlistTotal > 0 && (
                                    <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                        {wishlistTotal}
                                    </span>
                                )}
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
