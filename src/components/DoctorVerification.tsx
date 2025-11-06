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
    biography: string;
    education: string;
    profilePicture: string;
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
          <p className="text-(--text-secondary)">Loading doctors...</p>
        </div>
      ) : pendingDoctors.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-(--text-secondary)">No pending verifications</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {pendingDoctors.map(doctor => (
            <div key={doctor.objectId} className="card p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <img
                    src={doctor.objectData.profilePicture}
                    alt={`${doctor.objectData.name} profile`}
                    className="w-14 h-14 rounded-full object-cover flex-shrink-0 border-2 border-gray-200"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-xl text-(--text-primary)">{doctor.objectData.name}</h3>
                    <p className="text-(--text-secondary) font-medium">{doctor.objectData.specialty}</p>
                    <p className="text-sm text-(--text-secondary) mt-1">
                      Practice No: {doctor.objectData.practiceNumber}
                    </p>
                    <p className="text-sm text-(--text-secondary) mt-1">
                      {doctor.objectData.email}
                    </p>
                    <div className="mt-3">
                      <p className="text-sm text-(--text-secondary)">
                        {doctor.objectData.biography.substring(0, 120)}...
                      </p>
                    </div>
                  </div>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <button
                    onClick={() => setSelectedDoctor(doctor)}
                    className="btn btn-primary px-6 py-2"
                  >
                    Review Application
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedDoctor && (
        <Modal onClose={() => setSelectedDoctor(null)}>
          <div className="max-h-[80vh] overflow-y-auto bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-xl">
            {/* Header with gradient background */}
            <div className="bg-gradient-to-r from-(--primary-color) to-blue-400 text-white p-6 rounded-t-xl">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={selectedDoctor.objectData.profilePicture}
                    alt={`${selectedDoctor.objectData.name} profile`}
                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
                    <span className="text-xs text-white font-bold">✓</span>
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-1">Doctor Verification Review</h2>
                  <p className="text-blue-100">Reviewing application for medical practice</p>
                </div>
              </div>
            </div>

            {/* Doctor Profile Card */}
            <div className="p-6">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-(--primary-color) flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {selectedDoctor.objectData.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-(--text-primary)">{selectedDoctor.objectData.name}</h3>
                    <p className="text-(--text-secondary) font-medium">{selectedDoctor.objectData.specialty}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-blue-500 flex-shrink-0">🏥</span>
                      <span className="text-(--text-secondary) flex-shrink-0">Practice:</span>
                      <span className="font-medium truncate">{selectedDoctor.objectData.practiceNumber}</span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-green-500 flex-shrink-0">✉️</span>
                      <span className="text-(--text-secondary) flex-shrink-0">Email:</span>
                      <span className="font-medium truncate">{selectedDoctor.objectData.email}</span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-purple-500 flex-shrink-0">📋</span>
                      <span className="text-(--text-secondary) flex-shrink-0">Status:</span>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium flex-shrink-0">Pending Review</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div className="space-y-6">
                {/* Biography Section */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl">📖</span>
                    <h4 className="text-lg font-bold text-(--text-primary)">Professional Biography</h4>
                  </div>
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border-l-4 border-(--primary-color)">
                    <p className="text-(--text-primary) leading-relaxed">{selectedDoctor.objectData.biography}</p>
                  </div>
                </div>

                {/* Education Section */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl">🎓</span>
                    <h4 className="text-lg font-bold text-(--text-primary)">Education & Qualifications</h4>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border-l-4 border-green-500">
                    <div className="space-y-2">
                      {selectedDoctor.objectData.education.split(', ').map((qualification, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">•</span>
                          <p className="text-(--text-primary)">{qualification}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Verification Actions */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                  <h4 className="text-lg font-bold text-(--text-primary) mb-4 flex items-center gap-2">
                    <span className="text-2xl">⚖️</span>
                    Verification Decision
                  </h4>
                  <p className="text-(--text-secondary) mb-6">Please review all information carefully before making your decision.</p>

                  <div className="flex gap-4">
                    <button
                      onClick={() => handleVerify(selectedDoctor.objectId)}
                      className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <span className="text-xl">✅</span>
                      Approve & Verify
                    </button>
                    <button
                      onClick={() => handleReject(selectedDoctor.objectId)}
                      className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <span className="text-xl">❌</span>
                      Reject Application
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}