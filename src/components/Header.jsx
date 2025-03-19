import React, { useState } from 'react';
import { BellIcon, EnvelopeIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Dummy data - replace with actual user data
  const user = {
    name: 'Mahardika Agung Prabowo',
    avatar: 'https://via.placeholder.com/40',
    notifications: 3,
    messages: 2
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = () => {
    // Implement logout logic here
    console.log('Logging out...');
  };

  return (
    <header className="bg-header-bg dark:bg-header-bg shadow-md z-50 fixed top-0 left-64 right-0">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* App Name */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-gray-800 dark:text-dark-text"></h1>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button
              className="relative p-2 text-grey-500 dark:text-grey-400 hover:text-grey-600 dark:hover:text-grey-300 transition-colors"
              aria-label="Notifications"
            >
              <BellIcon className="h-6 w-6" />
              {user.notifications > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  {user.notifications}
                </span>
              )}
            </button>

            {/* Messages */}
            <button
              className="relative p-2 text-grey-500 dark:text-grey-400 hover:text-grey-600 dark:hover:text-grey-300 transition-colors"
              aria-label="Messages"
            >
              <EnvelopeIcon className="h-6 w-6" />
              {user.messages > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  {user.messages}
                </span>
              )}
            </button>

            {/* User Profile */}
            <div className="relative">
              <button
                className="flex items-center space-x-3 focus:outline-none"
                onClick={toggleProfile}
                aria-expanded={isProfileOpen}
                aria-haspopup="true"
              >
                <img
                  src={user.avatar}
                  alt="User avatar"
                  className="h-8 w-8 rounded-full object-cover"
                />
                <span className="text-grey-800 dark:text-grey">{user.name}</span>
                <ChevronDownIcon className={`h-5 w-5 text-grey-600 dark:text-grey-400 transition-transform ${isProfileOpen ? 'transform rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-dark-card ring-1 ring-[#E9F1FA] ring-opacity-5 focus:outline-none">
                  <a
                    href="/profile"
                    className="block px-4 py-2 text-sm text-grey-700 dark:text-grey-200 hover:bg-grey-100 dark:hover:bg-dark-border"
                    role="menuitem"
                  >
                    Profil
                  </a>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-grey-700 dark:text-grey-200 hover:bg-grey-100 dark:hover:bg-dark-border"
                    role="menuitem"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;