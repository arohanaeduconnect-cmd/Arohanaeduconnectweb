import React from 'react';
import graduationCeremonyImg from '../assets/images/graduation_ceremony_1790541605530.jpg';

export const Hero: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-b from-[#F4F8FC] via-[#F4F8FC]/60 to-white">
      <div className="absolute top-[-10%] right-[-5%] w-[620px] h-[620px] rounded-full bg-sky-200/30 blur-[130px] pointer-events-none"></div>
      <div className="absolute top-[25%] left-[-10%] w-[500px] h-[500px] rounded-full bg-teal-200/25 blur-[120px] pointer-events-none"></div>

      <section className="relative w-full max-w-7xl mx-auto px-6 lg:px-12 pt-10 pb-16 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Hero Left (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            {/* Verification Pill with Logo Icon */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white border border-[#CBDFF2] shadow-sm hover:border-[#00A6A6] transition-all">
              <div className="h-9 sm:h-10 w-36 sm:w-44 flex items-center flex-shrink-0">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6PEEDNjOG1VDfpDM3dTbKohbhM3cS4URWc5r8duxsl3IAH-pPfVkyrmrQscXT6jLGC4mJZmcPYiICN9zy_G8ielePIh_m0_GaJkGNGPEyf9s1LovvyCVVorAS3KUXqT2kePdha3-7-6a_QyvMDzJdR4v2Wubzv9gcr20saRd0hUtZuS5ElRosybWxvESyjr6a8lWF-wYgIWph9FUnswBd-JLeu87mjRf1lUJva5f3Lg7NfdTTspUH3rAFZDU7H6jqhg"
                  alt="Official Arohana Edu Connect Emblem"
                  className="h-full w-auto object-contain"
                />
              </div>
              <div className="h-4 w-px bg-slate-300"></div>
              <span className="text-xs font-bold text-[#123B6D] tracking-wide uppercase">
                Official Admission Advisory Desk • South India
              </span>
              <span className="material-symbols-outlined text-[#00A6A6] text-[18px]">verified</span>
            </div>

            {/* Service Locations Pill */}
            <div className="inline-flex flex-wrap items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#CBDFF2] text-slate-700 shadow-sm">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#10B981] shadow-[0_0_8px_#34d399] animate-pulse"></span>
              <span className="text-xs sm:text-sm tracking-wide font-medium text-slate-600">Current Service Locations:</span>
              <div className="inline-flex flex-wrap gap-1.5 font-bold text-xs text-[#123B6D]">
                <span className="bg-[#EAF2FB] px-2 py-0.5 rounded-md text-[#123B6D]">Kerala</span>•
                <span className="bg-[#EAF2FB] px-2 py-0.5 rounded-md text-[#123B6D]">Tamil Nadu</span>•
                <span className="bg-[#EAF2FB] px-2 py-0.5 rounded-md text-[#123B6D]">Karnataka</span>•
                <span className="bg-[#EAF2FB] px-2 py-0.5 rounded-md text-[#123B6D]">Hyderabad / Telangana</span>
              </div>
            </div>

            {/* Hero Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[54px] lg:leading-[1.15] font-extrabold text-[#123B6D] tracking-tight">
              Your Journey to the <span className="text-[#00A6A6] underline decoration-[#00A6A6]/40 decoration-4 underline-offset-8">Right Education</span> Starts Here
            </h1>

            {/* Subheading */}
            <p className="text-lg text-[#4B5563] leading-relaxed max-w-2xl">
              Personalised education and admission guidance for students from Kerala to leading colleges across South India. Transparent, student-centric advice with parents involved at every step.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
              <a
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#00A6A6] text-white font-bold text-base shadow-[0_4px_18px_rgba(0,166,166,0.35)] hover:bg-[#008686] active:scale-[0.99] transition-all"
                href="#register-form"
              >
                <span>Register Your Interest</span>
                <span className="material-symbols-outlined text-[20px] font-bold">arrow_forward</span>
              </a>
              <a
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#10B981] text-white font-bold text-base shadow-[0_4px_18px_rgba(16,185,129,0.3)] hover:bg-[#059669] active:scale-[0.99] transition-all"
                href="https://wa.me/917012908174"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="material-symbols-outlined text-[22px]">chat</span>
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Quick Metrics Ribbon */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full border-t border-slate-200">
              <div className="flex flex-col">
                <span className="font-display text-2xl font-bold text-[#123B6D] flex items-center gap-1">
                  <span className="text-[#00A6A6]">100%</span> Free
                </span>
                <span className="text-xs text-slate-500 font-medium">Initial Counselling</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-2xl font-bold text-[#123B6D]">Direct</span>
                <span className="text-xs text-slate-500 font-medium">College Guidance</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-2xl font-bold text-[#123B6D] flex items-center gap-1">
                  <span className="text-[#00A6A6]">4</span> States
                </span>
                <span className="text-xs text-slate-500 font-medium">South India Reach</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-2xl font-bold text-[#10B981]">Ethical</span>
                <span className="text-xs text-slate-500 font-medium">Zero Hidden Fees</span>
              </div>
            </div>
          </div>

          {/* Visual Card (Right 5 Cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden p-2.5 bg-white border border-[#CBDFF2] shadow-[0_12px_40px_rgba(18,59,109,0.12)] group">
              <img
                alt="Arohana Edu Connect Graduation Ceremony - Kerala and South Indian University Graduates Celebrating Academic Success"
                className="w-full h-[420px] lg:h-[480px] object-cover rounded-2xl shadow-sm group-hover:scale-[1.02] transition-transform duration-700"
                src={graduationCeremonyImg}
              />
              {/* Soft Floating Badge Overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[#CBDFF2] shadow-[0_8px_24px_rgba(18,59,109,0.15)] flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-[#00A6A6] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-[24px] font-bold">school</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm sm:text-base font-bold text-[#123B6D] tracking-tight">Academic &amp; Career Success</span>
                  <span className="text-xs text-slate-600">Guiding Kerala Students to Premier Degrees</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Quick Trust Badges Below Hero */}
        <div className="mt-14 pt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm hover:border-[#00A6A6] hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#EAF2FB] border border-[#CBDFF2] flex items-center justify-center text-[#123B6D] flex-shrink-0">
              <span className="material-symbols-outlined text-[22px]">volunteer_activism</span>
            </div>
            <span className="text-sm text-[#123B6D] font-semibold">100% Free Initial Counselling</span>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm hover:border-[#00A6A6] hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#EAF2FB] border border-[#CBDFF2] flex items-center justify-center text-[#123B6D] flex-shrink-0">
              <span className="material-symbols-outlined text-[22px]">apartment</span>
            </div>
            <span className="text-sm text-[#123B6D] font-semibold">Direct Institution Guidance</span>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm hover:border-[#00A6A6] hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#EAF2FB] border border-[#CBDFF2] flex items-center justify-center text-[#123B6D] flex-shrink-0">
              <span className="material-symbols-outlined text-[22px]">visibility</span>
            </div>
            <span className="text-sm text-[#123B6D] font-semibold">Transparent &amp; Student-Centric</span>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm hover:border-[#00A6A6] hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#EAF2FB] border border-[#CBDFF2] flex items-center justify-center text-[#123B6D] flex-shrink-0">
              <span className="material-symbols-outlined text-[22px]">hub</span>
            </div>
            <span className="text-sm text-[#123B6D] font-semibold">South India College Network</span>
          </div>
        </div>
      </section>
    </div>
  );
};
