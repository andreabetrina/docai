import React from 'react';
import { Role } from '../types';
import BotIcon from './BotIcon';

interface ChatBubbleProps {
  role: Role;
  text: string;
  showAvatar?: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ role, text, showAvatar }) => {
  const isAI = role === 'ai';

  return (
    <div className={`flex w-full mb-4 animate-in fade-in duration-300 ${isAI ? 'justify-start' : 'justify-end'}`}>
      <div className={`max-w-[90%] px-4 py-3 rounded-2xl shadow-sm text-sm leading-relaxed flex items-start gap-3 ${
        isAI 
          ? 'bg-white text-slate-700 border border-slate-200/60 chat-bubble-ai' 
          : 'gradient-bg text-white chat-bubble-user shadow-md'
      }`}>
        {isAI && showAvatar && <BotIcon size="w-12 h-12" />}
        <div className={isAI && showAvatar ? 'pt-1' : ''}>
          {text}
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;