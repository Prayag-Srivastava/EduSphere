import React, { useState, useRef, useEffect } from 'react';
import {
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
  EllipsisVerticalIcon,
  ArrowLeftIcon,
  PaperClipIcon,
} from "@heroicons/react/24/solid";

// --- MESSAGE BUBBLE COMPONENT ---
const MessageBubble = ({ msg, isMe }) => {
  return (
    <div className={`flex w-full mb-4 ${isMe ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
      <div className={`max-w-[85%] md:max-w-[70%] flex gap-2 ${isMe ? "flex-row-reverse" : "flex-row"}`}>
        
        {/* Avatar */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold text-white shadow-sm ${isMe ? "bg-indigo-600" : "bg-slate-400"}`}>
          {isMe ? "Me" : msg.senderInitial}
        </div>

        {/* Bubble Content */}
        <div className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
          <div
            className={`px-4 py-3 shadow-sm text-sm relative ${
              isMe
                ? "bg-indigo-600 text-white rounded-2xl rounded-tr-sm"
                : "bg-white text-slate-800 border border-slate-100 rounded-2xl rounded-tl-sm"
            }`}
          >
            {!isMe && msg.senderName && (
              <p className="text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wide">{msg.senderName}</p>
            )}
            {msg.text && <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>}
          </div>

          <span className="text-[10px] text-slate-400 mt-1 px-1 font-medium">
            {msg.time}
          </span>
        </div>
      </div>
    </div>
  );
};

const Chats = () => {
  // --- STATE ---
  const [activeChat, setActiveChat] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showMobileList, setShowMobileList] = useState(true);
  const messagesEndRef = useRef(null);

  // --- MOCK DATA ---
  // Companies list for sidebar
  const [companies] = useState([
    { id: 1, name: 'Tech Innovations Pvt Ltd', status: 'online', lastMsg: 'Thanks for the update', unread: 2 },
    { id: 2, name: 'Digital Solutions Inc', status: 'online', lastMsg: 'Can we schedule a call?', unread: 0 },
    { id: 3, name: 'CloudTech Systems', status: 'offline', lastMsg: 'Looking forward to the partnership', unread: 1 },
    { id: 4, name: 'AI Robotics Corp', status: 'online', lastMsg: 'We have 5 openings available', unread: 0 },
    { id: 5, name: 'FinTech Solutions', status: 'offline', lastMsg: 'Thank you for considering us', unread: 0 },
    { id: 6, name: 'Green Energy Ltd', status: 'online', lastMsg: 'Please review the attached proposal', unread: 0 },
  ]);

  // Messages for each company
  const [messages, setMessages] = useState({
    1: [
      { id: 1, type: "text", text: 'Hi Admin, how are you?', sender: 'company', senderName: 'Tech Innovations', senderInitial: 'T', time: '09:30 AM' },
      { id: 2, type: "text", text: 'Hello! Doing great. How are the interviews going?', sender: 'Me', senderName: null, senderInitial: 'A', time: '09:35 AM' },
      { id: 3, type: "text", text: 'Going well! We have selected 5 candidates so far', sender: 'company', senderName: 'Tech Innovations', senderInitial: 'T', time: '09:40 AM' },
      { id: 4, type: "text", text: 'That\'s excellent! Can you send me the details?', sender: 'Me', senderName: null, senderInitial: 'A', time: '09:45 AM' },
      { id: 5, type: "text", text: 'Thanks for the update', sender: 'company', senderName: 'Tech Innovations', senderInitial: 'T', time: '10:00 AM' },
    ],
    2: [
      { id: 1, type: "text", text: 'Welcome to our platform!', sender: 'Me', senderName: null, senderInitial: 'A', time: '10:00 AM' },
      { id: 2, type: "text", text: 'Thank you! Excited to work with your students', sender: 'company', senderName: 'Digital Solutions', senderInitial: 'D', time: '10:05 AM' },
      { id: 3, type: "text", text: 'Can we schedule a call?', sender: 'company', senderName: 'Digital Solutions', senderInitial: 'D', time: '10:30 AM' },
    ],
    3: [
      { id: 1, type: "text", text: 'Looking forward to our partnership', sender: 'Me', senderName: null, senderInitial: 'A', time: '11:00 AM' },
      { id: 2, type: "text", text: 'Looking forward to the partnership', sender: 'company', senderName: 'CloudTech Systems', senderInitial: 'C', time: '11:15 AM' },
    ],
    4: [
      { id: 1, type: "text", text: 'We have 5 openings for senior developers', sender: 'company', senderName: 'AI Robotics Corp', senderInitial: 'A', time: '9:00 AM' },
      { id: 2, type: "text", text: 'Great! What\'s the package range?', sender: 'Me', senderName: null, senderInitial: 'A', time: '9:15 AM' },
      { id: 3, type: "text", text: 'We have 5 openings available', sender: 'company', senderName: 'AI Robotics Corp', senderInitial: 'A', time: '2:30 PM' },
    ],
    5: [
      { id: 1, type: "text", text: 'Welcome aboard!', sender: 'Me', senderName: null, senderInitial: 'A', time: '1 week ago' },
      { id: 2, type: "text", text: 'Thank you for considering us', sender: 'company', senderName: 'FinTech Solutions', senderInitial: 'F', time: '3 days ago' },
    ],
    6: [
      { id: 1, type: "text", text: 'Please review the attached proposal', sender: 'company', senderName: 'Green Energy Ltd', senderInitial: 'G', time: '1 week ago' },
      { id: 2, type: "text", text: 'Will review and get back soon', sender: 'Me', senderName: null, senderInitial: 'A', time: '5 days ago' },
    ],
  });

  // Auto-select first company on desktop
  useEffect(() => {
    if (window.innerWidth >= 768 && !activeChat) {
      setActiveChat(companies[0]);
      setShowMobileList(false);
    }
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeChat]);

  // --- HANDLERS ---
  const handleSelectCompany = (company) => {
    setActiveChat(company);
    setShowMobileList(false);
  };

  const handleSendMessage = () => {
    if (!messageText.trim()) return;

    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newMessage = {
      id: Date.now(),
      type: "text",
      text: messageText,
      sender: "Me",
      senderName: null,
      senderInitial: 'A',
      time: time,
    };

    setMessages({
      ...messages,
      [activeChat.id]: [...(messages[activeChat.id] || []), newMessage]
    });

    // TODO: Send to backend API
    // API endpoint: POST /api/admin/chats/{companyId}/send
    // Payload: { message, timestamp, senderId: 'admin' }
    
    setMessageText("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleGoBack = () => {
    setShowMobileList(true);
  };

  // Filter companies based on search
  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentMessages = activeChat ? messages[activeChat.id] || [] : [];

  // --- RENDER ---
  return (
    <div className="flex flex-col md:flex-row h-[85vh] bg-white md:rounded-2xl md:shadow-2xl md:border md:border-slate-200 overflow-hidden font-sans relative">
      
      {/* -------- SIDEBAR -------- */}
      <div className={`
        w-full md:w-80 bg-white border-r border-slate-100 flex flex-col
        ${showMobileList ? "flex" : "hidden md:flex"}
      `}>
        {/* Header with Search */}
        <div className="p-4 border-b border-slate-100 bg-white z-10">
          <h1 className="text-xl font-bold text-slate-800 mb-4">Messages</h1>

          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border-0 ring-1 ring-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
            />
          </div>
        </div>

        {/* Companies List */}
        <div className="flex-1 overflow-y-auto">
          {filteredCompanies.map(company => {
            const getInitial = (name) => name.charAt(0).toUpperCase();
            return (
              <button
                key={company.id}
                onClick={() => handleSelectCompany(company)}
                className={`w-full p-3 border-b border-slate-50 hover:bg-slate-50 transition-colors text-left
                  ${activeChat?.id === company.id ? 'bg-indigo-50' : ''}
                `}
              >
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0
                    ${company.status === 'online' ? 'bg-indigo-600' : 'bg-slate-400'}
                  `}>
                    {getInitial(company.name)}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-slate-800 truncate">{company.name}</p>
                      {company.status === 'online' && (
                        <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                      )}
                      {company.unread > 0 && (
                        <span className="ml-auto bg-indigo-600 text-white text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0">
                          {company.unread}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 truncate mt-1">{company.lastMsg}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* -------- CHAT WINDOW -------- */}
      <div className={`
        flex-1 flex flex-col bg-white
        ${showMobileList ? "hidden md:flex" : "flex md:flex"}
      `}>
        {activeChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-slate-100 bg-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleGoBack}
                  className="md:hidden p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition"
                >
                  <ArrowLeftIcon className="w-5 h-5" />
                </button>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white
                  ${activeChat.status === 'online' ? 'bg-indigo-600' : 'bg-slate-400'}
                `}>
                  {activeChat.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-800">{activeChat.name}</h2>
                  <p className={`text-xs ${activeChat.status === 'online' ? 'text-green-600' : 'text-slate-500'}`}>
                    {activeChat.status === 'online' ? '● Online' : '● Offline'}
                  </p>
                </div>
              </div>
              
              <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition">
                <EllipsisVerticalIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-white space-y-4">
              {currentMessages.map(msg => (
                <MessageBubble key={msg.id} msg={msg} isMe={msg.sender === 'Me'} />
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-3 border-t border-slate-100 bg-white">
              <div className="flex gap-2">
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  rows="1"
                  className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!messageText.trim()}
                  className="p-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
                >
                  <PaperAirplaneIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-slate-400 text-center">Select a company to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chats;
