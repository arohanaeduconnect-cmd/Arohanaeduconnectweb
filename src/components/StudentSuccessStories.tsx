import React, { useState } from 'react';

interface Story {
  id: string;
  name: string;
  location: string;
  course: string;
  institution: string;
  batch: string;
  category: 'health' | 'tech' | 'management' | 'pharma';
  outcome: string;
  quote: string;
  avatarColor: string;
  initials: string;
}

const stories: Story[] = [
  {
    id: '1',
    name: 'Anjali Menon',
    location: 'Kottayam, Kerala',
    course: 'B.Sc Nursing',
    institution: 'Vydehi Institute of Medical Sciences, Bengaluru',
    batch: 'Batch 2024-28',
    category: 'health',
    outcome: 'Clinical attachment at 1,000-bed hospital',
    quote:
      'My parents were really anxious about hostel safety and high hidden fees in Bengaluru. Arohana Edu Connect gave us transparent fee breakdowns with zero donation, arranged a direct campus visit with hostel inspection, and helped with education loan paperwork. Today, I am in my second year with fantastic clinical exposure!',
    avatarColor: 'bg-emerald-500',
    initials: 'AM',
  },
  {
    id: '2',
    name: 'Muhammed Roshan',
    location: 'Kozhikode, Kerala',
    course: 'B.Tech AI & Data Science',
    institution: 'Presidency University, Bengaluru',
    batch: 'Batch 2023-27',
    category: 'tech',
    outcome: 'Completed AWS cloud internship; pre-placement training',
    quote:
      'After Plus Two CBSE, I was overwhelmed by contrasting university advertisements. Arohana did an honest aptitude review, compared modern lab setups between Coimbatore and Bangalore, and secured a direct merit scholarship seat for me. Their guidance was 100% genuine and stress-free.',
    avatarColor: 'bg-blue-600',
    initials: 'MR',
  },
  {
    id: '3',
    name: 'Deepa Varghese',
    location: 'Thrissur, Kerala',
    course: 'BPT (Physiotherapy)',
    institution: 'Father Muller Medical College, Mangalore',
    batch: 'Batch 2024-28',
    category: 'health',
    outcome: 'Rotational clinical posting in sports & neuro rehab',
    quote:
      'We visited multiple local agencies who asked for exorbitant service charges. Arohana Edu Connect took the time to explain the difference between private autonomous colleges and RGUHS-affiliated medical institutes for free. My admission was processed within two weeks directly at the college office.',
    avatarColor: 'bg-teal-600',
    initials: 'DV',
  },
  {
    id: '4',
    name: 'Rahul Nair',
    location: 'Ernakulam, Kerala',
    course: 'MBA Logistics & Supply Chain',
    institution: 'Alliance School of Business, Bengaluru',
    batch: 'Batch 2024-26',
    category: 'management',
    outcome: 'Summer internship offer at DP World logistics',
    quote:
      'I wanted a practical corporate-focused PG program after my B.Com. Arohana helped me choose between university MBA programs and AICTE-approved PGDM options based on real placement statistics, not brochure promises. Highly recommended for students wanting reliable career guidance.',
    avatarColor: 'bg-indigo-600',
    initials: 'RN',
  },
  {
    id: '5',
    name: 'Sneha Thomas',
    location: 'Palakkad, Kerala',
    course: 'Pharm.D (Doctor of Pharmacy)',
    institution: 'Al-Ameen College of Pharmacy, Bengaluru',
    batch: 'Batch 2023-29',
    category: 'pharma',
    outcome: 'PCI accredited; hospital rounds at Bowring Hospital',
    quote:
      'Pharm.D is a 6-year rigorous clinical degree, so getting into an institution with a solid NABH-accredited hospital attachment was crucial. Arohana clarified the career differences between B.Pharm and Pharm.D with my father in Malayalam, making the decision crystal clear.',
    avatarColor: 'bg-rose-500',
    initials: 'ST',
  },
  {
    id: '6',
    name: 'Adarsh K.S.',
    location: 'Kollam, Kerala',
    course: 'B.Sc Medical Laboratory Technology (MLT)',
    institution: 'AJ Institute of Medical Sciences, Mangalore',
    batch: 'Batch 2024-27',
    category: 'health',
    outcome: 'Hands-on advanced molecular diagnostic pathology training',
    quote:
      'Budget was our biggest constraint as a middle-class family. Arohana found an excellent paramedical seat within our exact ₹2.5 Lakhs/year budget with clean Kerala mess food in the hostel. Their team stayed in touch even after classes started to ensure everything was fine.',
    avatarColor: 'bg-amber-600',
    initials: 'AK',
  },
];

export const StudentSuccessStories: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'health' | 'tech' | 'management' | 'pharma'>('all');

  const filteredStories =
    activeFilter === 'all'
      ? stories
      : stories.filter((s) => s.category === activeFilter);

  return (
    <section id="success-stories" className="w-full bg-[#F8FAFC] py-20 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E6F7F7] border border-[#00A6A6]/30 text-[#008686] text-xs uppercase tracking-wider font-bold">
            <span className="material-symbols-outlined text-[15px]">verified</span>
            Student Success &amp; Social Proof
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#123B6D] tracking-tight">
            From Kerala Classrooms to Premier Campuses
          </h2>
          <p className="text-base text-[#4B5563]">
            Real testimonials from Kerala students and parents who found clarity, verified college affiliations, and secure admissions through Arohana Edu Connect.
          </p>
        </div>

        {/* Quick Social Proof KPI Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#123B6D]">500+</div>
            <div className="text-xs text-slate-500 font-medium mt-1">Students Guided &amp; Placed</div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#00A6A6]">4.9 / 5.0</div>
            <div className="text-xs text-slate-500 font-medium mt-1">Parent &amp; Student Satisfaction</div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#10B981]">100%</div>
            <div className="text-xs text-slate-500 font-medium mt-1">Verified Council Accreditations</div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#123B6D]">₹0</div>
            <div className="text-xs text-slate-500 font-medium mt-1">Free Initial Career Counselling</div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeFilter === 'all'
                ? 'bg-[#123B6D] text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
            }`}
          >
            All Stories ({stories.length})
          </button>
          <button
            onClick={() => setActiveFilter('health')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeFilter === 'health'
                ? 'bg-[#123B6D] text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
            }`}
          >
            Nursing &amp; Allied Health
          </button>
          <button
            onClick={() => setActiveFilter('tech')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeFilter === 'tech'
                ? 'bg-[#123B6D] text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
            }`}
          >
            Engineering &amp; IT
          </button>
          <button
            onClick={() => setActiveFilter('management')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeFilter === 'management'
                ? 'bg-[#123B6D] text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
            }`}
          >
            Management &amp; MBA
          </button>
          <button
            onClick={() => setActiveFilter('pharma')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeFilter === 'pharma'
                ? 'bg-[#123B6D] text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
            }`}
          >
            Pharmacy &amp; Paramedical
          </button>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-[#00A6A6] transition-all relative group"
            >
              {/* Top Quote Icon & Rating */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-[18px] fill-current">
                        star
                      </span>
                    ))}
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#10B981] border border-emerald-200 text-[10px] font-bold uppercase tracking-wider">
                    {story.batch}
                  </span>
                </div>

                {/* Testimonial Quote */}
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed italic">
                  "{story.quote}"
                </p>

                {/* Key Outcome Highlight */}
                <div className="p-2.5 rounded-xl bg-[#F4F8FC] border border-[#CBDFF2]/60 flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#00A6A6] text-[18px] flex-shrink-0 mt-0.5">
                    task_alt
                  </span>
                  <div className="text-[11px] text-[#123B6D] font-medium leading-snug">
                    <strong className="font-bold">Milestone: </strong>
                    {story.outcome}
                  </div>
                </div>
              </div>

              {/* Student Profile Card Footer */}
              <div className="pt-5 mt-5 border-t border-slate-100 flex items-center gap-3.5">
                <div
                  className={`w-11 h-11 rounded-full ${story.avatarColor} text-white font-bold flex items-center justify-center text-sm flex-shrink-0 shadow-sm`}
                >
                  {story.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold text-[#123B6D] truncate">{story.name}</h4>
                    <span
                      className="material-symbols-outlined text-blue-500 text-[15px]"
                      title="Verified Admission"
                    >
                      verified
                    </span>
                  </div>
                  <div className="text-[11px] text-[#00A6A6] font-semibold truncate">
                    {story.course}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate flex items-center gap-1 mt-0.5">
                    <span className="material-symbols-outlined text-[13px] text-slate-400">
                      location_on
                    </span>
                    <span>{story.location}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 truncate mt-0.5">
                    {story.institution}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Parent Trust Box */}
        <div className="mt-12 bg-white rounded-2xl border border-[#CBDFF2] p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#EAF2FB] border border-[#CBDFF2] text-[#123B6D] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[26px]">family_restroom</span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-[#123B6D]">Parent Assurance Guarantee</h3>
                <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                  Zero Direct Cash Handover
                </span>
              </div>
              <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
                All tuition fees are paid directly to verified college bank accounts or demand drafts. We arrange direct hostel inspections and Malayalam language support for parents from Kasaragod to Thiruvananthapuram.
              </p>
            </div>
          </div>
          <a
            href="#register-form"
            className="w-full md:w-auto px-6 py-3 rounded-xl bg-[#123B6D] hover:bg-[#00A6A6] text-white text-xs sm:text-sm font-bold shadow-sm transition-all whitespace-nowrap text-center flex items-center justify-center gap-2"
          >
            <span>Book Your Free Consultation</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </a>
        </div>
      </div>
    </section>
  );
};
