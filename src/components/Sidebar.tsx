"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
}

export default function Sidebar({}: SidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: 'layout-dashboard', href: '/' },
    { id: 'doctors', label: 'Doctor Verification', icon: 'user-check', href: '/doctors' },
    { id: 'appointments', label: 'Appointments', icon: 'calendar', href: '/appointments' },
    { id: 'queue', label: 'Patient Queue', icon: 'users', href: '/queue' },
    { id: 'profile', label: 'Profile', icon: 'user', href: '/profile' }
  ];

  return (
    <aside className="w-[var(--sidebar-width)] bg-[var(--bg-secondary)] border-r border-[var(--border-color)] flex flex-col shadow-lg">
      <div className="p-5 bg-gradient-to-br from-purple-200 via-purple-200 to-purple-200 m-4 rounded-xl shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
            <div className="icon-hospital text-xl text-gray-700"></div>
          </div>
          <div>
            <h2 className="font-bold text-base text-gray-700">Parirenyatwa</h2>
            <p className="text-xs text-gray-700">Admin Portal</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 mt-2">
        {menuItems.map(item => (
          <Link
            key={item.id}
            href={item.href}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg mb-1 transition-all ${
              pathname === item.href
                ? 'text-white shadow-lg transform scale-105'
                : 'text-[var(--text-secondary)] hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:text-[var(--primary-color)]'
            }`}
            style={pathname === item.href ? {
              background: 'linear-gradient(135deg, #9333EA 0%, #7C3AED 100%)'
            } : {}}
          >
            <div className={`icon-${item.icon} text-lg`}></div>
            <span className="font-medium text-sm">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-[var(--border-color)] bg-gradient-to-r from-gray-50 to-purple-50">
        <p className="text-xs text-[var(--text-secondary)] text-center">© 2025 Parirenyatwa Hospital</p>
      </div>
    </aside>
  );
}
