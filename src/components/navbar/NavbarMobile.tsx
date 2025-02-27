import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import NavbarLink from './NavbarLink';

interface NavbarMobileProps {
    onClose: () => void;
}

const NavbarMobile: React.FC<NavbarMobileProps> = ({ onClose }) => {
    const cartTotal = useSelector((state: RootState) =>
        state.cart.items.reduce((total, item) => total + (item.quantity ?? 0), 0)
    );
    const wishlistTotal = useSelector((state: RootState) => state.wishlist.items.length);

    return (
        <div className="sm:hidden bg-white shadow-md rounded-lg mt-2 p-4">
            <div className="flex flex-col space-y-2">
                <NavbarLink to="/" label="Accueil" onClick={onClose} />
                <NavbarLink to="/cart" label="Panier" icon={<ShoppingCart className="w-5 h-5 inline mr-1" />} badge={cartTotal > 0 ? cartTotal : undefined} onClick={onClose} />
                <NavbarLink to="/wishlist" label="Wishlist" icon={<Heart className="w-5 h-5 inline mr-1" />} badge={wishlistTotal > 0 ? cartTotal : undefined} onClick={onClose} />
            </div>
        </div>
    );
};

export default NavbarMobile;
