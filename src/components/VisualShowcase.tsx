import React, { useState } from 'react';
import campusQuadImg from '../assets/images/campus_students_quad_1790541214393.jpg';
import aiRoboticsImg from '../assets/images/ai_robotics_lab_1790541231720.jpg';
import nursingSimImg from '../assets/images/nursing_clinical_sim_1790541246897.jpg';

const slidesData = [
  {
    category: '1. 1-on-1 Student Guidance',
    badgeText: 'Verified Advisory Desk',
    title: 'Personalised Counselling with Parents Involved',
    description: 'Every admission pathway begins with an empathetic, open discussion. We evaluate marks, passions, and family constraints in Malayalam or English to pinpoint genuine opportunities.',
    highlights: [
      '100% transparent fee breakdowns with zero hidden fees',
      'Direct coordination with student and parents together',
      'Hostel safety and regional climate evaluation',
    ],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTRboeQnU2TpJN2_YNBVPhhtyvog7e6ERC5GTSiXtgCl9-uvoJOL4rq-V5yEtkXQHk1tTbGwzTWOAJ88mw3w_0Tb3FM21CuunH84fLaHedtYa-ayDsGZACV95OVbzUSiaxVpRz5r00eCfuwXMJ3zwAxFtz7SF88tsStjVNqJWXcHMUe--YzCggqbgb7WzRMAVRZ82JThnAeBGw7JAqsgPOevubiTEy0Q-4PxXBuv-JUzXK3Etdqz28',
    alt: 'Academic counsellor discussing higher education pathways with South Indian student and parents in Kerala office',
    ctaPrimary: 'Book Counselling Session',
    ctaPrimaryLink: '#register-form',
    ctaSecondary: 'Chat on WhatsApp',
    ctaSecondaryLink: 'https://wa.me/917012908174',
    primaryColor: '#00A6A6',
    topBadgeImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJoezhgq0cTEUar6idiyrZAZ86g8TnhCAjX5XuceuUTn456wIdjDdq79Re4pqKb3eRgC3doq1CUsH3Mh-M_GRiTNLmp0yXVq8dS1ynJ-dtt1t7N8OJbIbFJtspWn_VxG8ZiL7WHZPbZqLNvib7k8Xtvxvp6SL5ow2EJk3oazear8vi0gdj8cptz8a-Q8BPlVKrXMbW-cOnKt3BXI49tM3rrkYjHWjUP-x-CXc32OLoxUPj6oKgjAcOSEbxTmlAW9HEnQ',
    subEmblem: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzBNdsAZEa63H_rCpUCaP1bZmVy1GxPU_jbjE8RMjtOAnqNgv2L2f2hTiwDBwT69FskcUcKZTQGndiv4S-xPvBZW3pciHiDzGWInldnDLS1OoK1zuNuzoIkiZJXpnJVx5qblIoPdTPEXPZWAKkDvrIs0ignS6z8vHfk8DoMMsQvX_y-6GRRtcbUs4zjE3qJNJjblSoQQcBJFCrFeKJRkMs3tR2ZpWylRcfr_M2HPhWz0nwBcdCbYprSFTcQ6duECqdNw',
  },
  {
    category: '2. South Indian Campus Life',
    badgeText: 'Premier University Quads',
    title: 'Vibrant Campus Life Across South Indian Universities',
    description: 'Join thriving collegiate communities across Kerala, Bengaluru, Chennai, and Hyderabad. Experience lush green campuses, modern amenities, diverse student bodies, and warm student-friendly hubs.',
    highlights: [
      "NAAC 'A++' and NIRF top-ranked university campuses",
      'Kerala mess cuisine and secure hostel accommodation',
      'Active cultural festivals, sports grounds, and student clubs',
    ],
    image: campusQuadImg,
    alt: 'Vibrant South Indian Campus Life & Top Universities',
    ctaPrimary: 'Explore Campuses',
    ctaPrimaryLink: '#colleges',
    ctaSecondary: 'Check Eligibility',
    ctaSecondaryLink: '#register-form',
    primaryColor: '#123B6D',
  },
  {
    category: '3. High-Tech Engineering & AI Labs',
    badgeText: 'Industry 4.0 Labs & AI Centers',
    title: 'Cutting-Edge Engineering & Robotics Labs',
    description: 'Gain exposure to advanced AI computing clusters, industrial robotics arms, 3D prototyping spaces, and tech incubators that turn academic knowledge into elite software and hardware careers.',
    highlights: [
      'AICTE & NBA-accredited B.Tech and Computer Science programs',
      'Industry corporate partnerships (TCS, Infosys, Cisco, Bosch)',
      'High placement statistics with transparent CTC reports',
    ],
    image: aiRoboticsImg,
    alt: 'World-Class Engineering, AI & Robotics Laboratories',
    ctaPrimary: 'View Tech Specializations',
    ctaPrimaryLink: '#courses',
    ctaSecondary: 'Check Cutoffs',
    ctaSecondaryLink: '#register-form',
    primaryColor: '#00A6A6',
  },
  {
    category: '4. Healthcare & Clinical Simulation',
    badgeText: 'Clinical Simulation Excellence',
    title: 'Nursing Sciences & Paramedical Training',
    description: 'Step directly into multi-speciality teaching hospitals. Master clinical skills on advanced simulation mannequins, patient care modules, and high-standard medical diagnostics.',
    highlights: [
      'INC & State Nursing Council recognized institutions',
      'NABH-accredited 750+ bed hospital clinical attachments',
      'Global recognition: Pathways for UK, Ireland, Germany & Gulf',
    ],
    image: nursingSimImg,
    alt: 'Clinical Healthcare & Nursing Excellence Simulation Training',
    ctaPrimary: 'Nursing & Allied Health',
    ctaPrimaryLink: '#courses',
    ctaSecondary: 'Enquire Seats',
    ctaSecondaryLink: '#register-form',
    primaryColor: '#10B981',
  },
];

export const VisualShowcase: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slidesData.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slidesData.length) % slidesData.length);

  const slide = slidesData[currentSlide];

  return (
    <section className="w-full bg-gradient-to-b from-white via-[#F4F8FC] to-white border-y border-slate-200 py-20" id="visual-showcase">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Header with Badges & Slide Arrows */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E6F7F7] border border-[#00A6A6]/30 text-[#008686] text-xs uppercase tracking-wider font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#00A6A6] animate-ping"></span>
              Campus Realities &amp; Guidance In Action
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#123B6D] tracking-tight">
              Explore the Arohana Academic Experience
            </h2>
            <p className="text-base text-[#4B5563]">
              Step into authentic campus environments across South India. From dedicated parent counselling desks to ultra-modern robotics and clinical hospital wards, witness where your educational journey begins.
            </p>
          </div>

          {/* Slide Controls / Arrows */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <div className="px-3.5 py-1.5 rounded-full bg-white border border-[#CBDFF2] text-xs font-bold text-[#123B6D] shadow-sm">
              <span>0{currentSlide + 1}</span> / <span className="text-slate-400">04</span>
            </div>
            <button
              onClick={prevSlide}
              aria-label="Previous Slide"
              className="w-11 h-11 rounded-xl bg-white hover:bg-[#123B6D] hover:text-white text-[#123B6D] border border-[#CBDFF2] shadow-sm flex items-center justify-center transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">chevron_left</span>
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next Slide"
              className="w-11 h-11 rounded-xl bg-[#00A6A6] hover:bg-[#008686] text-white shadow-[0_4px_12px_rgba(0,166,166,0.3)] flex items-center justify-center transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">chevron_right</span>
            </button>
          </div>
        </div>

        {/* Category Pill Switchers (Interactive Tabs) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {slidesData.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer ${
                currentSlide === idx
                  ? 'bg-[#123B6D] text-white font-bold shadow-sm'
                  : 'bg-white text-[#4B5563] font-semibold border border-slate-200 hover:border-[#00A6A6]'
              }`}
            >
              {item.category}
            </button>
          ))}
        </div>

        {/* Main Dynamic Slider Frame */}
        <div className="relative rounded-3xl overflow-hidden bg-white border border-[#CBDFF2] shadow-[0_12px_44px_rgba(18,59,109,0.12)]">
          <div className="relative w-full min-h-[480px] lg:min-h-[520px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 h-full">
              {/* Image side */}
              <div className="lg:col-span-7 h-72 sm:h-96 lg:h-full relative overflow-hidden bg-slate-900">
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="w-full h-full object-cover transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden"></div>
                
                {slide.topBadgeImg ? (
                  <div className="absolute top-4 left-4 px-4 py-2 rounded-2xl bg-white/95 backdrop-blur-md border border-[#CBDFF2] shadow-lg flex items-center gap-3">
                    <div className="h-8 sm:h-9 w-36 sm:w-44 flex items-center flex-shrink-0">
                      <img
                        src={slide.topBadgeImg}
                        alt="Arohana Edu Connect Verified Track"
                        className="h-full w-auto object-contain"
                      />
                    </div>
                    <div className="h-4 w-px bg-slate-300"></div>
                    <span className="text-xs font-bold text-[#123B6D] flex items-center gap-1.5">
                      Verified Guidance Desk <span className="material-symbols-outlined text-[#00A6A6] text-[16px]">verified</span>
                    </span>
                  </div>
                ) : (
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md border border-white/40 shadow-md flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
                    <span className="text-xs font-bold text-[#123B6D]">{slide.badgeText}</span>
                  </div>
                )}
              </div>

              {/* Text side */}
              <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 flex flex-col justify-between bg-white">
                <div className="space-y-4">
                  {slide.subEmblem ? (
                    <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-[#F4F8FC] border border-[#CBDFF2] w-fit">
                      <div className="h-10 sm:h-11 w-40 sm:w-48 flex items-center">
                        <img
                          src={slide.subEmblem}
                          alt="Arohana Edu Connect"
                          className="h-full w-auto object-contain"
                        />
                      </div>
                      <div className="h-5 w-px bg-slate-300"></div>
                      <span className="text-xs font-bold text-[#008686] uppercase tracking-wider">
                        Arohana Verified Advisory
                      </span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6F7F7] text-[#008686] text-xs font-bold">
                      {slide.badgeText}
                    </div>
                  )}

                  <h3 className="font-display text-2xl lg:text-3xl font-extrabold text-[#123B6D]">
                    {slide.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
                    {slide.description}
                  </p>
                  <div className="space-y-2 pt-2">
                    {slide.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-[#1F2937]">
                        <span className="material-symbols-outlined text-[#00A6A6] text-[18px]">check_circle</span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 flex flex-wrap items-center gap-4">
                  <a
                    href={slide.ctaPrimaryLink}
                    className="px-6 py-3 rounded-xl bg-[#00A6A6] hover:bg-[#008686] text-white font-bold text-sm shadow-[0_4px_14px_rgba(0,166,166,0.3)] transition-all"
                  >
                    {slide.ctaPrimary}
                  </a>
                  <a
                    href={slide.ctaSecondaryLink}
                    target={slide.ctaSecondaryLink.startsWith('http') ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-xl bg-[#EAF2FB] hover:bg-[#123B6D] text-[#123B6D] hover:text-white font-semibold text-sm transition-all border border-[#CBDFF2]"
                  >
                    {slide.ctaSecondary}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Slide Indicator Dots */}
          <div className="px-8 py-4 bg-[#F4F8FC] border-t border-[#CBDFF2] flex items-center justify-between">
            <div className="flex items-center gap-2">
              {slidesData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                    currentSlide === idx ? 'bg-[#123B6D]' : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to Slide ${idx + 1}`}
                />
              ))}
            </div>
            <span className="text-xs text-[#4B5563] hidden sm:inline font-medium">
              Click tabs or arrows to preview authentic student experiences
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
