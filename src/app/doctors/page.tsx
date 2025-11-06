'use client';

import DashboardLayout from '../../components/DashboardLayout';
import DoctorVerification from '../../components/DoctorVerification';

export default function DoctorsPage() {
  const handleUpdate = () => {
    // This will trigger a re-render of stats in the parent if needed
    window.location.reload();
  };

  return (
    <DashboardLayout>
      <DoctorVerification onUpdate={handleUpdate} />
    </DashboardLayout>
  );
}