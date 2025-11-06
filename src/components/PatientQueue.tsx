'use client';

import { useState, useEffect } from 'react';
import { listPatientQueue, updatePatientQueue } from '../utils/database';

interface Patient {
  objectId: string;
  objectData: {
    name: string;
    department: string;
    queueTime: string;
    status: string;
  };
}

export default function PatientQueue({ onUpdate }: { onUpdate: () => void }) {
  const [queue, setQueue] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQueue();
  }, []);

  const loadQueue = async () => {
    setLoading(true);
    const result = await listPatientQueue();
    setQueue(result);
    setLoading(false);
  };

  const handleComplete = async (patientId: string) => {
    await updatePatientQueue(patientId, { status: 'completed' });
    loadQueue();
    onUpdate();
  };

  const activeQueue = queue.filter(p => p.objectData.status === 'waiting');

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Patient Queue</h1>
        <span className="badge badge-active">{activeQueue.length} Waiting</span>
      </div>

      {loading ? (
        <div className="card text-center py-12">
          <p className="text-[var(--text-secondary)]">Loading queue...</p>
        </div>
      ) : activeQueue.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-[var(--text-secondary)]">No patients in queue</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {activeQueue.map((patient, index) => (
            <div key={patient.objectId} className="card flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--primary-color)] flex items-center justify-center">
                  <span className="text-white font-bold">{index + 1}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{patient.objectData.name}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {patient.objectData.department} • Queue time: {patient.objectData.queueTime}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleComplete(patient.objectId)}
                className="btn btn-secondary"
              >
                Complete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}