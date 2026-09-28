import React, { useState } from 'react';
import { StudentRegistration } from '../types';
import {
  submitToGoogleAppsScript,
  isAppsScriptUrlConfigured,
  getAppsScriptEndpointUrl,
  DEFAULT_APPS_SCRIPT_URL,
} from '../services/appsScriptService';

interface RegistrationFormProps {
  onOpenEndpointSettings?: () => void;
}

const courseSuggestionsByStream: Record<string, string[]> = {
  Engineering: [
    'B.Tech Computer Science (AI & ML)',
    'B.Tech Robotics & Automation',
    'B.Tech Cyber Security',
    'B.Tech Data Science',
    'B.Tech Electronics & Comm.',
    'B.Tech Biomedical Engg',
  ],
  Nursing: [
    'B.Sc Nursing (4 Years)',
    'Post Basic B.Sc Nursing',
    'GNM Nursing',
    'M.Sc Nursing',
  ],
  'Allied Health Sciences': [
    'BPT Physiotherapy',
    'B.Sc MLT (Medical Lab Tech)',
    'B.Sc Cardiac Care Technology',
    'B.Sc Radiology & Imaging',
    'B.Sc Anesthesia & OT Tech',
    'B.Sc Perfusion Technology',
  ],
  Management: [
    'MBA Logistics & Supply Chain',
    'MBA Hospital Administration',
    'BBA Aviation & Airport Mgmt',
    'MBA Business Analytics',
    'BBA Finance & Banking',
  ],
  'Computer Science / IT': [
    'BCA Cloud & DevOps',
    'BCA Artificial Intelligence',
    'MCA Full Stack Software Engg',
    'B.Sc Data Analytics',
    'BCA Cyber Security',
  ],
  Pharmacy: [
    'Pharm.D (Doctor of Pharmacy - 6 Yrs)',
    'B.Pharm (Bachelor of Pharmacy)',
    'D.Pharm',
    'M.Pharm Pharmacology',
  ],
  Other: [
    'LLB (3 / 5 Yrs Integrated)',
    'B.Arch (Architecture)',
    'B.Des Fashion & Interior Design',
    'Hotel & Hospitality Mgmt',
  ],
};

const defaultCourseSuggestions = [
  'B.Sc Nursing',
  'B.Tech CS (AI & ML)',
  'BPT Physiotherapy',
  'B.Sc MLT',
  'MBA Logistics',
  'Pharm.D',
  'BCA Artificial Intelligence',
  'BBA Aviation',
];

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onOpenEndpointSettings,
}) => {
  const [formData, setFormData] = useState<StudentRegistration>({
    studentName: '',
    parentName: '',
    whatsapp: '',
    email: '',
    qualification: '',
    courseInterested: '',
    specificCourseDetails: '',
    preferredLocation: '',
    budget: '',
    message: '',
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  
  // Submission status state
  const [submissionState, setSubmissionState] = useState<{
    status: 'idle' | 'success' | 'error' | 'duplicate';
    studentName: string;
    message: string;
    details?: {
      course: string;
      location: string;
      whatsapp: string;
      time: string;
    };
  }>({
    status: 'idle',
    studentName: '',
    message: '',
  });

  // Track confirmed submission hashes to prevent duplicate submissions
  const [submittedHashes, setSubmittedHashes] = useState<Set<string>>(() => {
    try {
      const stored = sessionStorage.getItem('arohana_submitted_leads');
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch {
      return new Set();
    }
  });

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    // 1. Student Name validation
    if (!formData.studentName.trim()) {
      errors.studentName = 'Student name is required.';
    } else if (formData.studentName.trim().length < 2) {
      errors.studentName = 'Please enter a valid student name (at least 2 letters).';
    }

    // 2. WhatsApp Number validation (10 digits)
    const cleanPhone = formData.whatsapp.replace(/\D/g, '');
    if (!cleanPhone) {
      errors.whatsapp = 'WhatsApp mobile number is required.';
    } else if (cleanPhone.length !== 10) {
      errors.whatsapp = 'Please enter a valid 10-digit mobile number.';
    }

    // 3. Email validation (if provided)
    if (formData.email && formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errors.email = 'Please enter a valid email address.';
      }
    }

    // 4. Current Qualification validation
    if (!formData.qualification) {
      errors.qualification = 'Please select your current qualification.';
    }

    // 5. Course Interested In validation
    if (!formData.courseInterested && !formData.specificCourseDetails?.trim()) {
      errors.courseInterested = 'Please select a course stream or type your course details.';
    }

    // 6. Preferred Location validation
    if (!formData.preferredLocation) {
      errors.preferredLocation = 'Please select your preferred study location.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const generateSubmissionHash = (data: StudentRegistration): string => {
    const cleanPhone = data.whatsapp.replace(/\D/g, '');
    const courseKey = `${data.courseInterested || 'general'}_${(data.specificCourseDetails || '').trim()}`.toLowerCase();
    return `${data.studentName.trim().toLowerCase()}_${cleanPhone}_${courseKey}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent re-submission while currently submitting
    if (submitting) return;

    // Validate fields
    if (!validateForm()) {
      // Scroll smoothly to form container if needed
      return;
    }

    // Auto-fill courseInterested if only specificCourseDetails was typed
    const activePayload: StudentRegistration = {
      ...formData,
      courseInterested: formData.courseInterested || 'Other / Specialized',
    };

    // Duplicate submission check
    const currentHash = generateSubmissionHash(activePayload);
    if (submittedHashes.has(currentHash)) {
      const displayCourse = activePayload.specificCourseDetails
        ? `${activePayload.courseInterested} (${activePayload.specificCourseDetails})`
        : activePayload.courseInterested;
      setSubmissionState({
        status: 'duplicate',
        studentName: activePayload.studentName.trim(),
        message: `An inquiry for ${activePayload.studentName.trim()} for ${displayCourse} with this WhatsApp number has already been recorded. Our academic counselling team will contact you shortly.`,
      });
      return;
    }

    setSubmitting(true);
    setSubmissionState({ status: 'idle', studentName: '', message: '' });

    try {
      // Submit automatically to Google Apps Script Web App endpoint
      const result = await submitToGoogleAppsScript(activePayload);

      // Record confirmed submission hash to prevent duplicate submissions
      const newHashes = new Set(submittedHashes);
      newHashes.add(currentHash);
      setSubmittedHashes(newHashes);
      try {
        sessionStorage.setItem('arohana_submitted_leads', JSON.stringify(Array.from(newHashes)));
      } catch {
        // Ignore storage errors
      }

      const submittedTime = new Date().toLocaleTimeString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
      });

      const confirmedCourseDisplay = activePayload.specificCourseDetails
        ? `${activePayload.courseInterested} (${activePayload.specificCourseDetails})`
        : activePayload.courseInterested;

      // Display confirmed success
      setSubmissionState({
        status: 'success',
        studentName: activePayload.studentName.trim(),
        message: result.message || 'Your registration has been confirmed and logged successfully.',
        details: {
          course: confirmedCourseDisplay,
          location: activePayload.preferredLocation,
          whatsapp: activePayload.whatsapp,
          time: submittedTime,
        },
      });

      // Reset form fields
      setFormData({
        studentName: '',
        parentName: '',
        whatsapp: '',
        email: '',
        qualification: '',
        courseInterested: '',
        specificCourseDetails: '',
        preferredLocation: '',
        budget: '',
        message: '',
      });
      setFieldErrors({});
    } catch (error: any) {
      console.warn('Submission notice:', error?.message || error);
      const isPlaceholder = !isAppsScriptUrlConfigured();

      setSubmissionState({
        status: 'error',
        studentName: formData.studentName.trim(),
        message: isPlaceholder
          ? 'The Google Apps Script Web App endpoint URL has not been configured yet. Please configure your endpoint URL.'
          : error.message || 'Failed to submit registration. Please check your network or try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setSubmissionState({ status: 'idle', studentName: '', message: '' });
  };

  return (
    <section className="w-full py-20 max-w-5xl mx-auto px-6 lg:px-12" id="register-form">
      <div className="p-8 sm:p-12 rounded-3xl bg-[#F4F8FC] border border-[#CBDFF2] shadow-xl relative">
        
        {/* Header Branding */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="flex flex-col items-center justify-center gap-2 mb-4">
            <div className="h-16 sm:h-20 w-auto px-6 py-2 rounded-2xl bg-white border border-[#CBDFF2] shadow-md flex items-center justify-center">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1zriMmd0jNkaO9zqbzAgoiZBHSmJf2YTdbT2ZQUjtFlAchoKfI5BbsIMLjMWsmIBX_wrs93pCiecNSI3xcVSVk1PDZaNoI8idObaynFjMnV6AVUZdUHCfXI08maDjAr3ir6jjbt080ojYT6iOUL_iUBi1Raou5cdGUV-QkIV1rtyf-3FvY6cfINMOAEx-jvt3zJbLY3jQDsQEXjGttN5aS8DIMpT82o2cuhP7FuGUpS2nECOg9NuhJnBOMvpQx9hRmw"
                alt="Arohana Edu Connect Portal Official Logo"
                className="h-16 w-auto object-contain drop-shadow-sm rounded-lg"
              />
            </div>
            <span className="text-[11px] font-bold text-[#00A6A6] tracking-widest uppercase">
              Arohana Edu Connect Official Portal
            </span>
          </div>

          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#CBDFF2] text-[#008686] text-xs uppercase tracking-wider font-semibold shadow-sm">
            Begin Your Consultation
          </span>

          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#123B6D] tracking-tight">
            Register Your Interest
          </h2>
          <p className="text-base text-[#4B5563]">
            Tell us about your education goals. Our dedicated academic counseling team will contact you directly to guide your higher education path.
          </p>

          {/* Unobtrusive Endpoint Notice for Admin if not yet configured */}
          {!isAppsScriptUrlConfigured() && onOpenEndpointSettings && (
            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenEndpointSettings}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-800 text-[11px] font-semibold hover:bg-amber-100 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[14px] text-amber-600">settings</span>
                <span>Configure Apps Script Endpoint URL</span>
              </button>
            </div>
          )}
        </div>

        {/* 1. CONFIRMED SUCCESS BOX */}
        {submissionState.status === 'success' && (
          <div className="mb-8 p-6 sm:p-8 rounded-3xl bg-emerald-50 border-2 border-emerald-400 space-y-4 shadow-sm animate-fadeIn">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#10B981] text-white flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
                <span className="material-symbols-outlined text-[30px] font-bold">check_circle</span>
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h4 className="text-xl font-extrabold text-[#123B6D]">
                    Registration Confirmed &amp; Received!
                  </h4>
                  {submissionState.details?.time && (
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-white border border-emerald-200 text-emerald-800 self-start">
                      Logged at {submissionState.details.time} IST
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Thank you, <strong>{submissionState.studentName}</strong>. Your enquiry has been automatically submitted and confirmed in our admissions database. A senior counsellor will contact you on WhatsApp or phone shortly.
                </p>

                {submissionState.details && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-3 border-t border-emerald-200/80 text-xs">
                    <div className="bg-white/90 p-2.5 rounded-xl border border-emerald-100">
                      <span className="text-slate-500 block text-[10px] uppercase font-bold">Course</span>
                      <span className="font-bold text-[#123B6D]">{submissionState.details.course}</span>
                    </div>
                    <div className="bg-white/90 p-2.5 rounded-xl border border-emerald-100">
                      <span className="text-slate-500 block text-[10px] uppercase font-bold">Preferred Hub</span>
                      <span className="font-bold text-[#123B6D]">{submissionState.details.location}</span>
                    </div>
                    <div className="bg-white/90 p-2.5 rounded-xl border border-emerald-100">
                      <span className="text-slate-500 block text-[10px] uppercase font-bold">WhatsApp Contact</span>
                      <span className="font-bold text-[#123B6D]">+91 {submissionState.details.whatsapp}</span>
                    </div>
                  </div>
                )}

                <div className="pt-3 flex flex-wrap items-center gap-3">
                  <a
                    href="https://wa.me/917012908174"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white text-xs font-bold transition-all shadow-xs"
                  >
                    <span className="material-symbols-outlined text-[16px]">chat</span>
                    Chat Immediately on WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-[#123B6D] border border-slate-300 text-xs font-semibold transition-all cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. DUPLICATE NOTICE BOX */}
        {submissionState.status === 'duplicate' && (
          <div className="mb-8 p-6 rounded-2xl bg-amber-50 border border-amber-300 space-y-3 shadow-sm animate-fadeIn">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-amber-600 text-[28px] flex-shrink-0 mt-0.5">
                info
              </span>
              <div className="flex-1 space-y-2">
                <h4 className="text-base font-bold text-amber-900">
                  Duplicate Submission Detected
                </h4>
                <p className="text-xs text-amber-800 leading-relaxed">
                  {submissionState.message}
                </p>
                <div className="flex items-center gap-3 pt-1">
                  <a
                    href="https://wa.me/917012908174"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all"
                  >
                    <span className="material-symbols-outlined text-[16px]">chat</span>
                    WhatsApp Desk Directly
                  </a>
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="text-xs text-amber-800 underline font-semibold"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. ERROR BOX */}
        {submissionState.status === 'error' && (
          <div className="mb-8 p-6 rounded-2xl bg-rose-50 border border-rose-300 space-y-3 shadow-sm animate-fadeIn">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-rose-600 text-[28px] flex-shrink-0 mt-0.5">
                error
              </span>
              <div className="flex-1 space-y-2">
                <h4 className="text-base font-bold text-rose-900">
                  Submission Could Not Be Completed
                </h4>
                <p className="text-xs text-rose-800 leading-relaxed">
                  {submissionState.message}
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href="https://wa.me/917012908174"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white text-xs font-bold transition-all shadow-xs"
                  >
                    <span className="material-symbols-outlined text-[16px]">chat</span>
                    Send Inquiry Directly via WhatsApp
                  </a>
                  {onOpenEndpointSettings && (
                    <button
                      type="button"
                      onClick={onOpenEndpointSettings}
                      className="px-3.5 py-2 rounded-xl bg-white border border-rose-200 text-rose-800 text-xs font-semibold hover:bg-rose-100 transition-all cursor-pointer"
                    >
                      Configure Endpoint URL
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="text-xs text-slate-500 hover:text-slate-800 underline ml-auto"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* REGISTRATION FORM */}
        <form className="space-y-6" id="arohana-registration-form" onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Student Name * */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-sm text-[#123B6D] font-semibold" htmlFor="student_name">
                Student Name <span className="text-rose-500">*</span>
              </label>
              <input
                className={`h-12 px-4 rounded-xl bg-white border text-[#1F2937] placeholder-slate-400 focus:outline-none text-sm transition-all shadow-sm ${
                  fieldErrors.studentName
                    ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                    : 'border-slate-300 focus:border-[#00A6A6] focus:ring-2 focus:ring-[#00A6A6]/20'
                }`}
                id="student_name"
                placeholder="e.g. Rahul Menon"
                type="text"
                value={formData.studentName}
                onChange={(e) => {
                  setFormData({ ...formData, studentName: e.target.value });
                  if (fieldErrors.studentName) {
                    setFieldErrors({ ...fieldErrors, studentName: '' });
                  }
                }}
              />
              {fieldErrors.studentName && (
                <span className="text-xs text-rose-600 font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">priority_high</span>
                  {fieldErrors.studentName}
                </span>
              )}
            </div>

            {/* Parent / Guardian Name */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-sm text-[#123B6D] font-semibold" htmlFor="parent_name">
                Parent / Guardian Name
              </label>
              <input
                className="h-12 px-4 rounded-xl bg-white border border-slate-300 text-[#1F2937] placeholder-slate-400 focus:outline-none focus:border-[#00A6A6] focus:ring-2 focus:ring-[#00A6A6]/20 text-sm transition-all shadow-sm"
                id="parent_name"
                placeholder="e.g. Suresh Menon"
                type="text"
                value={formData.parentName || ''}
                onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
              />
            </div>

            {/* WhatsApp Number * */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-sm text-[#123B6D] font-semibold" htmlFor="whatsapp_number">
                WhatsApp Number <span className="text-rose-500">*</span>
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-4 rounded-l-xl bg-slate-100 border-y border-l border-slate-300 text-slate-700 text-sm font-semibold select-none">
                  +91
                </span>
                <input
                  className={`h-12 w-full px-4 rounded-r-xl bg-white border text-[#1F2937] placeholder-slate-400 focus:outline-none text-sm transition-all shadow-sm ${
                    fieldErrors.whatsapp
                      ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                      : 'border-slate-300 focus:border-[#00A6A6] focus:ring-2 focus:ring-[#00A6A6]/20'
                  }`}
                  id="whatsapp_number"
                  placeholder="98765 43210"
                  type="tel"
                  maxLength={10}
                  value={formData.whatsapp}
                  onChange={(e) => {
                    const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
                    setFormData({ ...formData, whatsapp: digits });
                    if (fieldErrors.whatsapp) {
                      setFieldErrors({ ...fieldErrors, whatsapp: '' });
                    }
                  }}
                />
              </div>
              {fieldErrors.whatsapp && (
                <span className="text-xs text-rose-600 font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">priority_high</span>
                  {fieldErrors.whatsapp}
                </span>
              )}
            </div>

            {/* Email Address */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-sm text-[#123B6D] font-semibold" htmlFor="email_address">
                Email Address
              </label>
              <input
                className={`h-12 px-4 rounded-xl bg-white border text-[#1F2937] placeholder-slate-400 focus:outline-none text-sm transition-all shadow-sm ${
                  fieldErrors.email
                    ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                    : 'border-slate-300 focus:border-[#00A6A6] focus:ring-2 focus:ring-[#00A6A6]/20'
                }`}
                id="email_address"
                placeholder="student@example.com"
                type="email"
                value={formData.email || ''}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (fieldErrors.email) {
                    setFieldErrors({ ...fieldErrors, email: '' });
                  }
                }}
              />
              {fieldErrors.email && (
                <span className="text-xs text-rose-600 font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">priority_high</span>
                  {fieldErrors.email}
                </span>
              )}
            </div>

            {/* Current Qualification * */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-sm text-[#123B6D] font-semibold" htmlFor="qualification">
                Current Qualification <span className="text-rose-500">*</span>
              </label>
              <select
                className={`h-12 px-4 rounded-xl bg-white border text-[#1F2937] focus:outline-none text-sm transition-all shadow-sm ${
                  fieldErrors.qualification
                    ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                    : 'border-slate-300 focus:border-[#00A6A6] focus:ring-2 focus:ring-[#00A6A6]/20'
                }`}
                id="qualification"
                value={formData.qualification}
                onChange={(e) => {
                  setFormData({ ...formData, qualification: e.target.value });
                  if (fieldErrors.qualification) {
                    setFieldErrors({ ...fieldErrors, qualification: '' });
                  }
                }}
              >
                <option value="" disabled>Select qualification</option>
                <option value="10th / SSLC">10th / SSLC</option>
                <option value="Plus Two / 12th Ongoing">Plus Two / 12th Ongoing</option>
                <option value="Plus Two / 12th Completed">Plus Two / 12th Completed</option>
                <option value="Degree / Graduate">Degree / Graduate</option>
              </select>
              {fieldErrors.qualification && (
                <span className="text-xs text-rose-600 font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">priority_high</span>
                  {fieldErrors.qualification}
                </span>
              )}
            </div>

            {/* Course Interested In * */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-sm text-[#123B6D] font-semibold" htmlFor="course_interested">
                Course Stream / Category <span className="text-rose-500">*</span>
              </label>
              <select
                className={`h-12 px-4 rounded-xl bg-white border text-[#1F2937] focus:outline-none text-sm transition-all shadow-sm ${
                  fieldErrors.courseInterested
                    ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                    : 'border-slate-300 focus:border-[#00A6A6] focus:ring-2 focus:ring-[#00A6A6]/20'
                }`}
                id="course_interested"
                value={formData.courseInterested}
                onChange={(e) => {
                  setFormData({ ...formData, courseInterested: e.target.value });
                  if (fieldErrors.courseInterested) {
                    setFieldErrors({ ...fieldErrors, courseInterested: '' });
                  }
                }}
              >
                <option value="" disabled>Select course stream</option>
                <option value="Engineering">Engineering (B.Tech / B.E)</option>
                <option value="Nursing">Nursing (B.Sc / GNM)</option>
                <option value="Allied Health Sciences">Allied Health Sciences</option>
                <option value="Management">Management (BBA / MBA)</option>
                <option value="Computer Science / IT">Computer Science / IT (BCA / MCA)</option>
                <option value="Pharmacy">Pharmacy (B.Pharm / Pharm.D)</option>
                <option value="Other">Other Specialized Program</option>
              </select>
              {fieldErrors.courseInterested && (
                <span className="text-xs text-rose-600 font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">priority_high</span>
                  {fieldErrors.courseInterested}
                </span>
              )}
            </div>

            {/* FACILITY TO TYPE INTERESTED COURSE DETAILS */}
            <div className="sm:col-span-2 p-4 sm:p-5 rounded-2xl bg-[#F4F8FC] border border-[#CBDFF2] space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <label className="text-sm text-[#123B6D] font-bold flex items-center gap-2" htmlFor="specific_course_details">
                  <span className="w-7 h-7 rounded-lg bg-[#EAF2FB] border border-[#CBDFF2] text-[#00A6A6] flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[18px]">edit_note</span>
                  </span>
                  <span>Type Interested Course Details &amp; Specialization</span>
                  <span className="px-2 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-[#008686] text-[10px] font-bold">
                    Custom Course Entry
                  </span>
                </label>
                <span className="text-[11px] text-slate-500">
                  Type the exact course, branch, or sub-specialization
                </span>
              </div>

              {/* Text Input with Clear Button */}
              <div className="relative">
                <input
                  className="h-12 w-full pl-4 pr-10 rounded-xl bg-white border border-slate-300 text-[#1F2937] placeholder-slate-400 focus:outline-none focus:border-[#00A6A6] focus:ring-2 focus:ring-[#00A6A6]/20 text-sm transition-all shadow-sm font-medium"
                  id="specific_course_details"
                  placeholder="e.g. B.Tech Computer Science (AI & ML), B.Sc Cardiac Care, PB B.Sc Nursing, MBA Logistics, Pharm.D..."
                  type="text"
                  value={formData.specificCourseDetails || ''}
                  onChange={(e) => {
                    setFormData({ ...formData, specificCourseDetails: e.target.value });
                    if (fieldErrors.courseInterested) {
                      setFieldErrors({ ...fieldErrors, courseInterested: '' });
                    }
                  }}
                />
                {formData.specificCourseDetails ? (
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, specificCourseDetails: '' })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                    title="Clear entered course"
                    aria-label="Clear course input"
                  >
                    <span className="material-symbols-outlined text-[18px]">close</span>
                  </button>
                ) : (
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px] pointer-events-none">
                    edit
                  </span>
                )}
              </div>

              {/* Quick Suggestion Chips */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600">
                  <span className="material-symbols-outlined text-[14px] text-[#00A6A6]">recommend</span>
                  <span>
                    {formData.courseInterested
                      ? `Popular specializations for ${formData.courseInterested}:`
                      : 'Popular course options (click to auto-fill):'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(formData.courseInterested && courseSuggestionsByStream[formData.courseInterested]
                    ? courseSuggestionsByStream[formData.courseInterested]
                    : defaultCourseSuggestions
                  ).map((suggestion) => {
                    const isSelected = formData.specificCourseDetails === suggestion;
                    return (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => {
                          let inferredStream = formData.courseInterested;
                          if (!inferredStream) {
                            if (suggestion.includes('B.Tech') || suggestion.includes('CS') || suggestion.includes('Engg')) {
                              inferredStream = 'Engineering';
                            } else if (suggestion.includes('Nursing')) {
                              inferredStream = 'Nursing';
                            } else if (suggestion.includes('Physiotherapy') || suggestion.includes('MLT') || suggestion.includes('Cardiac') || suggestion.includes('Radiology')) {
                              inferredStream = 'Allied Health Sciences';
                            } else if (suggestion.includes('MBA') || suggestion.includes('BBA')) {
                              inferredStream = 'Management';
                            } else if (suggestion.includes('BCA') || suggestion.includes('MCA')) {
                              inferredStream = 'Computer Science / IT';
                            } else if (suggestion.includes('Pharm')) {
                              inferredStream = 'Pharmacy';
                            }
                          }
                          setFormData({
                            ...formData,
                            specificCourseDetails: suggestion,
                            ...(inferredStream ? { courseInterested: inferredStream } : {}),
                          });
                          if (fieldErrors.courseInterested) {
                            setFieldErrors({ ...fieldErrors, courseInterested: '' });
                          }
                        }}
                        className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#123B6D] text-white border-[#123B6D] shadow-xs'
                            : 'bg-white hover:bg-[#EAF2FB] text-slate-700 border-slate-200 hover:border-[#CBDFF2]'
                        }`}
                      >
                        + {suggestion}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Preferred Location * */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-sm text-[#123B6D] font-semibold" htmlFor="preferred_location">
                Preferred Location <span className="text-rose-500">*</span>
              </label>
              <select
                className={`h-12 px-4 rounded-xl bg-white border text-[#1F2937] focus:outline-none text-sm transition-all shadow-sm ${
                  fieldErrors.preferredLocation
                    ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                    : 'border-slate-300 focus:border-[#00A6A6] focus:ring-2 focus:ring-[#00A6A6]/20'
                }`}
                id="preferred_location"
                value={formData.preferredLocation}
                onChange={(e) => {
                  setFormData({ ...formData, preferredLocation: e.target.value });
                  if (fieldErrors.preferredLocation) {
                    setFieldErrors({ ...fieldErrors, preferredLocation: '' });
                  }
                }}
              >
                <option value="" disabled>Select location hub</option>
                <option value="Kerala">Kerala</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Hyderabad / Telangana">Hyderabad / Telangana</option>
                <option value="Multiple / Open">Multiple / Open to Recommendations</option>
              </select>
              {fieldErrors.preferredLocation && (
                <span className="text-xs text-rose-600 font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">priority_high</span>
                  {fieldErrors.preferredLocation}
                </span>
              )}
            </div>

            {/* Approximate Budget */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-sm text-[#123B6D] font-semibold" htmlFor="budget">
                Approximate Budget / Year
              </label>
              <select
                className="h-12 px-4 rounded-xl bg-white border border-slate-300 text-[#1F2937] focus:outline-none focus:border-[#00A6A6] focus:ring-2 focus:ring-[#00A6A6]/20 text-sm transition-all shadow-sm"
                id="budget"
                value={formData.budget || ''}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              >
                <option value="">Open / Need guidance</option>
                <option value="Below ₹1 Lakh/yr">Below ₹1 Lakh / yr</option>
                <option value="₹1 - ₹3 Lakhs/yr">₹1 - ₹3 Lakhs / yr</option>
                <option value="₹3 - ₹5 Lakhs/yr">₹3 - ₹5 Lakhs / yr</option>
                <option value="₹5+ Lakhs/yr">₹5+ Lakhs / yr</option>
              </select>
            </div>
          </div>

          {/* Message / Questions */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-sm text-[#123B6D] font-semibold" htmlFor="message">
              Message / Questions (Optional)
            </label>
            <textarea
              className="p-4 rounded-xl bg-white border border-slate-300 text-[#1F2937] placeholder-slate-400 focus:outline-none focus:border-[#00A6A6] focus:ring-2 focus:ring-[#00A6A6]/20 text-sm transition-all shadow-sm"
              id="message"
              placeholder="Tell us if you have any specific query regarding cutoffs, hostel accommodation, or fees..."
              rows={3}
              value={formData.message || ''}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            ></textarea>
          </div>

          {/* Privacy & Submit Button */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-500 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-[#00A6A6]">lock</span>
              Your information is strictly confidential &amp; never shared with third parties.
            </span>

            <button
              className="w-full sm:w-auto px-9 py-3.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold text-sm shadow-[0_4px_16px_rgba(245,158,11,0.35)] active:scale-[0.99] transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              type="submit"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                  <span>Submitting Registration...</span>
                </>
              ) : (
                <span>Submit Enquiry</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
