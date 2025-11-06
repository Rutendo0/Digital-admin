'use client';

import { useState, useEffect } from 'react';
import Modal from './Modal';
import { listDoctors, updateDoctor } from '../utils/database';

interface Doctor {
  objectId: string;
  objectData: {
    name: string;
    specialty: string;
    practiceNumber: string;
    email: string;
    status: string;
  };
}

export default function DoctorVerification({ onUpdate }: { onUpdate: () => void }) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    setLoading(true);
    const result = await listDoctors();
    setDoctors(result);
    setLoading(false);
  };

  const handleVerify = async (doctorId: string) => {
    await updateDoctor(doctorId, { status: 'verified' });
    setSelectedDoctor(null);
    loadDoctors();
    onUpdate();
  };

  const handleReject = async (doctorId: string) => {
    await updateDoctor(doctorId, { status: 'rejected' });
    setSelectedDoctor(null);
    loadDoctors();
    onUpdate();
  };

  const pendingDoctors = doctors.filter(d => d.objectData.status === 'pending');

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Doctor Verification</h1>
        <span className="badge badge-pending">{pendingDoctors.length} Pending</span>
      </div>

      {loading ? (
        <div className="card text-center py-12">
          <p className="text-[var(--text-secondary)]">Loading doctors...</p>
        </div>
      ) : pendingDoctors.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-[var(--text-secondary)]">No pending verifications</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {pendingDoctors.map(doctor => (
            <div key={doctor.objectId} className="card flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <div className="icon-user text-xl text-gray-600"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{doctor.objectData.name}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{doctor.objectData.specialty}</p>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">
                    Practice No: {doctor.objectData.practiceNumber}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedDoctor(doctor)}
                className="btn btn-primary"
              >
                Review
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedDoctor && (
        <Modal onClose={() => setSelectedDoctor(null)}>
          <h2 className="text-2xl font-bold mb-4">Doctor Verification</h2>
          <div className="space-y-4 mb-6">
            <div>
              <label className="text-sm font-medium text-[var(--text-secondary)]">Full Name</label>
              <p className="text-lg">{selectedDoctor.objectData.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-[var(--text-secondary)]">Specialty</label>
              <p className="text-lg">{selectedDoctor.objectData.specialty}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-[var(--text-secondary)]">Practice Number</label>
              <p className="text-lg">{selectedDoctor.objectData.practiceNumber}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-[var(--text-secondary)]">Email</label>
              <p className="text-lg">{selectedDoctor.objectData.email}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => handleVerify(selectedDoctor.objectId)} className="btn btn-secondary flex-1">
              Verify Doctor
            </button>
            <button onClick={() => handleReject(selectedDoctor.objectId)} className="btn btn-danger flex-1">
              Reject
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}