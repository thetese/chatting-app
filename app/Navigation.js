import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/navigation.css';

/**
 * Navigation Component
 * Main navigation sidebar
 */
const Navigation = ({ currentUser, onLogout }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      onLogout();
    }
  };

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/explore', label: 'Explore', icon: '🔍' },
    { path: '/create', label: 'Create', icon: '✏️' },
    { path: '/messages', label: 'Messages', icon: '💬' },
    { path: '/activity', label: 'Activity', icon: '🔔' },
    { path: `/profile/${currentUser?.id}`, label: 'Profile', icon: '👤' }
  ];

  return (
    <nav className="navigation">
      <div className="nav-container">
        {/* Logo */}
        <div className="nav-logo">
          <h2>SocialHub</h2>
        </div>

        {/* Mobile Toggle */}
        <button
          className="mobile-toggle"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          ☰
        </button>

        {/* Nav Items */}
        <div className={`nav-items ${isMobileOpen ? 'mobile-open' : ''}`}>
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className="nav-item"
              onClick={() => setIsMobileOpen(false)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </div>

        {/* User Menu */}
        <div className="nav-user">
          <img
            src={currentUser?.profileImage || '/default-avatar.png'}
            alt={currentUser?.username}
            className="nav-user-avatar"
            title={currentUser?.fullName}
          />
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
