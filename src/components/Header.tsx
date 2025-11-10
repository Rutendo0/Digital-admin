'use client';

import { useState } from 'react';

export default function Header() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New doctor registration pending', time: '5 min ago', read: false },
    { id: 2, message: 'Appointment scheduled for tomorrow', time: '1 hour ago', read: false },
    { id: 3, message: 'Patient queue updated', time: '2 hours ago', read: true }
  ]);

  const handleLogout = () => {
    window.location.href = '/';
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="bg-[var(--bg-secondary)] border-b border-[var(--border-color)] px-8 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search doctors, appointments, patients..."
            className="w-96 px-4 py-2.5 rounded-lg border border-[var(--border-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] text-sm bg-gradient-to-r from-purple-50 to-blue-50 placeholder:text-[var(--text-secondary)]"
          />
        </div>
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 rounded-lg text-sm font-medium text-[var(--primary-color)] bg-gradient-to-r from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100 transition-all duration-200 border border-[var(--primary-color)]/20 shadow-sm">
            Admin Management
          </button>
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center hover:from-purple-100 hover:to-blue-100 transition-all duration-200 relative shadow-sm"
            >
              <span className="icon-bell text-lg text-[var(--primary-color)]"></span>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium shadow-lg animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-[var(--border-color)] py-2 z-50 backdrop-blur-sm bg-white/95">
                <div className="px-4 py-2 border-b border-[var(--border-color)] bg-gradient-to-r from-purple-50 to-blue-50">
                  <h3 className="font-semibold text-sm text-[var(--text-primary)]">Notifications</h3>
                </div>
                {notifications.map(notification => (
                  <div key={notification.id} className={`px-4 py-3 border-b border-gray-100 last:border-b-0 transition-colors ${notification.read ? 'bg-gray-50' : 'bg-gradient-to-r from-purple-25 to-blue-25'}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className={`text-sm ${notification.read ? 'text-[var(--text-secondary)]' : 'text-[var(--text-primary)] font-medium'}`}>
                          {notification.message}
                        </p>
                        <p className="text-xs text-[var(--text-secondary)] mt-1">{notification.time}</p>
                      </div>
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="ml-2 text-xs text-[var(--primary-color)] hover:underline hover:text-[var(--primary-light)] transition-colors"
                        >
                          Mark read
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <button className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center hover:from-blue-100 hover:to-purple-100 transition-all duration-200 shadow-sm">
            <span className="icon-mail text-lg text-[var(--primary-color)]"></span>
          </button>
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="w-10 h-10 rounded-full overflow-hidden hover:shadow-xl transition-all duration-200 shadow-lg"
            >
              <img
                src="https://news.northeastern.edu/wp-content/uploads/2022/06/060622_MM_Caleb_Gayle_008.jpg?w=1024"
                alt="Admin Profile"
                className="w-full h-full object-cover"
              />
            </button>
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-[var(--border-color)] py-4 z-50 backdrop-blur-sm bg-white/95">
                <div className="px-4 pb-3 border-b border-[var(--border-color)] bg-gradient-to-r from-purple-50 to-blue-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden shadow-md">
                      <img
                        src="https://news.northeastern.edu/wp-content/uploads/2022/06/060622_MM_Caleb_Gayle_008.jpg?w=1024"
                        alt="Admin Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-[var(--text-primary)]">Admin User</p>
                      <p className="text-xs text-[var(--text-secondary)]">admin@hospital.com</p>
                    </div>
                  </div>
                </div>
                <div className="pt-2">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-[var(--text-primary)] hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 transition-all duration-200"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
