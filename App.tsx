
import React, { useState, useRef, useEffect, useCallback } from 'react';
import Header from './components/Header';
import ChatBubble from './components/ChatBubble';
import QuickActions from './components/QuickActions';
import { Message } from './types';
import { getHealthAdvice } from './services/geminiService';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'ai',
      text: "Hello! I'm DoctAI, your health and diagnosis assistant. How can I assist you with your health concerns today?",
      timestamp: new Date(),
      options: ["I feel sick", "Chest pain", "Fever", "Muscle ache"]
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    // Prepare history for API
    const history = messages.concat(userMsg).map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const response = await getHealthAdvice(history);

    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'ai',
      text: response.message,
      options: response.suggestedOptions,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  }, [messages, isLoading]);

  const handleQuickAction = (option: string) => {
    handleSendMessage(option);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Logic for actual recording would go here
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-slate-50 shadow-2xl overflow-hidden relative border-x border-slate-200">
      <Header />
      
      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 pb-12 relative"
      >
        {/* Background Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03]">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <span className="text-8xl font-black text-[#2563eb]">doct</span>
              <div className="w-24 h-24 flex items-center justify-center rounded-full border-8 border-[#2563eb]">
                <svg className="w-16 h-16 text-[#2563eb]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <span className="text-8xl font-black text-[#2563eb]">ai</span>
            </div>
          </div>
        </div>

        {/* Chat Contents */}
        <div className="relative z-10">
          {messages.map((msg, index) => (
            <div key={msg.id}>
              <ChatBubble 
                role={msg.role} 
                text={msg.text} 
                showAvatar={index === 0 && msg.role === 'ai'} 
              />
              {msg.role === 'ai' && msg.options && messages[messages.length - 1].id === msg.id && !isLoading && (
                <QuickActions 
                  options={msg.options} 
                  onSelect={handleQuickAction} 
                  disabled={isLoading}
                />
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start mb-4 animate-pulse">
              <div className="bg-white border border-slate-100 rounded-2xl px-4 py-3 flex gap-2 items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-slate-100 p-4 pb-8 relative z-20">
        <div className="relative flex items-center gap-2">
          <button className="p-2 text-slate-400 hover:text-blue-500 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
          </button>
          
          <div className="flex-1 relative">
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
              placeholder={isRecording ? "Listening..." : "Tell me your symptoms..."}
              className={`w-full border-none rounded-full py-3 px-5 pr-12 text-sm transition-all outline-none ${
                isRecording ? 'bg-blue-50 ring-2 ring-blue-400 animate-pulse' : 'bg-slate-100 focus:ring-2 focus:ring-blue-500 focus:bg-white'
              }`}
            />
            <button 
              onClick={() => handleSendMessage(inputText)}
              disabled={!inputText.trim() || isLoading}
              className={`absolute right-1 top-1 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                inputText.trim() ? 'gradient-bg shadow-lg shadow-blue-200' : 'bg-slate-300 pointer-events-none'
              }`}
            >
              <svg className="w-5 h-5 text-white transform rotate-90" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>

          <button 
            onClick={toggleRecording}
            className={`p-2 transition-all rounded-full ${isRecording ? 'bg-red-50 text-red-500' : 'text-slate-400 hover:text-blue-500 hover:bg-slate-50'}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
            </svg>
          </button>
        </div>
        <div className="mt-4 flex justify-center">
          <p className="text-[10px] text-slate-400 text-center font-medium">
            AI can make mistakes. Consider checking with a doctor.
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
