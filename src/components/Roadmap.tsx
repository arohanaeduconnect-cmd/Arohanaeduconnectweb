import React from 'react';

export const Roadmap: React.FC = () => {
  return (
    <section className="w-full bg-[#F4F8FC] border-y border-slate-200 py-20" id="roadmap">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#CBDFF2] text-[#008686] text-xs uppercase tracking-wider font-semibold shadow-sm">
            Our Transparent Roadmap
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#123B6D] tracking-tight">
            Complete Admission Guidance, From Choice to Admission
          </h2>
          <p className="text-base text-[#4B5563]">
            A structured, 4-step consultative framework designed to remove student stress and give parents complete transparency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Step 1 */}
          <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#00A6A6] shadow-sm flex flex-col space-y-4 relative group transition-all">
            <div className="flex items-center justify-between">
              <span className="w-10 h-10 rounded-xl bg-[#00A6A6] text-white font-display text-lg font-bold flex items-center justify-center shadow-sm">
                1
              </span>
              <span className="material-symbols-outlined text-[#00A6A6] text-[28px]">how_to_reg</span>
            </div>
            <h3 className="text-lg font-bold text-[#123B6D]">Register</h3>
            <p className="text-xs text-[#4B5563] leading-relaxed">
              Student or parent submits an initial enquiry with their preferred courses, academic background, and geographic requirements.
            </p>
            <div className="pt-2">
              <span className="text-[11px] text-[#008686] uppercase font-bold tracking-wider">Initial Intake</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#00A6A6] shadow-sm flex flex-col space-y-4 relative group transition-all">
            <div className="flex items-center justify-between">
              <span className="w-10 h-10 rounded-xl bg-[#123B6D] text-white font-display text-lg font-bold flex items-center justify-center shadow-sm">
                2
              </span>
              <span className="material-symbols-outlined text-[#123B6D] text-[28px]">support_agent</span>
            </div>
            <h3 className="text-lg font-bold text-[#123B6D]">Counselling</h3>
            <p className="text-xs text-[#4B5563] leading-relaxed">
              Our seasoned academic counsellor connects to understand the student's passion, marks profile, budget expectations, and family priorities.
            </p>
            <div className="pt-2">
              <span className="text-[11px] text-[#123B6D] uppercase font-bold tracking-wider">1-on-1 Consultation</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#00A6A6] shadow-sm flex flex-col space-y-4 relative group transition-all">
            <div className="flex items-center justify-between">
              <span className="w-10 h-10 rounded-xl bg-[#123B6D] text-white font-display text-lg font-bold flex items-center justify-center shadow-sm">
                3
              </span>
              <span className="material-symbols-outlined text-[#123B6D] text-[28px]">format_list_bulleted</span>
            </div>
            <h3 className="text-lg font-bold text-[#123B6D]">Shortlist</h3>
            <p className="text-xs text-[#4B5563] leading-relaxed">
              We curate and present verified, high-value course and college options that match your qualification criteria and realistic budget parameters.
            </p>
            <div className="pt-2">
              <span className="text-[11px] text-[#123B6D] uppercase font-bold tracking-wider">Direct Evaluation</span>
            </div>
          </div>

          {/* Step 4 */}
          <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#00A6A6] shadow-sm flex flex-col space-y-4 relative group transition-all">
            <div className="flex items-center justify-between">
              <span className="w-10 h-10 rounded-xl bg-[#10B981] text-white font-display text-lg font-bold flex items-center justify-center shadow-sm">
                4
              </span>
              <span className="material-symbols-outlined text-[#10B981] text-[28px]">verified</span>
            </div>
            <h3 className="text-lg font-bold text-[#123B6D]">Admission Support</h3>
            <p className="text-xs text-[#4B5563] leading-relaxed">
              We guide the student through application filing, document verification, seat confirmation, and orientation until formal campus induction.
            </p>
            <div className="pt-2">
              <span className="text-[11px] text-[#10B981] uppercase font-bold tracking-wider">Successful Induction</span>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <a
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#00A6A6] text-white font-bold text-sm shadow-[0_4px_16px_rgba(0,166,166,0.3)] hover:bg-[#008686] transition-all"
            href="#register-form"
          >
            <span>Start Your Admission Journey</span>
            <span className="material-symbols-outlined text-[18px]">east</span>
          </a>
        </div>
      </div>
    </section>
  );
};
