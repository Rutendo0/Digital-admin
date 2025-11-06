'use client';

import { useState, useEffect } from 'react';
import { listAppointments } from '../utils/database';

interface Appointment {
  objectId: string;
  objectData: {
    time: string;
    patientName: string;
    doctorName: string;
    department: string;
    status: string;
  };
}

export default function AppointmentSchedule() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    setLoading(true);
    const result = await listAppointments();
    setAppointments(result);
    setLoading(false);
  };

  const getStatusBadge = (status: string) => {
    const badges: { [key: string]: string } = {
      scheduled: 'badge badge-active',
      completed: 'badge badge-verified',
      cancelled: 'badge bg-red-100 text-red-700'
    };
    return badges[status] || 'badge';
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Appointment Schedule</h1>

      {loading ? (
        <div className="card text-center py-12">
          <p className="text-[var(--text-secondary)]">Loading appointments...</p>
        </div>
      ) : appointments.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-[var(--text-secondary)]">No appointments scheduled</p>
        </div>
      ) : (
        <div className="card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border-color)]">
                  <th className="text-left py-3 px-4 font-semibold">Time</th>
                  <th className="text-left py-3 px-4 font-semibold">Patient</th>
                  <th className="text-left py-3 px-4 font-semibold">Doctor</th>
                  <th className="text-left py-3 px-4 font-semibold">Department</th>
                  <th className="text-left py-3 px-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map(apt => (
                  <tr key={apt.objectId} className="border-b border-[var(--border-color)] hover:bg-gray-50">
                    <td className="py-3 px-4">{apt.objectData.time}</td>
                    <td className="py-3 px-4">{apt.objectData.patientName}</td>
                    <td className="py-3 px-4">{apt.objectData.doctorName}</td>
                    <td className="py-3 px-4">{apt.objectData.department}</td>
                    <td className="py-3 px-4">
                      <span className={getStatusBadge(apt.objectData.status)}>
                        {apt.objectData.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}