import React from 'react';

export const GlobalEdu: React.FC = () => {
  return (
    <section className="w-full py-20 max-w-7xl mx-auto px-6 lg:px-12" id="global-edu">
      <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-[#123B6D] via-[#103460] to-[#0A2548] text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-[#00A6A6]/20 blur-3xl pointer-events-none"></div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-8 space-y-5">
            <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-2xl bg-white/15 border border-white/25 backdrop-blur-md mb-2">
              <div className="h-8 w-24 sm:w-28 flex items-center">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBy1ZwUZULs0-wVFQK81rk8t7R3k2558jpy9UnKIxxPzMUPceVPeP6U9G5Cm2ybqGa__dmqKL7nx5ebGIGSfKUu_tLT0niu0EYN2n2TgfO3tnpzHBrIi_heoVzbx0eB1XorVG18e2wZUhODL433YqOTZdPCZrnjHkM5M-BDsSI2BZzaUhLL5WQ9CTJ23vF6k7fwqEfbVuQKlBM2FZ8W06gJQQ9TZMQt05BgtaV_jiOVb1v0B6vq9NhpJxlM_R7Zjkfu0A"
                  alt="Arohana Edu Connect Global"
                  className="h-full w-auto object-contain brightness-0 invert"
                />
              </div>
              <span className="text-xs text-white/90 font-bold uppercase tracking-wider border-l border-white/25 pl-2">
                Global Division
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Global Education — Coming Soon
            </h2>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
              Education has no boundaries. Arohana Edu Connect plans to expand its services beyond India and support students who wish to explore international education opportunities across Europe, the UK, Australia, and Canada.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <span className="px-4 py-1.5 rounded-xl bg-white/15 border border-white/20 text-white text-xs font-bold shadow-sm">
                Coming Soon • Roadmap 2026-2027
              </span>
            </div>
          </div>
          <div className="lg:col-span-4 flex justify-center">
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-white/10 border border-white/25 backdrop-blur-md flex items-center justify-center p-6 shadow-2xl">
              <span className="material-symbols-outlined text-[80px] text-[#00A6A6] animate-pulse">language</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
