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
    <header className="bg-[var(--bg-secondary)] border-b border-[var(--border-color)] px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <input 
            type="text" 
            placeholder="Search here..." 
            className="w-80 px-4 py-2 rounded-lg border border-[var(--border-color)] focus:outline-none focus:ring-2 focus:ring-purple-200 text-sm"
          />
        </div>
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 rounded-lg text-sm font-medium text-[var(--primary-color)] bg-purple-50 hover:bg-purple-100 transition-colors border border-purple-200">
            Admin Management
          </button>
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors relative"
            >
              <span className="icon-bell text-lg text-[var(--text-secondary)]"></span>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {unreadCount}
                </span>
              )}
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-[var(--border-color)] py-2 z-50">
                <div className="px-4 py-2 border-b border-[var(--border-color)]">
                  <h3 className="font-semibold text-sm">Notifications</h3>
                </div>
                {notifications.map(notification => (
                  <div key={notification.id} className={`px-4 py-3 border-b border-gray-100 last:border-b-0 ${notification.read ? 'bg-gray-50' : 'bg-white'}`}>
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
                          className="ml-2 text-xs text-[var(--primary-color)] hover:underline"
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
          <button className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors">
            <span className="icon-mail text-lg text-[var(--text-secondary)]"></span>
          </button>
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center hover:shadow-lg transition-all"
            >
              <span className="text-white text-sm font-bold">A</span>
            </button>
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-[var(--border-color)] py-4 z-50">
                <div className="px-4 pb-3 border-b border-[var(--border-color)]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">A</span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Admin User</p>
                      <p className="text-xs text-[var(--text-secondary)]">admin@hospital.com</p>
                    </div>
                  </div>
                </div>
                <div className="pt-2">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-[var(--text-primary)] hover:bg-gray-50 transition-colors"
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
