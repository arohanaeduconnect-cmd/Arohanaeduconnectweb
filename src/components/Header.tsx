import React, { useState } from 'react';

interface HeaderProps {
  onOpenSettingsModal: () => void;
  isEndpointConfigured: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSettingsModal, isEndpointConfigured }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-[0_2px_12px_rgba(18,59,109,0.06)]">
      <div className="h-20 max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-4 min-h-[84px]">
        <a className="flex items-center gap-3.5 flex-shrink-0 py-2" href="#">
          <div className="h-16 sm:h-20 flex items-center">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZhw06u-1yJzUWXwR_NSJCvgGlEmSIqtWMnYRUwr8dC7e8wNuRNNGbVy0a32uwekO-ugH4aAnpRh0Hrw-aQ6xPtMNRRVnD7lTHn4N2UBuaUjgBjb-olItwjQQmhSX34SR9PV1zP9kru4SjquxWYSH0_xfT-NBwgZxYfxMO4xrb-oAWMz5UpvuqX0-AhFijcIlzY8OX0Ck_L4vP0Czt5QpK1GrKhSDfrv6n6u8jSXuwCEVtDOD2KRPM7UVoujNl-A6jsw"
              alt="Arohana Edu Connect Logo"
              className="h-16 sm:h-20 w-auto object-contain"
            />
          </div>
        </a>

        <nav className="hidden xl:flex items-center gap-1">
          <a aria-current="page" className="px-3.5 py-2 rounded-lg text-sm font-semibold text-[#123B6D] bg-[#EAF2FB] border border-[#CBDFF2] transition-all" href="#">Home</a>
          <a className="px-3 py-2 rounded-lg text-sm text-[#4B5563] hover:text-[#123B6D] hover:bg-[#F4F8FC] transition-colors" href="#visual-showcase">Experience</a>
          <a className="px-3 py-2 rounded-lg text-sm text-[#4B5563] hover:text-[#123B6D] hover:bg-[#F4F8FC] transition-colors" href="#about">About Us</a>
          <a className="px-3 py-2 rounded-lg text-sm text-[#4B5563] hover:text-[#123B6D] hover:bg-[#F4F8FC] transition-colors" href="#services">Services</a>
          <a className="px-3 py-2 rounded-lg text-sm text-[#4B5563] hover:text-[#123B6D] hover:bg-[#F4F8FC] transition-colors" href="#courses">Courses</a>
          <a className="px-3 py-2 rounded-lg text-sm text-[#4B5563] hover:text-[#123B6D] hover:bg-[#F4F8FC] transition-colors" href="#colleges">Colleges</a>
          <a className="px-3 py-2 rounded-lg text-sm text-[#4B5563] hover:text-[#123B6D] hover:bg-[#F4F8FC] transition-colors" href="#roadmap">Guidance Steps</a>
          <a className="px-3 py-2 rounded-lg text-sm text-[#4B5563] hover:text-[#123B6D] hover:bg-[#F4F8FC] transition-colors" href="#success-stories">Stories</a>
          <a className="px-3 py-2 rounded-lg text-sm text-[#4B5563] hover:text-[#123B6D] hover:bg-[#F4F8FC] transition-colors" href="#contact">Contact</a>
        </nav>

        <div className="flex items-center gap-3">
          <a
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#10B981] text-white hover:bg-[#059669] transition-all shadow-[0_2px_10px_rgba(16,185,129,0.3)] font-medium"
            href="https://wa.me/917012908174"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            <span className="text-xs font-semibold">Chat on WhatsApp</span>
            <span className="px-1.5 py-0.5 rounded-full bg-white/25 text-white text-[10px] uppercase font-bold animate-pulse">Online</span>
          </a>

          <a
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-[#F59E0B] text-white hover:bg-[#D97706] font-bold text-sm shadow-[0_4px_14px_rgba(245,158,11,0.35)] active:scale-[0.99] transition-all"
            href="#register-form"
          >
            <span>Register Now</span>
          </a>

          {/* Apps Script Endpoint Settings Tool */}
          <button
            onClick={onOpenSettingsModal}
            title={isEndpointConfigured ? 'Apps Script Endpoint: Active' : 'Configure Apps Script Web App Endpoint'}
            className="relative w-9 h-9 rounded-full bg-[#EAF2FB] hover:bg-[#CBDFF2] border border-[#CBDFF2] flex items-center justify-center flex-shrink-0 text-[#123B6D] shadow-sm transition-all cursor-pointer"
            aria-label="Apps Script Endpoint Settings"
          >
            <span className="material-symbols-outlined text-[18px]">terminal</span>
            {isEndpointConfigured && (
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#10B981] border-2 border-white"></span>
            )}
          </button>

          {/* Mobile menu hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-700"
            aria-label="Toggle Navigation"
          >
            <span className="material-symbols-outlined text-[22px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-2 shadow-lg">
          <a onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-semibold text-[#123B6D]" href="#">Home</a>
          <a onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-[#4B5563]" href="#visual-showcase">Experience</a>
          <a onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-[#4B5563]" href="#about">About Us</a>
          <a onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-[#4B5563]" href="#services">Services</a>
          <a onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-[#4B5563]" href="#courses">Courses</a>
          <a onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-[#4B5563]" href="#colleges">Colleges</a>
          <a onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-[#4B5563]" href="#roadmap">Guidance Steps</a>
          <a onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-[#4B5563]" href="#contact">Contact</a>
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <a
              className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg bg-[#10B981] text-white text-xs font-semibold"
              href="https://wa.me/917012908174"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              Chat on WhatsApp
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSettingsModal();
              }}
              className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg bg-[#EAF2FB] text-[#123B6D] text-xs font-semibold border border-[#CBDFF2]"
            >
              <span className="material-symbols-outlined text-[18px]">terminal</span>
              Endpoint Settings
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
