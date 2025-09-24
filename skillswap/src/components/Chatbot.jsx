// src/components/Chatbot.jsx
import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css'; // Import the CSS

const Chatbot = () => {
    // State to manage the chatbot window's visibility
    const [isOpen, setIsOpen] = useState(false);
    
    // State to store the chat messages
    const [messages, setMessages] = useState([
        { text: "Hello! How can I help you today?", sender: "bot" }
    ]);

    // State for the user's input
    const [inputValue, setInputValue] = useState('');

    const chatBodyRef = useRef(null);

    // Effect to scroll to the bottom of the chat on new messages
    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [messages]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const userMessage = inputValue.trim();
        if (!userMessage) return;

        // Add user message to the chat
        setMessages(prev => [...prev, { text: userMessage, sender: "user" }]);
        setInputValue('');

        // Send message to backend and get response
        try {
            const response = await fetch('http://localhost:3000/ask', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage }),
            });

            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();
            setMessages(prev => [...prev, { text: data.reply, sender: "bot" }]);

        } catch (error) {
            console.error("Error communicating with backend:", error);
            setMessages(prev => [...prev, { text: "Sorry, I'm having trouble connecting.", sender: "bot" }]);
        }
    };

    return (
        <>
            {/* Chatbot Launcher Button */}
            <button id="chatbot-launcher" onClick={() => setIsOpen(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            </button>

            {/* Chatbot Window */}
            <div id="chatbot-window" className={isOpen ? '' : 'hidden'}>
                <div className="chat-header">
                    <h3>AI Assistant</h3>
                    <button id="close-chatbot" onClick={() => setIsOpen(false)}>&times;</button>
                </div>
                <div className="chat-body" ref={chatBodyRef}>
                    {messages.map((msg, index) => (
                        <div key={index} className={`chat-message ${msg.sender}`}>
                            <p>{msg.text}</p>
                        </div>
                    ))}
                </div>
                <div className="chat-footer">
                    <form id="chat-form" onSubmit={handleFormSubmit}>
                        <input
                            type="text"
                            id="chat-input"
                            placeholder="Type a message..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            autoComplete="off"
                            required
                        />
                        <button type="submit">Send</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Chatbot;