'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import Modal from '../../components/Modal';
import { listDoctors, updateDoctor } from '../../utils/database';

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

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'pending' | 'all'>('pending');
  const [filterSpecialty, setFilterSpecialty] = useState<string>('all');

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
  };

  const handleReject = async (doctorId: string) => {
    await updateDoctor(doctorId, { status: 'rejected' });
    setSelectedDoctor(null);
    loadDoctors();
  };

  const getStatusBadge = (status: string) => {
    const badges: { [key: string]: string } = {
      pending: 'badge badge-pending',
      verified: 'badge badge-verified',
      rejected: 'badge bg-red-100 text-red-700'
    };
    return badges[status] || 'badge';
  };

  const pendingDoctors = doctors.filter(d => d.objectData.status === 'pending');
  const allDoctors = doctors.filter(d => d.objectData.status === 'verified');
  
  const displayDoctors = viewMode === 'pending' ? pendingDoctors : allDoctors;
  
  const specialties = [...new Set(doctors.map(d => d.objectData.specialty))];
  const filteredDoctors = filterSpecialty === 'all' 
    ? displayDoctors 
    : displayDoctors.filter(d => d.objectData.specialty === filterSpecialty);

  const handleUpdate = () => {
    loadDoctors();
    window.location.reload();
  };

  return (
    <DashboardLayout>
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">Doctor Management</h1>
          <div className="flex items-center gap-4">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('pending')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  viewMode === 'pending'
                    ? 'bg-white text-[var(--primary-color)] shadow-sm'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                Pending ({pendingDoctors.length})
              </button>
              <button
                onClick={() => setViewMode('all')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  viewMode === 'all'
                    ? 'bg-white text-[var(--primary-color)] shadow-sm'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                All Doctors ({allDoctors.length})
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        {viewMode === 'all' && (
          <div className="card mb-6">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-[var(--text-secondary)]">Filter by Specialty:</label>
              <select
                value={filterSpecialty}
                onChange={(e) => setFilterSpecialty(e.target.value)}
                className="px-3 py-2 border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
              >
                <option value="all">All Specialties</option>
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {loading ? (
          <div className="card text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary-color)]"></div>
            <p className="text-[var(--text-secondary)] mt-4">Loading doctors...</p>
          </div>
        ) : filteredDoctors.length === 0 ? (
          <div className="card text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="icon-user text-2xl text-[var(--text-secondary)]"></span>
            </div>
            <p className="text-[var(--text-secondary)]">
              {viewMode === 'pending' ? 'No pending verifications' : 'No doctors found'}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredDoctors.map(doctor => (
              <div key={doctor.objectId} className="card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <img
                      src={doctor.objectData.profilePicture}
                      alt={`${doctor.objectData.name} profile`}
                      className="w-16 h-16 rounded-full object-cover border-3 border-gradient-to-r from-purple-400 to-blue-400"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center ${
                      doctor.objectData.status === 'verified' ? 'bg-green-400' : 'bg-yellow-400'
                    }`}>
                      <span className="text-xs text-white font-bold">
                        {doctor.objectData.status === 'verified' ? '✓' : '⏳'}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg text-[var(--text-primary)] truncate">{doctor.objectData.name}</h3>
                    <p className="text-[var(--primary-color)] font-medium">{doctor.objectData.specialty}</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">
                      {doctor.objectData.email}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className={getStatusBadge(doctor.objectData.status)}>
                        {doctor.objectData.status}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-[var(--border-color)]">
                  <p className="text-sm text-[var(--text-secondary)] line-clamp-2">
                    {doctor.objectData.biography.substring(0, 100)}...
                  </p>
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => setSelectedDoctor(doctor)}
                    className="flex-1 btn btn-primary py-2 text-sm"
                  >
                    View Profile
                  </button>
                  {viewMode === 'pending' && (
                    <button
                      onClick={() => handleVerify(doctor.objectId)}
                      className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                      title="Verify Doctor"
                    >
                      ✓
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedDoctor && (
          <Modal onClose={() => setSelectedDoctor(null)}>
            <div className="max-h-[85vh] overflow-y-auto bg-[var(--bg-primary)]">
              {/* Header with system-themed gradient */}
              <div className="bg-gradient-to-r from-[var(--primary-color)] via-purple-600 to-blue-500 text-white p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <img
                        src={selectedDoctor.objectData.profilePicture}
                        alt={`${selectedDoctor.objectData.name} profile`}
                        className="w-28 h-28 rounded-full object-cover border-4 border-white/20 shadow-2xl"
                      />
                      <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-400 rounded-full border-4 border-white flex items-center justify-center">
                        <span className="text-white font-bold text-sm">✓</span>
                      </div>
                    </div>
                    <div>
                      <h2 className="text-4xl font-bold mb-2">{selectedDoctor.objectData.name}</h2>
                      <p className="text-blue-100 text-xl mb-1">{selectedDoctor.objectData.specialty}</p>
                      <p className="text-blue-100/80">Practice No: {selectedDoctor.objectData.practiceNumber}</p>
                      <div className="mt-3">
                        <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                          {selectedDoctor.objectData.status === 'verified' ? 'Verified Doctor' : 'Pending Verification'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="p-8">
                <div className="grid gap-8">
                  {/* Contact Information - System Card Style */}
                  <div className="card">
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--primary-color)] to-purple-600 flex items-center justify-center">
                        <span className="text-white text-lg">📞</span>
                      </div>
                      Contact Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border border-purple-100">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                            <span className="text-white text-lg">✉️</span>
                          </div>
                          <div>
                            <p className="text-sm text-[var(--text-secondary)]">Email Address</p>
                            <p className="font-semibold text-[var(--text-primary)]">{selectedDoctor.objectData.email}</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl border border-green-100">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                            <span className="text-white text-lg">🏥</span>
                          </div>
                          <div>
                            <p className="text-sm text-[var(--text-secondary)]">Practice Number</p>
                            <p className="font-semibold text-[var(--text-primary)]">{selectedDoctor.objectData.practiceNumber}</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                            <span className="text-white text-lg">📋</span>
                          </div>
                          <div>
                            <p className="text-sm text-[var(--text-secondary)]">Current Status</p>
                            <div className="mt-1">
                              <span className={getStatusBadge(selectedDoctor.objectData.status)}>
                                {selectedDoctor.objectData.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border border-yellow-100">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                            <span className="text-white text-lg">🏥</span>
                          </div>
                          <div>
                            <p className="text-sm text-[var(--text-secondary)]">Medical Specialty</p>
                            <p className="font-semibold text-[var(--text-primary)]">{selectedDoctor.objectData.specialty}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Biography - System Card Style */}
                  <div className="card">
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <span className="text-white text-lg">📖</span>
                      </div>
                      Professional Biography
                    </h3>
                    <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50 p-6 rounded-xl border-l-4 border-[var(--primary-color)]">
                      <p className="text-[var(--text-primary)] leading-relaxed text-base">{selectedDoctor.objectData.biography}</p>
                    </div>
                  </div>

                  {/* Education - System Card Style */}
                  <div className="card">
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center">
                        <span className="text-white text-lg">🎓</span>
                      </div>
                      Education & Qualifications
                    </h3>
                    <div className="bg-gradient-to-r from-green-50 via-blue-50 to-green-50 p-6 rounded-xl border-l-4 border-green-500">
                      <div className="space-y-4">
                        {selectedDoctor.objectData.education.split(', ').map((qualification, index) => (
                          <div key={index} className="flex items-start gap-4 p-3 bg-white/60 rounded-lg">
                            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-white text-sm font-bold">✓</span>
                            </div>
                            <p className="text-[var(--text-primary)] font-medium">{qualification}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons - System Style */}
                  {viewMode === 'pending' && (
                    <div className="card">
                      <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                          <span className="text-white text-lg">⚖️</span>
                        </div>
                        Verification Decision
                      </h3>
                      <p className="text-[var(--text-secondary)] mb-8 text-center">Please review all information carefully before making your decision.</p>
                      <div className="flex gap-4">
                        <button
                          onClick={() => handleVerify(selectedDoctor.objectId)}
                          className="flex-1 btn btn-secondary py-4 text-lg font-bold flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                        >
                          <span className="text-xl">✅</span>
                          Approve & Verify
                        </button>
                        <button
                          onClick={() => handleReject(selectedDoctor.objectId)}
                          className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
                        >
                          <span className="text-xl">❌</span>
                          Reject Application
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </DashboardLayout>
  );
}