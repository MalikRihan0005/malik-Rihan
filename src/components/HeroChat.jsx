import React, { useState, useRef, useEffect } from 'react';
import { chatResponses, personalInfo } from '../data/portfolioData';

const initialMessages = [
  {
    sender: 'ai',
    text: "Hi! I'm Malik's interactive portfolio assistant. Ask me anything about his DevOps cloud automation at ZeTheta, the NovaPay 8-stage CI/CD pipeline, IoT projects, full-stack software, or educational background!",
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  },
];

export default function HeroChat() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const messagesContainerRef = useRef(null);

  // Safely scroll ONLY the messages container (never the window!)
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (isExpanded) {
      scrollToBottom();
    }
  }, [messages, isTyping, isExpanded]);

  const handleSend = (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    // Capture scroll position before state change to prevent ANY window jump
    const currentScrollY = window.scrollY;

    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMessages = [...messages, { sender: 'user', text: query, time: userTime }];
    setMessages(newMessages);
    setInput('');
    setIsExpanded(true);
    setIsTyping(true);

    // Ensure window does not jump
    requestAnimationFrame(() => {
      if (Math.abs(window.scrollY - currentScrollY) > 5) {
        window.scrollTo({ top: currentScrollY, behavior: 'instant' });
      }
    });

    setTimeout(() => {
      const q = query.toLowerCase();
      let matched = null;

      for (const item of chatResponses) {
        if (item.keywords.some((k) => q.includes(k))) {
          matched = item.response;
          break;
        }
      }

      if (!matched) {
        if (q.includes('food') || q.includes('eat') || q.includes('pizza') || q.includes('snack')) {
          matched = "Malik's all-time favorite food is wood-fired artisan Pizza! 🍕 Loaded with mozzarella, it's his absolute go-to meal.";
        } else if (q.includes('sport') || q.includes('badminton') || q.includes('play')) {
          matched = "Malik is passionate about Badminton! 🏸 He loves intense rallies and smashes, playing regularly to stay agile and sharp.";
        } else if (q.includes('who') || q.includes('about') || q.includes('malik')) {
          matched = `Malik Rihan is a 3rd-year Information Science Engineering student at BIET Davangere and a DevOps Engineer Intern at ZeTheta Algorithms. He specializes in AWS, Kubernetes, CI/CD pipelines, IoT systems, and full-stack software development.`;
        } else if (q.includes('resume') || q.includes('cv')) {
          matched = `You can download Malik's verified résumé directly from the About section or top navigation bar. He is actively seeking software engineering and DevOps internship opportunities!`;
        } else {
          matched = `Malik is an Information Science student and DevOps Engineer Intern at ZeTheta. He loves pizza 🍕, plays badminton 🏸, architected NovaPay (an 8-stage zero-downtime CI/CD pipeline on Kubernetes targeting 99.999% uptime), and built JobAgent. Reach out at ${personalInfo.email}!`;
        }
      }

      const aiTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages((prev) => [...prev, { sender: 'ai', text: matched, time: aiTime }]);
      setIsTyping(false);
    }, 450);
  };

  const handleReset = (e) => {
    e.stopPropagation();
    setMessages(initialMessages);
    setIsExpanded(false);
    setInput('');
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setIsExpanded(false);
  };

  return (
    <div className="pf-hero-chat-wrapper">
      <div className={`pf-hero-chat-container ${isExpanded ? 'pf-chat-expanded' : 'pf-chat-collapsed'}`}>
        {/* Expanded Header */}
        {isExpanded && (
          <div className="pf-hero-chat-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: '#4ade80',
                  boxShadow: '0 0 8px #4ade80',
                  display: 'inline-block',
                }}
              />
              <span
                className="mono"
                style={{
                  color: '#ffffff',
                  fontSize: '11px',
                  letterSpacing: '0.14em',
                  fontWeight: 500,
                }}
              >
                Malik's AI Assistant
              </span>
            </div>

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <button
                type="button"
                onClick={handleReset}
                className="pf-chat-reset-btn mono"
                title="Reset conversation"
              >
                CLEAR
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="pf-chat-reset-btn mono"
                title="Collapse"
                style={{ padding: '4px 8px' }}
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Messages Viewport - ONLY this scrolls internally */}
        {isExpanded && (
          <div ref={messagesContainerRef} className="pf-hero-chat-messages" aria-live="polite">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`pf-chat-msg-row ${msg.sender === 'user' ? 'pf-msg-user-row' : 'pf-msg-ai-row'}`}
              >
                <div className={`pf-chat-bubble ${msg.sender === 'user' ? 'pf-bubble-user' : 'pf-bubble-ai'}`}>
                  <p style={{ margin: 0, lineHeight: 1.55 }}>{msg.text}</p>
                  <span className="pf-chat-time mono">{msg.time}</span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="pf-chat-msg-row pf-msg-ai-row">
                <div className="pf-chat-bubble pf-bubble-ai" style={{ display: 'flex', gap: '6px', alignItems: 'center', padding: '10px 14px' }}>
                  <span className="typing-dot" />
                  <span className="typing-dot" style={{ animationDelay: '0.2s' }} />
                  <span className="typing-dot" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Input Bar */}
        <div className={isExpanded ? 'pf-hero-chat-input-bar' : ''}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="pf-chat-demo-input-main"
          >
            <input
              type="text"
              placeholder="Ask about Malik's work, stack, projects, favorite food..."
              className="pf-chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              aria-label="Ask about Malik's work"
            />
            <button
              type="submit"
              disabled={!input.trim() && !isTyping}
              className="pf-chat-send-btn"
              aria-label="Send message"
            >
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 12.6667V3.33333M12.6667 8L8 3.33333L3.33333 8"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>

      {/* Suggested Question Chips (Only shown when collapsed) */}
      {!isExpanded && (
        <div className="pf-chat-chips">
          {[
            '✦ DevOps Experience',
            '✦ Favorite Food?',
            '✦ Favorite Sport?',
            '✦ NovaPay CI/CD',
            '✦ Tech Stack',
          ].map((chip) => (
            <button
              key={chip}
              type="button"
              className="pf-chat-chip mono"
              onClick={() => handleSend(chip.replace(/^✦\s*/, ''))}
            >
              {chip}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
