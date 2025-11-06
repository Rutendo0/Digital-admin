"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  // No props needed since we'll use routing
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
    <aside className="w-[var(--sidebar-width)] bg-[var(--bg-secondary)] border-r border-[var(--border-color)] flex flex-col">
      <div className="p-6 border-b border-[var(--border-color)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[var(--primary-color)] flex items-center justify-center">
            <div className="icon-hospital text-xl text-white"></div>
          </div>
          <div>
            <h2 className="font-bold text-lg">Parirenyatwa</h2>
            <p className="text-xs text-[var(--text-secondary)]">Admin Portal</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        {menuItems.map(item => (
          <Link
            key={item.id}
            href={item.href}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
              pathname === item.href
                ? 'bg-[var(--primary-color)] text-white'
                : 'text-[var(--text-secondary)] hover:bg-gray-50'
            }`}
          >
            <div className={`icon-${item.icon} text-xl`}></div>
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-[var(--border-color)]">
        <p className="text-xs text-[var(--text-secondary)] text-center">© 2025 Parirenyatwa Hospital</p>
      </div>
    </aside>
  );
}