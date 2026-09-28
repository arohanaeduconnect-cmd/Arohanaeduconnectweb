export interface StudentRegistration {
  studentName: string;
  parentName?: string;
  whatsapp: string;
  email?: string;
  qualification: string;
  courseInterested: string;
  specificCourseDetails?: string;
  preferredLocation: string;
  budget?: string;
  message?: string;
  submittedAt?: string;
}

export interface SheetLeadRecord extends StudentRegistration {
  id: string;
  status: string;
}
