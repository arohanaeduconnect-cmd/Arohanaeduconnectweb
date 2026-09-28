import React from 'react';

export const About: React.FC = () => {
  return (
    <section className="w-full bg-white border-y border-slate-200 py-20 relative" id="about">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#F4F8FC] border border-[#CBDFF2] w-fit">
              <div className="h-14 w-48 sm:w-56 flex items-center">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqZ72TJSqdUxkzO4GtGUzNRhH-cISyVbiqxTkVWOxxUzl3E7BQVZVvFuTAShet9MDGUjTPo1Zqssew24YV0YxOWLmk4EsHa4kToDUx1jUMBiJb_OKcwSsfuH44uuflbWUCi53I8tCh2AK_2_Z8Qxu7Cqayw23_oRNnxIwpyQrQj0ZY8qbe-cnqpi-vZDckYvjtJ28bzLYlL1NHRNFODMfS7JOTdjtWpMSC-RlCp1c9i-wXh1d51rNgMNrqRZ-xETTFYQ"
                  alt="Arohana Edu Connect Official Guidance"
                  className="h-full w-auto object-contain"
                />
              </div>
              <div className="h-8 w-px bg-slate-300"></div>
              <span className="text-xs font-bold text-[#008686] uppercase tracking-wider">
                Kerala's Trusted Higher Ed Partner
              </span>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E6F7F7] border border-[#00A6A6]/30 text-[#008686] text-xs uppercase tracking-wider font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00A6A6]"></span>
              <span>About Arohana</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#123B6D] tracking-tight leading-tight">
              A Dedicated Education Bridge for Kerala Families
            </h2>
            <p className="text-base sm:text-lg text-[#1F2937] leading-relaxed">
              Arohana Edu Connect is an education consultancy dedicated to helping students and parents make informed decisions about higher education. We assist students from Kerala with course selection, college selection and admission guidance across South India.
            </p>
            <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
              Our goal is to make the admission journey simple, transparent and stress-free for students and parents. We believe every aspiring candidate deserves authentic institutional insights without commercial bias or misinformation.
            </p>
            <div className="pt-2">
              <a
                className="inline-flex items-center gap-2 text-[#00A6A6] font-bold hover:text-[#008686] hover:gap-3 transition-all"
                href="#services"
              >
                <span>Discover our approach to ethical counseling</span>
                <span className="material-symbols-outlined text-[18px]">east</span>
              </a>
            </div>
          </div>

          {/* Key Highlights Grid (Right 6 cols) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm hover:border-[#00A6A6] hover:shadow-md flex flex-col space-y-3 transition-all">
              <div className="w-11 h-11 rounded-xl bg-[#E6F7F7] text-[#00A6A6] flex items-center justify-center shadow-inner">
                <span className="material-symbols-outlined text-[24px]">gavel</span>
              </div>
              <h3 className="text-base font-bold text-[#123B6D]">Ethical Guidance</h3>
              <p className="text-xs text-[#4B5563] leading-relaxed">No false promises, genuine eligibility assessment, and honest campus profiles without hyperbole.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm hover:border-[#00A6A6] hover:shadow-md flex flex-col space-y-3 transition-all">
              <div className="w-11 h-11 rounded-xl bg-[#E6F7F7] text-[#00A6A6] flex items-center justify-center shadow-inner">
                <span className="material-symbols-outlined text-[24px]">family_restroom</span>
              </div>
              <h3 className="text-base font-bold text-[#123B6D]">Parent-Friendly Consultations</h3>
              <p className="text-xs text-[#4B5563] leading-relaxed">Clear discussions in Malayalam, Tamil, or English, addressing safety, hostel culture, and fee structures.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm hover:border-[#00A6A6] hover:shadow-md flex flex-col space-y-3 transition-all">
              <div className="w-11 h-11 rounded-xl bg-[#E6F7F7] text-[#00A6A6] flex items-center justify-center shadow-inner">
                <span className="material-symbols-outlined text-[24px]">fact_check</span>
              </div>
              <h3 className="text-base font-bold text-[#123B6D]">Verified College Details</h3>
              <p className="text-xs text-[#4B5563] leading-relaxed">NAAC / NBA accreditations, university affiliations, lab setups, and actual placement metrics validated.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm hover:border-[#00A6A6] hover:shadow-md flex flex-col space-y-3 transition-all">
              <div className="w-11 h-11 rounded-xl bg-[#E6F7F7] text-[#00A6A6] flex items-center justify-center shadow-inner">
                <span className="material-symbols-outlined text-[24px]">support_agent</span>
              </div>
              <h3 className="text-base font-bold text-[#123B6D]">Continuous Support till Joining</h3>
              <p className="text-xs text-[#4B5563] leading-relaxed">Unwavering assistance through allotment letters, fee receipts, hostel check-ins, and induction day.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
