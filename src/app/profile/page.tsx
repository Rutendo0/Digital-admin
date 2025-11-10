'use client';

import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@hospital.com',
    phone: '+263 123 456 789',
    role: 'System Administrator'
  });

  const handleSave = () => {
    // In a real app, this would save to the backend
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset to original values if cancelled
    setProfile({
      name: 'Admin User',
      email: 'admin@hospital.com',
      phone: '+263 123 456 789',
      role: 'System Administrator'
    });
    setIsEditing(false);
  };

  return (
    <DashboardLayout>
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Admin Profile</h1>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-primary"
            >
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="btn btn-secondary"
              >
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="btn btn-outline"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-[var(--primary-color)] flex items-center justify-center">
                  <img
                    src="https://news.northeastern.edu/wp-content/uploads/2022/06/060622_MM_Caleb_Gayle_008.jpg?w=1024"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({...profile, name: e.target.value})}
                      className="text-lg font-semibold border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    <h3 className="text-lg font-semibold">{profile.name}</h3>
                  )}
                  <p className="text-[var(--text-secondary)]">{profile.role}</p>
                </div>
              </div>
              <div className="grid gap-4">
                <div>
                  <label className="text-sm font-medium text-[var(--text-secondary)]">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({...profile, name: e.target.value})}
                      className="text-lg border rounded px-2 py-1 w-full mt-1"
                    />
                  ) : (
                    <p className="text-lg">{profile.name}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-[var(--text-secondary)]">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                      className="text-lg border rounded px-2 py-1 w-full mt-1"
                    />
                  ) : (
                    <p className="text-lg">{profile.email}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-[var(--text-secondary)]">Phone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({...profile, phone: e.target.value})}
                      className="text-lg border rounded px-2 py-1 w-full mt-1"
                    />
                  ) : (
                    <p className="text-lg">{profile.phone}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-[var(--text-secondary)]">Role</label>
                  <p className="text-lg">{profile.role}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-[var(--text-secondary)]">Last Login</label>
                <p className="text-lg">Today, 10:30 AM</p>
              </div>
              <div>
                <label className="text-sm font-medium text-[var(--text-secondary)]">Account Status</label>
                <span className="badge badge-verified">Active</span>
              </div>
              <div>
                <label className="text-sm font-medium text-[var(--text-secondary)]">Permissions</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="badge badge-active">Doctor Management</span>
                  <span className="badge badge-active">Appointment Management</span>
                  <span className="badge badge-active">Patient Queue</span>
                  <span className="badge badge-active">System Admin</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card mt-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-[var(--primary-color)] rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Verified doctor registration</p>
                <p className="text-xs text-[var(--text-secondary)]">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-[var(--secondary-color)] rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Updated patient queue</p>
                <p className="text-xs text-[var(--text-secondary)]">4 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-[var(--accent-color)] rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Scheduled appointment review</p>
                <p className="text-xs text-[var(--text-secondary)]">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}