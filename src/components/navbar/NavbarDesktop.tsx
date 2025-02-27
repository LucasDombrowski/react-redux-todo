import React from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import NavbarLink from './NavbarLink';

const NavbarDesktop = () => {
    const cartTotal = useSelector((state: RootState) =>
        state.cart.items.reduce((total, item) => total + (item.quantity ?? 0), 0)
    );
    const wishlistTotal = useSelector((state: RootState) => state.wishlist.items.length);

    return (
        <div className="hidden sm:flex space-x-8 items-center">
            <NavbarLink to="/" label="Accueil" />
            <NavbarLink to="/cart" label="Panier" icon={<ShoppingCart className="w-5 h-5 mr-1" />} badge={cartTotal > 0 ? cartTotal : undefined} />
            <NavbarLink to="/wishlist" label="Wishlist" icon={<Heart className="w-5 h-5 mr-1" />} badge={wishlistTotal > 0 ? wishlistTotal : undefined} />
        </div>
    );
};

export default NavbarDesktop;
