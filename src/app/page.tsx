'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import StatsCard from '../components/StatsCard';
import { listDoctors, listAppointments, listPatientQueue } from '../utils/database';

export default function Dashboard() {
  const [stats, setStats] = useState({
    pendingDoctors: 0,
    verifiedDoctors: 0,
    todayAppointments: 0,
    patientsInQueue: 0
  });

  const [doctors, setDoctors] = useState<any[]>([]);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const doctorsData = await listDoctors();
    const appointments = await listAppointments();
    const queue = await listPatientQueue();

    const uniqueSpecialties = new Set(doctorsData.map((d: any) => d.objectData.specialty));
    const totalDepartments = uniqueSpecialties.size;

    setDoctors(doctorsData);
    setStats({
      pendingDoctors: doctorsData.filter((d: any) => d.objectData.status === 'pending').length,
      verifiedDoctors: doctorsData.filter((d: any) => d.objectData.status === 'verified').length,
      todayAppointments: totalDepartments,
      patientsInQueue: totalDepartments
    });
  };

  const recentDoctors = doctors.slice(0, 4);

  return (
    <DashboardLayout>
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Admin Management Dashboard</h1>
          <p className="text-sm text-[var(--text-secondary)]">Comprehensive overview of users, roles, and system administration</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard 
            title="Total Doctors" 
            value={stats.verifiedDoctors + stats.pendingDoctors} 
            subtitle={`${stats.verifiedDoctors} verified doctors`}
            icon="users" 
            variant="gradient"
          />
          <StatsCard 
            title="Patient in Queue" 
            value={stats.verifiedDoctors + stats.pendingDoctors} 
            subtitle="Across all departments"
            icon="shield-check" 
            variant="white"
          />
          <StatsCard 
            title="Departments" 
            value={stats.todayAppointments} 
            subtitle="With assigned roles"
            icon="building" 
            variant="gradient"
          />
          <StatsCard 
            title="System Activity" 
            value={stats.patientsInQueue} 
            subtitle="Active departments"
            icon="activity" 
            variant="white"
          />
        </div>

        {/* Doctors by Department & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="icon-users text-lg"></span>
                <h2 className="text-lg font-semibold">Doctors by Department</h2>
              </div>
              <a href="/doctors" className="text-sm text-[var(--text-secondary)] hover:text-[var(--primary-color)]">
                View All Doctors
              </a>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Cardiology</p>
                  <p className="text-xs text-[var(--text-secondary)]">1 unique role</p>
                </div>
                <span className="text-sm text-[var(--primary-color)] font-medium">1 doctor</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Pediatrics</p>
                  <p className="text-xs text-[var(--text-secondary)]">1 unique role</p>
                </div>
                <span className="text-sm text-[var(--primary-color)] font-medium">1 doctor</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Orthopedics</p>
                  <p className="text-xs text-[var(--text-secondary)]">1 unique role</p>
                </div>
                <span className="text-sm text-[var(--primary-color)] font-medium">1 doctor</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Emergency</p>
                  <p className="text-xs text-[var(--text-secondary)]">0 unique roles</p>
                </div>
                <span className="text-sm text-[var(--primary-color)] font-medium">0 doctors</span>
              </div>
            </div>
          </div>

          <div className="card bg-gray-50">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <a href="/doctors" className="flex items-center gap-3 p-3 bg-white rounded-lg hover:shadow-md transition-shadow">
                <span className="icon-users text-lg text-[var(--text-secondary)]"></span>
                <span className="text-sm font-medium">Manage Doctors</span>
              </a>
              <a href="/appointments" className="flex items-center gap-3 p-3 bg-white rounded-lg hover:shadow-md transition-shadow">
                <span className="icon-calendar text-lg text-[var(--text-secondary)]"></span>
                <span className="text-sm font-medium">View Appointments</span>
              </a>
              <a href="/queue" className="flex items-center gap-3 p-3 bg-white rounded-lg hover:shadow-md transition-shadow">
                <span className="icon-building text-lg text-[var(--text-secondary)]"></span>
                <span className="text-sm font-medium">Patient Queue</span>
              </a>
            </div>
          </div>
        </div>

        {/* Recent Doctors & System Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <span className="icon-users text-lg"></span>
              <h2 className="text-lg font-semibold">Recent Doctors</h2>
            </div>
            <div className="space-y-4">
              {recentDoctors.map((doctor) => (
                <div key={doctor.objectId} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {doctor.objectData.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">{doctor.objectData.name}</p>
                      <p className="text-xs text-[var(--text-secondary)]">{doctor.objectData.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{doctor.objectData.specialty}</p>
                    <p className="text-xs text-[var(--text-secondary)] capitalize">{doctor.objectData.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h2 className="text-lg font-semibold mb-4">Upcoming Appointments</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium">Alice Kudya</p>
                  <p className="text-xs text-[var(--text-secondary)]">Cardiology • Dr. Sarah Moyo</p>
                </div>
                <span className="text-sm font-medium">10:00 AM</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium">Bob Tenda</p>
                  <p className="text-xs text-[var(--text-secondary)]">Pediatrics • Dr. Tendai Ndlovu</p>
                </div>
                <span className="text-sm font-medium">2:30 PM</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium">Carol Moyo</p>
                  <p className="text-xs text-[var(--text-secondary)]">Orthopedics • Dr. Rumbidzai Chitiyo</p>
                </div>
                <span className="text-sm font-medium">9:00 AM</span>
              </div>
            </div>
            <div className="mt-4">
              <a href="/appointments" className="text-sm text-[var(--primary-color)] hover:underline">
                View all appointments →
              </a>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
