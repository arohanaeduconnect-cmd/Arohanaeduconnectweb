import React from 'react';
import alliedHealthImg from '../assets/images/allied_health_lab_1790541261135.jpg';
import businessSchoolImg from '../assets/images/business_school_group_1790541272711.jpg';
import softwareDevImg from '../assets/images/software_dev_coding_1790541287516.jpg';
import pharmacyImg from '../assets/images/pharmacy_lab_students_1790541301796.jpg';

export const Courses: React.FC = () => {
  return (
    <section className="w-full bg-[#F4F8FC] border-y border-slate-200 py-20" id="courses">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#CBDFF2] text-[#008686] text-xs uppercase tracking-wider font-semibold shadow-sm">
              Curated Academic Disciplines
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#123B6D] tracking-tight">
              Explore Your Education Options
            </h2>
            <p className="text-base text-[#4B5563]">
              Comprehensive course paths across premier South Indian universities. We provide clear academic options based strictly on university curriculums and verified eligibility.
            </p>
          </div>
          <a
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#00A6A6] text-white font-bold text-sm shadow-[0_4px_14px_rgba(0,166,166,0.3)] hover:bg-[#008686] transition-all flex-shrink-0"
            href="#register-form"
          >
            <span>Find the Right Course</span>
            <span className="material-symbols-outlined text-[18px]">search</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 1. Engineering with Real Lab Photography */}
          <div className="rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#00A6A6] shadow-sm hover:shadow-md overflow-hidden flex flex-col group transition-all">
            <div className="h-44 w-full relative overflow-hidden bg-slate-100">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuLHj3z3dmLP3TvEcs_JIhmrwEDALTuYvhko3A78olSBDLXuYTzGwoR6-_cyzxzWDH-wdKXbiPxvenN-6ZIOrFc9y3MG5D0G6jIqSIsQqgJ8w4by3EqTAyrER1BgfnVEBdiR1TEKNTcNUeE6_VDoXJ2T58TaE6Q16MLqCSOlTmtX184aJZESn5OsLh1RUe1AgZc4hg-ByD0GXxwej3BcoaPaEEQsDuyLzfJZRc5TOb291q77wjKZdz"
                alt="Engineering and robotics lab with students"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-[#123B6D] text-[11px] font-bold border border-slate-200">
                  4 Years / UG
                </span>
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="material-symbols-outlined text-[#00A6A6] text-[20px]">terminal</span>
                  <h3 className="text-lg font-bold text-[#123B6D]">Engineering &amp; Technology</h3>
                </div>
                <p className="text-xs text-[#4B5563]">B.Tech • B.E Programs accredited by AICTE / NBA</p>
                <div className="flex flex-wrap gap-1.5 pt-3">
                  <span className="px-2.5 py-1 rounded-md bg-[#F4F8FC] border border-slate-200 text-[#1F2937] text-[11px]">AI &amp; Data Science</span>
                  <span className="px-2.5 py-1 rounded-md bg-[#F4F8FC] border border-slate-200 text-[#1F2937] text-[11px]">Computer Science</span>
                  <span className="px-2.5 py-1 rounded-md bg-[#F4F8FC] border border-slate-200 text-[#1F2937] text-[11px]">Robotics &amp; ECE</span>
                  <span className="px-2.5 py-1 rounded-md bg-[#F4F8FC] border border-slate-200 text-[#1F2937] text-[11px]">Mechanical</span>
                </div>
              </div>
              <a
                href="#register-form"
                className="w-full py-2.5 rounded-xl bg-[#EAF2FB] hover:bg-[#123B6D] text-[#123B6D] hover:text-white text-xs font-bold transition-all text-center block"
              >
                View Engineering Colleges
              </a>
            </div>
          </div>

          {/* 2. Nursing with Real Clinical Simulation Photography */}
          <div className="rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#00A6A6] shadow-sm hover:shadow-md overflow-hidden flex flex-col group transition-all">
            <div className="h-44 w-full relative overflow-hidden bg-slate-100">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxj9uYclhnRMjugYi0B5JQMY09M3be8logaieePX9tbTNrYAUKgdkTDw7atBiiriXdtmxIwiNodLgXj-_tEmSMXExDA0WpVyfFx6IXqkWqfq5U2hjNWvhpbkECUnprbgILPhNcqQj9PrlardjHu-Fm4XkHeBr8vcH-rLWTiNaSfcCnkuOsEDe-4y8ks5AIzzcaephOm06CdAgd5rZ48gqLrRRr2Q6G7OCnGITnCFGzLADQAq6hRimk"
                alt="Nursing and healthcare training simulation lab"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-[#123B6D] text-[11px] font-bold border border-slate-200">
                  INC Recognized
                </span>
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="material-symbols-outlined text-[#00A6A6] text-[20px]">medical_services</span>
                  <h3 className="text-lg font-bold text-[#123B6D]">Nursing Sciences</h3>
                </div>
                <p className="text-xs text-[#4B5563]">Professional healthcare degrees with hospital clinical attachments</p>
                <div className="flex flex-wrap gap-1.5 pt-3">
                  <span className="px-2.5 py-1 rounded-md bg-[#F4F8FC] border border-slate-200 text-[#1F2937] text-[11px]">B.Sc Nursing</span>
                  <span className="px-2.5 py-1 rounded-md bg-[#F4F8FC] border border-slate-200 text-[#1F2937] text-[11px]">Post Basic B.Sc</span>
                  <span className="px-2.5 py-1 rounded-md bg-[#F4F8FC] border border-slate-200 text-[#1F2937] text-[11px]">M.Sc Nursing</span>
                  <span className="px-2.5 py-1 rounded-md bg-[#F4F8FC] border border-slate-200 text-[#1F2937] text-[11px]">GNM</span>
                </div>
              </div>
              <a
                href="#register-form"
                className="w-full py-2.5 rounded-xl bg-[#EAF2FB] hover:bg-[#123B6D] text-[#123B6D] hover:text-white text-xs font-bold transition-all text-center block"
              >
                View Nursing Colleges
              </a>
            </div>
          </div>

          {/* 3. Allied Health Sciences */}
          <div className="rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#00A6A6] shadow-sm hover:shadow-md overflow-hidden flex flex-col group transition-all">
            <div className="h-44 w-full relative overflow-hidden bg-slate-100">
              <img
                src={alliedHealthImg}
                alt="Allied health science students in clinical diagnostic training"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-[#10B981] text-[11px] font-bold border border-slate-200">
                  Hospital Attached
                </span>
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="material-symbols-outlined text-[#00A6A6] text-[20px]">vital_signs</span>
                  <h3 className="text-lg font-bold text-[#123B6D]">Allied Health Sciences</h3>
                </div>
                <p className="text-xs text-[#4B5563]">Paramedical clinical specialties affiliated with hospital trusts</p>
                <div className="flex flex-wrap gap-1.5 pt-3">
                  <span className="px-2.5 py-1 rounded-md bg-[#F4F8FC] border border-slate-200 text-[#1F2937] text-[11px]">B.Sc MLT</span>
                  <span className="px-2.5 py-1 rounded-md bg-[#F4F8FC] border border-slate-200 text-[#1F2937] text-[11px]">BPT Physiotherapy</span>
                  <span className="px-2.5 py-1 rounded-md bg-[#F4F8FC] border border-slate-200 text-[#1F2937] text-[11px]">Radiology &amp; Imaging</span>
                  <span className="px-2.5 py-1 rounded-md bg-[#F4F8FC] border border-slate-200 text-[#1F2937] text-[11px]">Cardiac Care</span>
                </div>
              </div>
              <a
                href="#register-form"
                className="w-full py-2.5 rounded-xl bg-[#EAF2FB] hover:bg-[#123B6D] text-[#123B6D] hover:text-white text-xs font-bold transition-all text-center block"
              >
                Enquire Allied Health
              </a>
            </div>
          </div>

          {/* 4. Management */}
          <div className="rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#00A6A6] shadow-sm hover:shadow-md overflow-hidden flex flex-col group transition-all">
            <div className="h-44 w-full relative overflow-hidden bg-slate-100">
              <img
                src={businessSchoolImg}
                alt="Business school management students collaborating"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-[#123B6D] text-[11px] font-bold border border-slate-200">
                  UG / PG Business
                </span>
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="material-symbols-outlined text-[#00A6A6] text-[20px]">leaderboard</span>
                  <h3 className="text-lg font-bold text-[#123B6D]">Management &amp; Commerce</h3>
                </div>
                <p className="text-xs text-[#4B5563]">Corporate and industry-aligned leadership degrees</p>
                <div className="flex flex-wrap gap-1.5 pt-3">
                  <span className="px-2.5 py-1 rounded-md bg-[#F4F8FC] border border-slate-200 text-[#1F2937] text-[11px]">BBA / MBA</span>
                  <span className="px-2.5 py-1 rounded-md bg-[#F4F8FC] border border-slate-200 text-[#1F2937] text-[11px]">Hospital Administration</span>
                  <span className="px-2.5 py-1 rounded-md bg-[#F4F8FC] border border-slate-200 text-[#1F2937] text-[11px]">Logistics &amp; Supply Chain</span>
                </div>
              </div>
              <a
                href="#register-form"
                className="w-full py-2.5 rounded-xl bg-[#EAF2FB] hover:bg-[#123B6D] text-[#123B6D] hover:text-white text-xs font-bold transition-all text-center block"
              >
                View Management Programs
              </a>
            </div>
          </div>

          {/* 5. Computer Science / IT */}
          <div className="rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#00A6A6] shadow-sm hover:shadow-md overflow-hidden flex flex-col group transition-all">
            <div className="h-44 w-full relative overflow-hidden bg-slate-100">
              <img
                src={softwareDevImg}
                alt="Software engineering and IT students coding in computer lab"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-[#00A6A6] text-[11px] font-bold border border-slate-200">
                  Tech Incubator
                </span>
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="material-symbols-outlined text-[#00A6A6] text-[20px]">laptop_chromebook</span>
                  <h3 className="text-lg font-bold text-[#123B6D]">Computer Science / IT</h3>
                </div>
                <p className="text-xs text-[#4B5563]">Pure software engineering, application architecture &amp; security</p>
                <div className="flex flex-wrap gap-1.5 pt-3">
                  <span className="px-2.5 py-1 rounded-md bg-[#F4F8FC] border border-slate-200 text-[#1F2937] text-[11px]">BCA / MCA</span>
                  <span className="px-2.5 py-1 rounded-md bg-[#F4F8FC] border border-slate-200 text-[#1F2937] text-[11px]">Data Science</span>
                  <span className="px-2.5 py-1 rounded-md bg-[#F4F8FC] border border-slate-200 text-[#1F2937] text-[11px]">Cyber Security</span>
                </div>
              </div>
              <a
                href="#register-form"
                className="w-full py-2.5 rounded-xl bg-[#EAF2FB] hover:bg-[#123B6D] text-[#123B6D] hover:text-white text-xs font-bold transition-all text-center block"
              >
                View IT Options
              </a>
            </div>
          </div>

          {/* 6. Other Professional Courses */}
          <div className="rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#00A6A6] shadow-sm hover:shadow-md overflow-hidden flex flex-col group transition-all">
            <div className="h-44 w-full relative overflow-hidden bg-slate-100">
              <img
                src={pharmacyImg}
                alt="Pharmacy students conducting research in pharmaceutical lab"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-[#123B6D] text-[11px] font-bold border border-slate-200">
                  PCI / Council Approved
                </span>
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="material-symbols-outlined text-[#00A6A6] text-[20px]">balance</span>
                  <h3 className="text-lg font-bold text-[#123B6D]">Professional Specializations</h3>
                </div>
                <p className="text-xs text-[#4B5563]">Statutory council approved pathways with legal and technical accreditations</p>
                <div className="flex flex-wrap gap-1.5 pt-3">
                  <span className="px-2.5 py-1 rounded-md bg-[#F4F8FC] border border-slate-200 text-[#1F2937] text-[11px]">B.Pharm / Pharm.D</span>
                  <span className="px-2.5 py-1 rounded-md bg-[#F4F8FC] border border-slate-200 text-[#1F2937] text-[11px]">LLB 3 &amp; 5 Yrs</span>
                  <span className="px-2.5 py-1 rounded-md bg-[#F4F8FC] border border-slate-200 text-[#1F2937] text-[11px]">Architecture (B.Arch)</span>
                </div>
              </div>
              <a
                href="#register-form"
                className="w-full py-2.5 rounded-xl bg-[#EAF2FB] hover:bg-[#123B6D] text-[#123B6D] hover:text-white text-xs font-bold transition-all text-center block"
              >
                Explore Specializations
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
