// Mock data for development
const mockDoctors = [
  {
    objectId: '1',
    objectData: {
      name: 'Dr. Sarah Moyo',
      specialty: 'Cardiology',
      practiceNumber: '12345',
      email: 'sarah.moyo@hospital.com',
      status: 'verified'
    }
  },
  {
    objectId: '2',
    objectData: {
      name: 'Dr. Tendai Ndlovu',
      specialty: 'Pediatrics',
      practiceNumber: '67890',
      email: 'tendai.ndlovu@hospital.com',
      status: 'pending'
    }
  },
  {
    objectId: '3',
    objectData: {
      name: 'Dr. Rumbidzai Chitiyo',
      specialty: 'Orthopedics',
      practiceNumber: '54321',
      email: 'rumbidzai.chitiyo@hospital.com',
      status: 'verified'
    }
  }
];

const mockAppointments = [
  {
    objectId: '1',
    objectData: {
      time: '10:00',
      patientName: 'Alice Kudya',
      doctorName: 'Dr. Sarah Moyo',
      department: 'Cardiology',
      status: 'scheduled'
    }
  },
  {
    objectId: '2',
    objectData: {
      time: '14:30',
      patientName: 'Bob Tenda',
      doctorName: 'Dr. Tendai Ndlovu',
      department: 'Pediatrics',
      status: 'scheduled'
    }
  },
  {
    objectId: '3',
    objectData: {
      time: '09:00',
      patientName: 'Carol Moyo',
      doctorName: 'Dr. Rumbidzai Chitiyo',
      department: 'Orthopedics',
      status: 'scheduled'
    }
  }
];

const mockPatientQueue = [
  {
    objectId: '1',
    objectData: {
      name: 'David Sibanda',
      department: 'Emergency',
      queueTime: '08:30',
      status: 'waiting'
    }
  },
  {
    objectId: '2',
    objectData: {
      name: 'Emma Gunda',
      department: 'Cardiology',
      queueTime: '09:15',
      status: 'waiting'
    }
  },
  {
    objectId: '3',
    objectData: {
      name: 'Frank Gondo',
      department: 'Orthopedics',
      queueTime: '10:00',
      status: 'waiting'
    }
  }
];

// Doctor Management
export async function listDoctors() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockDoctors;
}

export async function updateDoctor(doctorId: string, data: any) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  const doctor = mockDoctors.find(d => d.objectId === doctorId);
  if (doctor) {
    Object.assign(doctor, data);
    return doctor;
  }
  throw new Error('Doctor not found');
}

// Appointment Management
export async function listAppointments() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockAppointments;
}

// Patient Queue Management
export async function listPatientQueue() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockPatientQueue;
}

export async function updatePatientQueue(patientId: string, data: any) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  const patient = mockPatientQueue.find(p => p.objectId === patientId);
  if (patient) {
    Object.assign(patient, data);
    return patient;
  }
  throw new Error('Patient not found');
}