
import React from 'react';

const BotIcon: React.FC<{ size?: string; className?: string }> = ({ size = "w-10 h-10", className = "" }) => {
  return (
    <div className={`${size} ${className} relative flex-shrink-0 bg-[#f0f7ff] rounded-full overflow-hidden border border-slate-100 shadow-sm flex items-center justify-center`}>
      <svg viewBox="0 0 100 100" className="w-[85%] h-[85%]" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Antenna */}
        <rect x="48" y="15" width="4" height="12" rx="2" fill="#2563eb" />
        <circle cx="50" cy="15" r="3.5" fill="#2563eb" />
        
        {/* Head */}
        <rect x="22" y="28" width="56" height="38" rx="14" stroke="#2563eb" strokeWidth="4.5" fill="white" />
        
        {/* Face Screen */}
        <rect x="30" y="36" width="40" height="22" rx="8" fill="#1e293b" />
        
        {/* Eyes */}
        <circle cx="41" cy="47" r="3" fill="#0ea5e9" />
        <circle cx="59" cy="47" r="3" fill="#0ea5e9" />
        
        {/* Body/Shoulders */}
        <path 
          d="M25 66C25 66 22 66 22 75C22 84 78 84 78 75C78 66 75 66 75 66" 
          stroke="#2563eb" 
          strokeWidth="4.5" 
          strokeLinecap="round" 
          fill="white" 
        />
        
        {/* Plus on chest */}
        <rect x="47.5" y="70" width="5" height="10" rx="1" fill="#2563eb" />
        <rect x="45" y="72.5" width="10" height="5" rx="1" fill="#2563eb" />
      </svg>
    </div>
  );
};

export default BotIcon;
