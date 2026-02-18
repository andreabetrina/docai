import React from 'react';

interface QuickActionsProps {
  options: string[];
  onSelect: (option: string) => void;
  disabled?: boolean;
}

const QuickActions: React.FC<QuickActionsProps> = ({ options, onSelect, disabled }) => {
  if (options.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-6 ml-14 animate-in fade-in slide-in-from-left-4 duration-500">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => onSelect(option)}
          disabled={disabled}
          className="bg-white border border-blue-200 text-blue-600 px-5 py-2 rounded-full text-sm font-semibold shadow-sm hover:border-blue-400 hover:bg-blue-50 transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default QuickActions;