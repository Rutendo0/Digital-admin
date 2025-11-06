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

  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    loadStats();
  }, []);

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const current = new Date(startDate);

    for (let i = 0; i < 42; i++) { // 6 weeks * 7 days
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return days;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const hasAppointment = (date: Date) => {
    // Mock: assume appointments on 11th and 15th
    return date.getDate() === 11 || date.getDate() === 15;
  };

  const loadStats = async () => {
    const doctors = await listDoctors();
    const appointments = await listAppointments();
    const queue = await listPatientQueue();

    setStats({
      pendingDoctors: doctors.filter((d: any) => d.objectData.status === 'pending').length,
      verifiedDoctors: doctors.filter((d: any) => d.objectData.status === 'verified').length,
      todayAppointments: appointments.length,
      patientsInQueue: queue.length
    });
  };

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard title="Pending Doctors" value={stats.pendingDoctors} icon="user-check" color="yellow" />
          <StatsCard title="Verified Doctors" value={stats.verifiedDoctors} icon="shield-check" color="green" />
          <StatsCard title="Today's Appointments" value={stats.todayAppointments} icon="calendar" color="blue" />
          <StatsCard title="Patients in Queue" value={stats.patientsInQueue} icon="users" color="purple" />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <a href="/doctors" className="btn btn-primary text-center">
                Review Doctors
              </a>
              <a href="/appointments" className="btn btn-secondary text-center">
                View Schedule
              </a>
              <a href="/queue" className="btn btn-secondary text-center">
                Manage Queue
              </a>
              <a href="/profile" className="btn btn-outline text-center">
                View Profile
              </a>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => navigateMonth('prev')}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <span className="text-lg">‹</span>
              </button>
              <h2 className="text-xl font-semibold">
                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h2>
              <button
                onClick={() => navigateMonth('next')}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <span className="text-lg">›</span>
              </button>
            </div>
            <div className="text-center">
              <div className="grid grid-cols-7 gap-1 text-sm">
                <div className="font-medium text-[var(--text-secondary)]">Su</div>
                <div className="font-medium text-[var(--text-secondary)]">Mo</div>
                <div className="font-medium text-[var(--text-secondary)]">Tu</div>
                <div className="font-medium text-[var(--text-secondary)]">We</div>
                <div className="font-medium text-[var(--text-secondary)]">Th</div>
                <div className="font-medium text-[var(--text-secondary)]">Fr</div>
                <div className="font-medium text-[var(--text-secondary)]">Sa</div>

                {getCalendarDays().map((date, index) => (
                  <div
                    key={index}
                    className={`h-8 w-8 flex items-center justify-center rounded-full cursor-pointer relative ${
                      isCurrentMonth(date)
                        ? isToday(date)
                          ? 'bg-[var(--primary-color)] text-white font-medium'
                          : hasAppointment(date)
                          ? 'bg-blue-100 hover:bg-blue-200'
                          : 'hover:bg-gray-100'
                        : 'text-gray-300'
                    }`}
                  >
                    {date.getDate()}
                    {hasAppointment(date) && isCurrentMonth(date) && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-[var(--primary-color)] rounded-full"></div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-3 text-xs text-[var(--text-secondary)]">
                <span className="inline-block w-2 h-2 bg-[var(--primary-color)] rounded-full mr-1"></span>
                Appointments scheduled
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity & Upcoming Appointments */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[var(--primary-color)] rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New doctor verification request</p>
                  <p className="text-xs text-[var(--text-secondary)]">5 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[var(--secondary-color)] rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Patient added to queue</p>
                  <p className="text-xs text-[var(--text-secondary)]">15 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[var(--accent-color)] rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Appointment completed</p>
                  <p className="text-xs text-[var(--text-secondary)]">1 hour ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[var(--danger-color)] rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">System maintenance completed</p>
                  <p className="text-xs text-[var(--text-secondary)]">2 hours ago</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
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
