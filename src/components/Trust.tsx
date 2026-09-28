import React from 'react';

export const Trust: React.FC = () => {
  return (
    <section className="w-full bg-white border-y border-slate-200 py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E6F7F7] border border-[#00A6A6]/30 text-[#008686] text-xs uppercase tracking-wider font-semibold">
            Our Core Values
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#123B6D] tracking-tight">
            Why Choose Arohana Edu Connect?
          </h2>
          <p className="text-base text-[#4B5563]">
            Built on authentic counseling ethics. We prioritize the student's true calling, institutional legitimacy, and family peace of mind above everything else.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#00A6A6] shadow-sm hover:shadow-md flex flex-col space-y-3 transition-all">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#00A6A6] flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">school</span>
            </div>
            <h3 className="text-base font-bold text-[#123B6D]">Student-Focused Guidance</h3>
            <p className="text-xs text-[#4B5563] leading-relaxed">
              Every course recommendation begins with the student's aptitude and strengths rather than university quotas.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#00A6A6] shadow-sm hover:shadow-md flex flex-col space-y-3 transition-all">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#00A6A6] flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">forum</span>
            </div>
            <h3 className="text-base font-bold text-[#123B6D]">Personalised Counselling</h3>
            <p className="text-xs text-[#4B5563] leading-relaxed">
              One-on-one sessions tailored directly to family preferences, answering every detail without rush.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#00A6A6] shadow-sm hover:shadow-md flex flex-col space-y-3 transition-all">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#00A6A6] flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">account_tree</span>
            </div>
            <h3 className="text-base font-bold text-[#123B6D]">Course &amp; College Selection</h3>
            <p className="text-xs text-[#4B5563] leading-relaxed">
              Impartial comparative matrices covering fees, accreditations, and hospital clinical linkages.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#00A6A6] shadow-sm hover:shadow-md flex flex-col space-y-3 transition-all">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#00A6A6] flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">diversity_1</span>
            </div>
            <h3 className="text-base font-bold text-[#123B6D]">Parent-Friendly Communication</h3>
            <p className="text-xs text-[#4B5563] leading-relaxed">
              Transparent Malayalam language discussions with parents regarding campus hostels and student safety.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
