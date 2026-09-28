import React from 'react';

export const Contact: React.FC = () => {
  return (
    <section className="w-full bg-[#F4F8FC] border-t border-slate-200 py-20" id="contact">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#CBDFF2] text-[#008686] text-xs uppercase tracking-wider font-semibold shadow-sm">
            Reach Out Directly
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#123B6D] tracking-tight">
            Get in Touch
          </h2>
          <p className="text-base text-[#4B5563]">
            Visit our regional educational desks or connect with an experienced counsellor today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Business Contact Info */}
          <div className="lg:col-span-5 p-8 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-xl font-bold text-[#123B6D]">Arohana Edu Connect</h3>
                <span className="text-xs text-[#00A6A6] font-semibold tracking-wide">
                  Higher Education &amp; Admission Guidance
                </span>
              </div>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#EAF2FB] border border-[#CBDFF2] text-[#123B6D] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[20px]">call</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block font-medium">Direct Phone</span>
                    <a className="text-[#123B6D] hover:text-[#00A6A6] font-semibold transition-colors" href="tel:+917012908174">
                      +91 70129 08174
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-[#10B981] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[20px]">chat</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block font-medium">Official WhatsApp</span>
                    <a
                      className="text-[#10B981] hover:text-emerald-700 hover:underline font-semibold text-left block"
                      href="https://wa.me/917012908174"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      +91 70129 08174 (Click to Chat)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#EAF2FB] border border-[#CBDFF2] text-[#123B6D] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[20px]">location_on</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block font-medium">Central Academic Office</span>
                    <span className="text-[#123B6D] font-medium">Mullamkuzhy, TKS Road, Maradu, Kochi, Ernakulam, Kerala, PIN 682304</span>
                    <span className="block text-xs text-[#4B5563] mt-1">
                      Liaison desks across Chennai, Bengaluru, and Hyderabad.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <span className="text-xs text-slate-500 block mb-1 font-medium">Consultation Hours:</span>
              <span className="text-sm text-[#123B6D] font-semibold">Monday – Saturday: 9:00 AM – 6:30 PM IST</span>
            </div>
          </div>

          {/* Location Map Preview */}
          <div className="lg:col-span-7 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm p-4 flex flex-col">
            <div
              className="w-full h-80 lg:h-full min-h-[340px] rounded-2xl bg-cover bg-center relative flex items-end p-4 border border-[#CBDFF2] shadow-inner overflow-hidden"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAuJ34WeEm1GENLomrEj2hABRMTZW08NRhMqf6TRHYdHZ45CW0wnPscuDMHgwErxRNXiPSg9m95viCpMeZEKk1UyY499p0G4o60Yw1zwhz6CZHJyAn7BHlonpQMeRkWlczpMrAdVx_M9LyPP99wmuVjqkqtH045F9scgC6s3IGltV1sIOKEozXW7IBnWo-uEQKdM0Bs5EBBxTdEtESzoecrmxTmoFtkqcC5FWFLoij3tmDQ-DDiy5Ku')",
              }}
            >
              <div className="p-4 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#00A6A6] text-white flex items-center justify-center font-bold shadow-sm">
                  <span className="material-symbols-outlined text-[22px]">pin_drop</span>
                </div>
                <div>
                  <h4 className="text-sm text-[#123B6D] font-bold">Arohana Edu Connect Central Desk</h4>
                  <p className="text-xs text-slate-600">Mullamkuzhy, TKS Road, Maradu, Kochi, Ernakulam, Kerala, PIN 682304 • Open for Student Consultations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
