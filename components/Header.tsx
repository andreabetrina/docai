
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-20 bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        {/* Hamburger Menu */}
        <button className="p-1.5 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
        
        {/* Logo and Plan */}
        <div className="flex flex-col">
          <div className="flex items-center">
            <span className="text-xl font-extrabold text-[#2563eb] tracking-tight">doct</span>
            <div className="relative flex items-center justify-center w-5 h-5 mx-0.5 mt-0.5">
              <div className="absolute inset-0 bg-[#2563eb] rounded-full opacity-10"></div>
              <svg className="w-4 h-4 text-[#2563eb]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <span className="text-xl font-extrabold text-[#2563eb] tracking-tight">ai</span>
          </div>
          <span className="text-[10px] text-slate-500 font-bold -mt-1 ml-0.5">Plan: FREE</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Translation Icon */}
        <button className="p-1.5 text-slate-600 hover:bg-slate-50 rounded-full transition-colors">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 8 6 6" />
            <path d="m4 14 6-6 2-3" />
            <path d="M2 5h12" />
            <path d="M7 2h1" />
            <path d="m22 22-5-10-5 10" />
            <path d="M14 18h6" />
          </svg>
        </button>

        {/* Deep Check Button */}
        <button className="gradient-bg text-white px-4 py-2 rounded-full text-[13px] font-bold shadow-lg shadow-blue-200 active:scale-95 transition-all flex items-center gap-2">
          <div className="w-5 h-5 flex items-center justify-center border-2 border-white/40 rounded-full">
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
            </svg>
          </div>
          Deep Check
        </button>
      </div>
    </header>
  );
};

export default Header;
