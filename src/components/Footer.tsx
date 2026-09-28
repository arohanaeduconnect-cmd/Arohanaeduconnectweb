import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#0A2548] text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-700/60">
          {/* Brand description with official emblem */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200 shadow-md w-fit">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD48ZCxqr4omOHznVUbHpMaK41KfQtKF6WKxsvkIzWUgwJfFHyWV7lSphVioDyMS7XevSf1tUkjyaoxXmDAo23TLAKpHDVZZ2dOk3fteKHFkF_uOSuQhc4_uJgMALHk6hcqioXZy343jp3EadIcNB6LeM6PTTxltWmwGT0v1eM_Bfc04xv_od-xkBhsDVhHGtGHDJkwadQJwtH_5zQbh8A883E414RKH7TnBylW4UFPumDT0l9Iup_DCgx5WkmsOFwywg"
                alt="Arohana Edu Connect Logo"
                className="h-16 sm:h-20 w-auto object-contain"
              />
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Empowering aspiring students across South India and beyond with accredited admission counseling, transparent university matrices, and ethical career pathway planning.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-[#00A6A6] uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#visual-showcase" className="hover:text-white transition-colors">Campus Tour</a></li>
              <li><a href="#courses" className="hover:text-white transition-colors">Courses</a></li>
              <li><a href="#colleges" className="hover:text-white transition-colors">Colleges</a></li>
            </ul>
          </div>

          {/* Regional Hubs */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-[#00A6A6] uppercase tracking-wider">Regional Desks</h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li><strong className="text-white">Kerala:</strong> Kochi, Calicut &amp; TVM</li>
              <li><strong className="text-white">Tamil Nadu:</strong> Chennai &amp; Coimbatore</li>
              <li><strong className="text-white">Karnataka:</strong> Bengaluru &amp; Mangaluru</li>
              <li><strong className="text-white">Telangana:</strong> Hyderabad</li>
            </ul>
          </div>

          {/* Official Help */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-[#00A6A6] uppercase tracking-wider">Admissions Helpdesk</h4>
            <div className="space-y-2 text-xs text-slate-300">
              <p>Mullamkuzhy, TKS Road, Maradu, Kochi, Ernakulam, Kerala, PIN 682304</p>
              <p className="text-[#00A6A6] font-bold">+91 70129 08174</p>
              <p>admissions@arohanaedu.com</p>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 Arohana Edu Connect. All Rights Reserved. Ethical Admission Guidance.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-200">Privacy Policy</a>
            <a href="#" className="hover:text-slate-200">Terms of Service</a>
            <a href="#" className="hover:text-slate-200">Grievance Redressal</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
