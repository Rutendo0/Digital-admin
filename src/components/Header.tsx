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
    // For now, just reload the page or redirect to login
    window.location.href = '/';
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="bg-(--bg-secondary) border-b border-(--border-color) px-8 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm text-(--text-secondary)">Welcome back,</h2>
          <h1 className="text-xl font-bold">Admin</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors relative"
            >
              <span className="text-xl text-(--text-secondary)">🔔</span>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-(--border-color) py-2 z-50">
                <div className="px-4 py-2 border-b border-(--border-color)">
                  <h3 className="font-semibold text-sm">Notifications</h3>
                </div>
                {notifications.map(notification => (
                  <div key={notification.id} className={`px-4 py-3 border-b border-gray-100 last:border-b-0 ${notification.read ? 'bg-gray-50' : 'bg-white'}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className={`text-sm ${notification.read ? 'text-(--text-secondary)' : 'text-(--text-primary) font-medium'}`}>
                          {notification.message}
                        </p>
                        <p className="text-xs text-(--text-secondary) mt-1">{notification.time}</p>
                      </div>
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="ml-2 text-xs text-(--primary-color) hover:underline"
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
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="w-10 h-10 rounded-lg bg-(--primary-color) flex items-center justify-center hover:opacity-90 transition-colors"
            >
              <span className="text-xl text-white">👤</span>
            </button>
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-(--border-color) py-4 z-50">
                <div className="px-4 pb-3 border-b border-(--border-color)">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-(--primary-color) flex items-center justify-center">
                      <span className="text-white font-bold">A</span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Admin User</p>
                      <p className="text-xs text-(--text-secondary)">admin@hospital.com</p>
                    </div>
                  </div>
                </div>
                <div className="pt-2">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-(--text-primary) hover:bg-gray-50 transition-colors"
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