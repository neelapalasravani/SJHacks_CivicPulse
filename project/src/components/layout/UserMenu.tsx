import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LogOut, UserCircle, Settings, BarChart } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface UserMenuProps {
  closeMenu: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ closeMenu }) => {
  const { logout, user } = useAuth();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeMenu]);

  return (
    <div
      ref={menuRef}
      className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg py-2 z-50 animate-fade-in"
    >
      <div className="px-4 py-3 border-b border-gray-100">
        <p className="text-sm font-medium text-gray-900">{user?.name}</p>
        <p className="text-xs text-gray-500 mt-1">{user?.email}</p>
      </div>
      
      <Link
        to="/dashboard"
        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
        onClick={closeMenu}
      >
        <UserCircle className="h-4 w-4 mr-3 text-gray-500" />
        My Dashboard
      </Link>
      
      {user?.role === 'admin' && (
        <Link
          to="/admin"
          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
          onClick={closeMenu}
        >
          <BarChart className="h-4 w-4 mr-3 text-gray-500" />
          Admin Dashboard
        </Link>
      )}
      
      <Link
        to="#"
        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
        onClick={closeMenu}
      >
        <Settings className="h-4 w-4 mr-3 text-gray-500" />
        Settings
      </Link>
      
      <div className="border-t border-gray-100 mt-2">
        <button
          className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
          onClick={() => {
            logout();
            closeMenu();
          }}
        >
          <LogOut className="h-4 w-4 mr-3 text-gray-500" />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserMenu;