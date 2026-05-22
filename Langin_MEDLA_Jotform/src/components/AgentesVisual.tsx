import { useState, useEffect } from 'react';
import { User, Bot } from 'lucide-react';

type ChatStep = 'idle' | 'user1' | 'typing1' | 'bot1' | 'user2' | 'typing2' | 'bot2' | 'badge' | 'fadeout';

const SEQUENCE: { step: ChatStep; delay: number }[] = [
  { step: 'user1',   delay: 300 },
  { step: 'typing1', delay: 1800 },
  { step: 'bot1',    delay: 2600 },
  { step: 'user2',   delay: 4400 },
  { step: 'typing2', delay: 6200 },
  { step: 'bot2',    delay: 7100 },
  { step: 'badge',   delay: 7800 },
  { step: 'fadeout', delay: 11200 },
  { step: 'idle',    delay: 12200 },
];

const CYCLE_MS = 12500;

export default function AgentesVisual() {
  const [step, setStep] = useState<ChatStep>('idle');
  const [blink, setBlink] = useState(false);

  // Main sequence
  useEffect(() => {
    let timers: ReturnType<typeof setTimeout>[] = [];

    const run = () => {
      setStep('idle');
      timers = SEQUENCE.map(({ step: s, delay }) =>
        setTimeout(() => setStep(s), delay)
      );
    };

    run();
    const cycle = setInterval(run, CYCLE_MS);
    return () => {
      clearInterval(cycle);
      timers.forEach(clearTimeout);
    };
  }, []);

  // Blink
  useEffect(() => {
    const id = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 180);
    }, 3200 + Math.random() * 1400);
    return () => clearInterval(id);
  }, []);

  const show = (target: ChatStep[]) => target.includes(step) && step !== 'idle';

  const visible = (targets: ChatStep[]) =>
    targets.includes(step) && step !== 'idle' && step !== 'fadeout';

  return (
    <div className="w-full h-full relative flex flex-col bg-white rounded-xl overflow-hidden">

      {/* Header bar */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-[#F4E4C1] bg-[#FAF8F3]">
        {/* Bot avatar */}
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 relative"
          style={{
            background: 'linear-gradient(135deg, #D4AF37, #B8941D)',
            boxShadow: '0 4px 12px rgba(212,175,55,0.35)',
          }}
        >
          <svg width="22" height="18" viewBox="0 0 60 44">
            <ellipse cx="20" cy="16" rx="6" ry={blink ? 0.8 : 6} fill="white" />
            <ellipse cx="40" cy="16" rx="6" ry={blink ? 0.8 : 6} fill="white" />
            <circle cx="20" cy="16" r="2" fill="#2C2C2C" />
            <circle cx="40" cy="16" r="2" fill="#2C2C2C" />
            <path d="M 18 32 Q 30 40 42 32" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <span
            className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white"
            style={{ background: '#10B981' }}
          />
        </div>
        <div>
          <p className="text-[11px] font-bold text-[#2C2C2C]">Agente MEDLA</p>
          <p className="text-[9px] text-[#10B981] font-semibold">● En línea · 24/7</p>
        </div>
        {/* Badge top-right */}
        <div
          className="ml-auto px-2.5 py-1 rounded-full text-[9px] font-mono font-bold tracking-wider transition-all duration-500"
          style={{
            background: visible(['badge']) ? 'linear-gradient(135deg,#D4AF37,#B8941D)' : '#F4E4C1',
            color: visible(['badge']) ? 'white' : '#B8941D',
            transform: visible(['badge']) ? 'scale(1)' : 'scale(0.85)',
            opacity: visible(['badge']) ? 1 : 0,
            boxShadow: visible(['badge']) ? '0 4px 14px rgba(212,175,55,0.45)' : 'none',
          }}
        >
          ✓ LEAD CALIFICADO
        </div>
      </div>

      {/* Chat area */}
      <div
        className="flex-1 flex flex-col justify-end gap-2.5 p-3 overflow-hidden transition-opacity duration-700"
        style={{ opacity: step === 'fadeout' || step === 'idle' ? 0 : 1 }}
      >
        {/* User message 1 */}
        <div
          className="flex justify-end transition-all duration-400"
          style={{
            opacity: show(['user1', 'typing1', 'bot1', 'user2', 'typing2', 'bot2', 'badge', 'fadeout']) ? 1 : 0,
            transform: show(['user1', 'typing1', 'bot1', 'user2', 'typing2', 'bot2', 'badge', 'fadeout'])
              ? 'translateY(0)' : 'translateY(14px)',
          }}
        >
          <div
            className="max-w-[72%] px-3 py-2 rounded-2xl rounded-tr-sm text-[11px] leading-snug"
            style={{ background: '#FAF8F3', border: '1px solid #F4E4C1', color: '#2C2C2C' }}
          >
            Hola, me gustaría agendar una demo de MEDLA.
          </div>
          <div className="w-7 h-7 rounded-full bg-[#E8E8E8] flex items-center justify-center ml-2 flex-shrink-0 self-end text-gray-500">
            <User className="w-4 h-4" />
          </div>
        </div>

        {/* Typing indicator 1 */}
        <div
          className="flex items-end gap-2 transition-all duration-300"
          style={{
            opacity: show(['typing1']) ? 1 : 0,
            transform: show(['typing1']) ? 'translateY(0)' : 'translateY(10px)',
          }}
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-white"
            style={{ background: 'linear-gradient(135deg,#D4AF37,#B8941D)' }}
          >
            <Bot className="w-4 h-4" />
          </div>
          <div
            className="flex gap-1 px-3 py-2.5 rounded-2xl rounded-tl-sm"
            style={{ background: 'white', border: '1px solid #E8E8E8' }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"
                style={{ animation: `typeDot 0.9s ease-in-out infinite`, animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>

        {/* Bot message 1 */}
        <div
          className="flex items-end gap-2 transition-all duration-400"
          style={{
            opacity: show(['bot1', 'user2', 'typing2', 'bot2', 'badge', 'fadeout']) ? 1 : 0,
            transform: show(['bot1', 'user2', 'typing2', 'bot2', 'badge', 'fadeout'])
              ? 'translateY(0)' : 'translateY(14px)',
          }}
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-white"
            style={{ background: 'linear-gradient(135deg,#D4AF37,#B8941D)' }}
          >
            <Bot className="w-4 h-4" />
          </div>
          <div
            className="max-w-[72%] px-3 py-2 rounded-2xl rounded-tl-sm text-[11px] leading-snug"
            style={{ background: '#2C2C2C', color: '#F7F3E3', border: '1px solid rgba(212,175,55,0.2)' }}
          >
            ¡Excelente! Revisé tu formulario Jotform. ¿Cuántos prospectos manejas al mes?
          </div>
        </div>

        {/* User message 2 */}
        <div
          className="flex justify-end transition-all duration-400"
          style={{
            opacity: show(['user2', 'typing2', 'bot2', 'badge', 'fadeout']) ? 1 : 0,
            transform: show(['user2', 'typing2', 'bot2', 'badge', 'fadeout'])
              ? 'translateY(0)' : 'translateY(14px)',
          }}
        >
          <div
            className="max-w-[72%] px-3 py-2 rounded-2xl rounded-tr-sm text-[11px] leading-snug"
            style={{ background: '#FAF8F3', border: '1px solid #F4E4C1', color: '#2C2C2C' }}
          >
            Entre 50 y 100 leads por mes.
          </div>
          <div className="w-7 h-7 rounded-full bg-[#E8E8E8] flex items-center justify-center ml-2 flex-shrink-0 self-end text-gray-500">
            <User className="w-4 h-4" />
          </div>
        </div>

        {/* Typing indicator 2 */}
        <div
          className="flex items-end gap-2 transition-all duration-300"
          style={{
            opacity: show(['typing2']) ? 1 : 0,
            transform: show(['typing2']) ? 'translateY(0)' : 'translateY(10px)',
          }}
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-white"
            style={{ background: 'linear-gradient(135deg,#D4AF37,#B8941D)' }}
          >
            <Bot className="w-4 h-4" />
          </div>
          <div
            className="flex gap-1 px-3 py-2.5 rounded-2xl rounded-tl-sm"
            style={{ background: 'white', border: '1px solid #E8E8E8' }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"
                style={{ animation: `typeDot 0.9s ease-in-out infinite`, animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>

        {/* Bot message 2 */}
        <div
          className="flex items-end gap-2 transition-all duration-400"
          style={{
            opacity: show(['bot2', 'badge', 'fadeout']) ? 1 : 0,
            transform: show(['bot2', 'badge', 'fadeout']) ? 'translateY(0)' : 'translateY(14px)',
          }}
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-white"
            style={{ background: 'linear-gradient(135deg,#D4AF37,#B8941D)' }}
          >
            <Bot className="w-4 h-4" />
          </div>
          <div
            className="max-w-[72%] px-3 py-2 rounded-2xl rounded-tl-sm text-[11px] leading-snug"
            style={{ background: '#2C2C2C', color: '#F7F3E3', border: '1px solid rgba(212,175,55,0.2)' }}
          >
            Perfecto. ¿Te va hoy a las <span style={{ color: '#D4AF37', fontWeight: 700 }}>4:00 PM</span> o mañana a las <span style={{ color: '#D4AF37', fontWeight: 700 }}>11:00 AM</span>?
          </div>
        </div>

        {/* Quick reply buttons */}
        <div
          className="flex gap-2 pl-9 transition-all duration-400"
          style={{
            opacity: show(['bot2', 'badge', 'fadeout']) ? 1 : 0,
            transform: show(['bot2', 'badge', 'fadeout']) ? 'translateY(0)' : 'translateY(10px)',
          }}
        >
          <button
            className="text-[10px] font-semibold px-3 py-1.5 rounded-lg border transition-all"
            style={{ background: '#FAF8F3', border: '1px solid #F4E4C1', color: '#2C2C2C' }}
          >
            Hoy 4:00 PM
          </button>
          <button
            className="text-[10px] font-semibold px-3 py-1.5 rounded-lg text-white"
            style={{ background: 'linear-gradient(90deg,#D4AF37,#B8941D)', boxShadow: '0 4px 10px rgba(212,175,55,0.35)' }}
          >
            Mañana 11:00 AM
          </button>
        </div>
      </div>

      <style>{`
        @keyframes typeDot {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
