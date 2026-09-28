import React from 'react';

export const Services: React.FC = () => {
  return (
    <section className="w-full py-20 max-w-7xl mx-auto px-6 lg:px-12" id="services">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E6F7F7] border border-[#00A6A6]/30 text-[#008686] text-xs uppercase tracking-wider font-semibold">
          What We Do
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#123B6D] tracking-tight">
          Comprehensive Guidance for Your Higher Education Journey
        </h2>
        <p className="text-base text-[#4B5563]">
          End-to-end support structured to provide peace of mind to students and parents at every step of career decision-making.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 1 */}
        <div className="p-7 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#00A6A6] shadow-sm hover:shadow-[0_8px_24px_rgba(18,59,109,0.08)] transition-all flex flex-col justify-between group">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#00A6A6] flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[26px]">psychology</span>
            </div>
            <h3 className="text-lg font-bold text-[#123B6D] group-hover:text-[#00A6A6] transition-colors">Career &amp; Course Guidance</h3>
            <p className="text-sm text-[#4B5563] leading-relaxed">
              Help students understand suitable courses based on their natural interests, 10th/12th academic qualifications, and long-term career goals.
            </p>
          </div>
          <div className="pt-6 border-t border-slate-100 mt-4">
            <a href="#register-form" className="text-xs text-[#00A6A6] font-bold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
              Personalised Profiling <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </a>
          </div>
        </div>

        {/* 2 */}
        <div className="p-7 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#00A6A6] shadow-sm hover:shadow-[0_8px_24px_rgba(18,59,109,0.08)] transition-all flex flex-col justify-between group">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#00A6A6] flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[26px]">domain_verification</span>
            </div>
            <h3 className="text-lg font-bold text-[#123B6D] group-hover:text-[#00A6A6] transition-colors">College Selection</h3>
            <p className="text-sm text-[#4B5563] leading-relaxed">
              Help students identify suitable colleges based on course specialty, campus location preferences, entrance eligibility, and family budget considerations.
            </p>
          </div>
          <div className="pt-6 border-t border-slate-100 mt-4">
            <a href="#colleges" className="text-xs text-[#00A6A6] font-bold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
              Accredited Institutions <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </a>
          </div>
        </div>

        {/* 3 */}
        <div className="p-7 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#00A6A6] shadow-sm hover:shadow-[0_8px_24px_rgba(18,59,109,0.08)] transition-all flex flex-col justify-between group">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#00A6A6] flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[26px]">assignment_turned_in</span>
            </div>
            <h3 className="text-lg font-bold text-[#123B6D] group-hover:text-[#00A6A6] transition-colors">Admission Assistance</h3>
            <p className="text-sm text-[#4B5563] leading-relaxed">
              Support students throughout the admission process and help them clearly understand required documentation, reservation criteria, and university procedures.
            </p>
          </div>
          <div className="pt-6 border-t border-slate-100 mt-4">
            <a href="#register-form" className="text-xs text-[#00A6A6] font-bold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
              Document Checklist Support <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </a>
          </div>
        </div>

        {/* 4 */}
        <div className="p-7 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#00A6A6] shadow-sm hover:shadow-[0_8px_24px_rgba(18,59,109,0.08)] transition-all flex flex-col justify-between group">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#00A6A6] flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[26px]">post_add</span>
            </div>
            <h3 className="text-lg font-bold text-[#123B6D] group-hover:text-[#00A6A6] transition-colors">Application Support</h3>
            <p className="text-sm text-[#4B5563] leading-relaxed">
              Guide students meticulously through application portals, quota selection, cutoff evaluations, and time-sensitive institutional entrance registrations.
            </p>
          </div>
          <div className="pt-6 border-t border-slate-100 mt-4">
            <a href="#register-form" className="text-xs text-[#00A6A6] font-bold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
              Zero Filing Errors <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </a>
          </div>
        </div>

        {/* 5 */}
        <div className="p-7 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#00A6A6] shadow-sm hover:shadow-[0_8px_24px_rgba(18,59,109,0.08)] transition-all flex flex-col justify-between group">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#00A6A6] flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[26px]">record_voice_over</span>
            </div>
            <h3 className="text-lg font-bold text-[#123B6D] group-hover:text-[#00A6A6] transition-colors">Parent &amp; Student Counselling</h3>
            <p className="text-sm text-[#4B5563] leading-relaxed">
              Provide transparent and complete information so students and parents can jointly make confident, informed, and peaceful educational decisions.
            </p>
          </div>
          <div className="pt-6 border-t border-slate-100 mt-4">
            <a href="#register-form" className="text-xs text-[#00A6A6] font-bold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
              In-Person &amp; Video Sessions <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </a>
          </div>
        </div>

        {/* 6 */}
        <div className="p-7 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#CBDFF2] shadow-sm flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-4 right-4">
            <span className="px-2.5 py-1 rounded-full bg-[#EAF2FB] border border-[#CBDFF2] text-[#123B6D] text-[10px] font-bold uppercase tracking-wider">
              Coming Soon
            </span>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 flex items-center justify-center">
              <span className="material-symbols-outlined text-[26px]">public</span>
            </div>
            <h3 className="text-lg font-bold text-[#123B6D]">Future Global Education</h3>
            <p className="text-sm text-[#4B5563] leading-relaxed">
              Strategic expansion into international education and global admission services to connect Kerala students with world-renowned overseas destinations.
            </p>
          </div>
          <div className="pt-6 border-t border-slate-100 mt-4">
            <span className="text-xs text-slate-500 font-medium">Roadmap 2026-2027</span>
          </div>
        </div>
      </div>
    </section>
  );
};
