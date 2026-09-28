import React from 'react';

export const Colleges: React.FC = () => {
  return (
    <section className="w-full py-20 max-w-7xl mx-auto px-6 lg:px-12 bg-white" id="colleges">
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E6F7F7] border border-[#00A6A6]/30 text-[#008686] text-xs uppercase tracking-wider font-semibold">
          Regional Institutional Network
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#123B6D] tracking-tight">
          Explore Colleges Across South India
        </h2>
        <p className="text-base text-[#4B5563]">
          Find accredited institutions tailored to your ambitions and budget. We provide clear campus profiles across key educational destinations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Hub 1: Kerala */}
        <div className="rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#00A6A6] shadow-sm hover:shadow-lg overflow-hidden flex flex-col group transition-all">
          <div className="h-48 w-full relative overflow-hidden bg-slate-100">
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              alt="Scenic university campus in Kerala"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmIEAxwXbgSmbeK9yoXeaZqaE5IMYlwbEk47y3eK3i3tQ0cBeYr3bWz0mPtLJoCK2dyq00P9XxcFvR4jtA0U4IJRYV0xORLFQu-Vv2BEmLw0RCqIZwgWZRvdesD-fTbx9kMttwQQPWbwwVlea1w1JpLv4blK3_Zm961Azxxnrhhf1OwvzsawO_Unn5yS7Iod7Ixy9NqQW_5B3IU-JOsK3ExX57Q0IahSGBN_xtqjyW1SKuzsd_ULxy"
            />
            <div className="absolute top-3 left-3">
              <span className="px-3 py-1 rounded-md bg-white/90 backdrop-blur-md text-[#123B6D] text-xs font-bold border border-slate-200">
                Kerala
              </span>
            </div>
          </div>
          <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
            <div>
              <h3 className="text-lg font-bold text-[#123B6D] mb-1">Kerala</h3>
              <p className="text-xs text-[#4B5563] leading-relaxed">
                Top universities, engineering &amp; healthcare institutions across Trivandrum, Kochi, Calicut, and Kottayam.
              </p>
            </div>
            <a
              href="#register-form"
              className="w-full py-2.5 rounded-xl bg-[#EAF2FB] hover:bg-[#123B6D] border border-[#CBDFF2] text-[#123B6D] hover:text-white text-sm font-semibold text-center transition-all shadow-sm block"
            >
              View Colleges
            </a>
          </div>
        </div>

        {/* Hub 2: Tamil Nadu */}
        <div className="rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#00A6A6] shadow-sm hover:shadow-lg overflow-hidden flex flex-col group transition-all">
          <div className="h-48 w-full relative overflow-hidden bg-slate-100">
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              alt="High-tech college campus in Tamil Nadu"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuALys6o8O7De2PTtKFt-ppk9FHU8GBatjPlF8Vjs_nlM91rtWlnDx5KXJaNeVrPM-8sgf9UsGUT2TRqn7eO4jKZ9FakCDNnhkMEi9xwxJKYlWZxdWOEZmQAvjtOaO7azuv2a_0ypPe366a0H-9qmCXA2QVGl-hWsuSyggZEX7fEfTD7F_E2HjErhFgX_JolRmHfkEUV6boAbJ83q72mkvY_H-FEeJitbpcPF0XOaU336__11QFEMCwD"
            />
            <div className="absolute top-3 left-3">
              <span className="px-3 py-1 rounded-md bg-white/90 backdrop-blur-md text-[#123B6D] text-xs font-bold border border-slate-200">
                Tamil Nadu
              </span>
            </div>
          </div>
          <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
            <div>
              <h3 className="text-lg font-bold text-[#123B6D] mb-1">Tamil Nadu</h3>
              <p className="text-xs text-[#4B5563] leading-relaxed">
                Renowned deemed universities and premier technical institutes in Chennai, Coimbatore, Salem, and Madurai.
              </p>
            </div>
            <a
              href="#register-form"
              className="w-full py-2.5 rounded-xl bg-[#EAF2FB] hover:bg-[#123B6D] border border-[#CBDFF2] text-[#123B6D] hover:text-white text-sm font-semibold text-center transition-all shadow-sm block"
            >
              View Colleges
            </a>
          </div>
        </div>

        {/* Hub 3: Karnataka */}
        <div className="rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#00A6A6] shadow-sm hover:shadow-lg overflow-hidden flex flex-col group transition-all">
          <div className="h-48 w-full relative overflow-hidden bg-slate-100">
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              alt="Students walking on green university campus quad in Karnataka"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcCksdNiSHNgqWSl8g_qqbFFAWtTwpaUIiOIc-3CuWU384N-c08uiPagPwiW99Z-VrWgzwyNK97AAWfvoSTleGhO5vrxTdPOmWfG4ZCc72pxzPhE2yvxgQzQa8-DLznBmcLdLjgjwVmpB_MsDIbBZ1sZoiSfhbEvc4d3886DVKUa3A03cmeDPU4ObAVoe8ECW8PqW3fG1q6yCbqn0AHym2aWSBvprebitkwI_4Db1RrNrAsm7FFFos"
            />
            <div className="absolute top-3 left-3">
              <span className="px-3 py-1 rounded-md bg-white/90 backdrop-blur-md text-[#123B6D] text-xs font-bold border border-slate-200">
                Karnataka
              </span>
            </div>
          </div>
          <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
            <div>
              <h3 className="text-lg font-bold text-[#123B6D] mb-1">Karnataka</h3>
              <p className="text-xs text-[#4B5563] leading-relaxed">
                Renowned academic hubs, medical colleges &amp; IT universities across Bengaluru, Mangaluru, and Mysuru.
              </p>
            </div>
            <a
              href="#register-form"
              className="w-full py-2.5 rounded-xl bg-[#EAF2FB] hover:bg-[#123B6D] border border-[#CBDFF2] text-[#123B6D] hover:text-white text-sm font-semibold text-center transition-all shadow-sm block"
            >
              View Colleges
            </a>
          </div>
        </div>

        {/* Hub 4: Hyderabad / Telangana */}
        <div className="rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#00A6A6] shadow-sm hover:shadow-lg overflow-hidden flex flex-col group transition-all">
          <div className="h-48 w-full relative overflow-hidden bg-slate-100">
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              alt="Modern business and tech school in Hyderabad"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuClCzKaNal9gAZWtr4FtAbTbAhkd6qBq6VBreBICTCe9UEYM5LbRZ6h8JZjNQfZoRJPDpFxsPxNtH35mkHAqOIHf8XuW4gl67304nryZKCY6Ljifr7dVh6pD1f_hEVkSEsb-Ns50pUbTH_s1q6ey5KSGDHIR6aRnw_y7wa8pHBO3dkPfDqPk4ll8mJVCR9hv0ROzUT4h0LI-BLOYsXg4RHwoSkNijmdfKE0MplThC3GwvDSv_eUheTc"
            />
            <div className="absolute top-3 left-3">
              <span className="px-3 py-1 rounded-md bg-white/90 backdrop-blur-md text-[#123B6D] text-xs font-bold border border-slate-200">
                Hyderabad / Telangana
              </span>
            </div>
          </div>
          <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
            <div>
              <h3 className="text-lg font-bold text-[#123B6D] mb-1">Telangana</h3>
              <p className="text-xs text-[#4B5563] leading-relaxed">
                Emerging tech hubs, pharmaceutical institutions &amp; accredited management schools throughout Hyderabad.
              </p>
            </div>
            <a
              href="#register-form"
              className="w-full py-2.5 rounded-xl bg-[#EAF2FB] hover:bg-[#123B6D] border border-[#CBDFF2] text-[#123B6D] hover:text-white text-sm font-semibold text-center transition-all shadow-sm block"
            >
              View Colleges
            </a>
          </div>
        </div>
      </div>

      {/* Pre-admission portal banner */}
      <div className="mt-10 p-6 rounded-2xl bg-[#F4F8FC] border border-[#CBDFF2] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-[#00A6A6] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
            <span className="material-symbols-outlined text-[22px] font-bold">rocket_launch</span>
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold text-[#123B6D]">Interactive College Matrix &amp; Cutoffs Portal</span>
            <span className="text-xs sm:text-sm text-[#4B5563]">Individual college profiles with verified fee guidelines, hostel safety reviews, eligibility calculators, and direct seat enquiry are launching soon.</span>
          </div>
        </div>
        <a
          className="px-5 py-2.5 rounded-xl bg-white border border-[#CBDFF2] text-[#123B6D] hover:bg-[#123B6D] hover:text-white text-xs font-bold shadow-sm transition-all whitespace-nowrap"
          href="#register-form"
        >
          Get Pre-Admission List
        </a>
      </div>
    </section>
  );
};
