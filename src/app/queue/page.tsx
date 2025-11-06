'use client';

import DashboardLayout from '../../components/DashboardLayout';
import PatientQueue from '../../components/PatientQueue';

export default function QueuePage() {
  const handleUpdate = () => {
    // This will trigger a re-render of stats in the parent if needed
    window.location.reload();
  };

  return (
    <DashboardLayout>
      <PatientQueue onUpdate={handleUpdate} />
    </DashboardLayout>
  );
}