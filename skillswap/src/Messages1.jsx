import React from 'react';

const ChatUI = () => {
  // Sample data for chat items and messages
  const chatItems = [
    { id: 1, name: 'Sarah Johnson', message: 'Hey! How are you doing tod...', active: true, imageUrl: 'https://via.placeholder.com/40' },
    { id: 2, name: 'Michael Chen', message: 'Thanks for the meeting yesterday', active: false, imageUrl: 'https://via.placeholder.com/40' },
    { id: 3, name: 'Emma Davis', message: 'Can you review the docume...', active: false, imageUrl: 'https://via.placeholder.com/40' },
    { id: 4, name: 'Alex Rodriguez', message: 'Great work on the presentation!', active: false, imageUrl: 'https://via.placeholder.com/40' },
    { id: 5, name: 'Lisa Wang', message: 'Let\'s schedule a call for next week', active: false, imageUrl: 'https://via.placeholder.com/40' },
  ];

  const messages = [
    { id: 1, sender: 'Sarah Johnson', text: 'Hey! How are you doing today?', time: '10:30', isMe: false },
    { id: 2, sender: 'Me', text: 'I\'m doing great, thanks for asking! How about you?', time: '10:32', isMe: true },
    { id: 3, sender: 'Sarah Johnson', text: 'I\'m doing well too. Are we still on for the meeting tomorrow?', time: '10:35', isMe: false },
    { id: 4, sender: 'Me', text: 'Absolutely! Looking forward to it.', time: '10:36', isMe: true },
  ];

  return (
    <div style={{ margin: 0, fontFamily: 'Arial, sans-serif', height: '100vh', display: 'flex' }}>
      {/* Sidebar */}
      <div style={{ width: '280px', backgroundColor: '#f9f9f9', borderRight: '1px solid #ddd', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '12px', borderBottom: '1px solid #ccc' }}>
          <input type="text" placeholder="Search conversations..." style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
        </div>

        {/* Chat List */}
        <div style={{ flexGrow: 1, overflowY: 'auto' }}>
          {chatItems.map((chat) => (
            <div key={chat.id} style={{ backgroundColor: chat.active ? '#e6f0ff' : 'transparent', display: 'flex', alignItems: 'center', padding: '12px 15px', borderBottom: '1px solid #ddd' }}>
              <img src={chat.imageUrl} alt={chat.name} style={{ borderRadius: '50%', marginRight: '12px' }} />
              <div>
                <div style={{ fontWeight: 'bold' }}>{chat.name}</div>
                <div style={{ fontSize: '13px', color: 'gray' }}>{chat.message}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ddd' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src="https://via.placeholder.com/40" alt="Sarah" style={{ borderRadius: '50%', marginRight: '12px' }} />
            <div>
              <div style={{ fontWeight: 'bold' }}>Sarah Johnson</div>
              <div style={{ fontSize: '12px', color: 'green' }}>Active now</div>
            </div>
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ fontSize: '18px', padding: '10px' }}>📞</div>
            <div style={{ fontSize: '18px', padding: '10px' }}>💬</div>
            <div style={{ fontSize: '18px', padding: '10px' }}>📹</div>
          </div>
        </div>

        {/* Chat messages */}
        <div style={{ flexGrow: 1, padding: '20px', overflowY: 'auto', backgroundColor: '#f8f9fb', display: 'flex', flexDirection: 'column' }}>
          {messages.map((message) => (
            <div key={message.id} style={{ marginBottom: '16px', maxWidth: '60%', alignSelf: message.isMe ? 'flex-end' : 'flex-start', textAlign: message.isMe ? 'right' : 'left' }}>
              <div style={{ backgroundColor: message.isMe ? '#007aff' : '#f0f0f0', color: message.isMe ? 'white' : 'black', padding: '12px 16px', borderRadius: '15px' }}>
                {message.text}
              </div>
              <div style={{ fontSize: '12px', color: 'gray', marginTop: '5px' }}>
                {message.time} {message.isMe && '✔✔'}
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div style={{ padding: '12px 20px', borderTop: '1px solid #ccc', display: 'flex', alignItems: 'center' }}>
          <input type="text" placeholder="Type a message..." style={{ flexGrow: 1, padding: '10px 15px', borderRadius: '20px', border: '1px solid #ccc' }} />
          <button style={{ background: 'none', border: 'none', fontSize: '22px', marginLeft: '12px', cursor: 'pointer' }}>📩</button>
        </div>
      </div>
    </div>
  );
};

export default ChatUI;
