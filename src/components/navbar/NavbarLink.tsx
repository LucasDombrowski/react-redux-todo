import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarLinkProps {
    to: string;
    label: string;
    icon?: React.ReactNode;
    badge?: number;
    onClick?: () => void;
}

const NavbarLink: React.FC<NavbarLinkProps> = ({ to, label, icon, badge, onClick }) => {
    const location = useLocation();
    const isActive = location.pathname === to ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-600';

    return (
        <Link to={to} className={`relative transition-all inline-flex items-center px-1 pt-1 text-sm font-medium ${isActive}`} onClick={onClick}>
            {icon && icon}
            {label}
            {(badge && badge > 0) &&
                <span className="absolute top-0 right-0 -translate-y-1/2 translate-x-3/4 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {badge}
                </span>
            }
        </Link>
    );
};

export default NavbarLink;
