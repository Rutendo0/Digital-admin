// Mock data for development
const mockDoctors = [
  {
    objectId: '1',
    objectData: {
      name: 'Dr. Sarah Moyo',
      specialty: 'Cardiology',
      practiceNumber: '12345',
      email: 'sarah.moyo@hospital.com',
      status: 'verified',
      biography: 'Dr. Sarah Moyo is a dedicated cardiologist with over 15 years of experience in cardiovascular medicine. She specializes in interventional cardiology and has performed numerous successful heart surgeries. Her passion for patient care and commitment to advancing cardiac treatments has made her a respected figure in the medical community.',
      education: 'MBBS from University of Zimbabwe, MD in Cardiology from University of Cape Town, Fellowship in Interventional Cardiology from Harvard Medical School',
      profilePicture: 'https://fsi9-prod.s3.us-west-1.amazonaws.com/s3fs-public/styles/895x498/public/gettyimages-black_doctor.jpg?h=f2fcf546&itok=KC5yZosp'
    }
  },
  {
    objectId: '2',
    objectData: {
      name: 'Dr. Tendai Ndlovu',
      specialty: 'Pediatrics',
      practiceNumber: '67890',
      email: 'tendai.ndlovu@hospital.com',
      status: 'pending',
      biography: 'Dr. Tendai Ndlovu is a compassionate pediatrician who has been serving children and families for over 12 years. She is particularly interested in preventive care and childhood development. Her gentle approach and expertise in pediatric medicine have helped countless young patients achieve better health outcomes.',
      education: 'MBBS from University of Pretoria, Diploma in Child Health from College of Medicine South Africa, Masters in Pediatrics from University of the Witwatersrand',
      profilePicture: 'https://fsi9-prod.s3.us-west-1.amazonaws.com/s3fs-public/styles/895x498/public/gettyimages-black_doctor.jpg?h=f2fcf546&itok=KC5yZosp'
    }
  },
  {
    objectId: '3',
    objectData: {
      name: 'Dr. Rumbidzai Chitiyo',
      specialty: 'Orthopedics',
      practiceNumber: '54321',
      email: 'rumbidzai.chitiyo@hospital.com',
      status: 'verified',
      biography: 'Dr. Rumbidzai Chitiyo is an expert orthopedic surgeon with extensive experience in joint replacement and sports medicine. She has successfully treated thousands of patients with musculoskeletal conditions, from professional athletes to elderly patients requiring joint replacements. Her innovative approaches to orthopedic care have improved patient recovery times significantly.',
      education: 'MBBS from University of Zimbabwe, MS in Orthopedic Surgery from University of Cape Town, Fellowship in Sports Medicine from University of Stellenbosch',
      profilePicture: 'https://fsi9-prod.s3.us-west-1.amazonaws.com/s3fs-public/styles/895x498/public/gettyimages-black_doctor.jpg?h=f2fcf546&itok=KC5yZosp'
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