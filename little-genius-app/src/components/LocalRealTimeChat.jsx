import { useState, useEffect } from 'react';

function LocalRealTimeChat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [isConnected, setIsConnected] = useState(true);

  // Load messages from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('chat-messages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  // Listen for storage changes (when other tabs update messages)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'chat-messages') {
        const newMessages = e.newValue ? JSON.parse(e.newValue) : [];
        setMessages(newMessages);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !userName.trim()) return;
    
    const messageData = {
      text: newMessage,
      userName: userName,
      timestamp: new Date().toLocaleTimeString(),
      id: Date.now()
    };

    const updatedMessages = [...messages, messageData];
    setMessages(updatedMessages);
    
    // Save to localStorage and trigger storage event for other tabs
    localStorage.setItem('chat-messages', JSON.stringify(updatedMessages));
    
    // Trigger a custom event for the current tab
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'chat-messages',
      newValue: JSON.stringify(updatedMessages)
    }));
    
    setNewMessage('');
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem('chat-messages');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Local Real-time Chat</h2>
      
      {/* Connection Status */}
      <div className="p-4 rounded-lg mb-6 bg-green-50 border border-green-200">
        <h3 className="font-semibold mb-2">Connection Status:</h3>
        <p className="text-green-700">
          ✅ Connected! Works across browser tabs using localStorage
        </p>
      </div>

      {/* User Name Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter your name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Messages Display */}
      <div className="h-96 overflow-y-auto border border-gray-200 rounded-md p-4 mb-4 bg-gray-50">
        {messages.map((message) => (
          <div key={message.id} className="mb-3">
            <div className="flex items-start space-x-2">
              <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                {message.userName}
              </div>
              <div className="bg-white px-3 py-2 rounded-lg shadow-sm flex-1">
                <p className="text-gray-800">{message.text}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {message.timestamp}
                </p>
              </div>
            </div>
          </div>
        ))}
        {messages.length === 0 && (
          <p className="text-gray-600 text-center py-4">No messages yet. Start chatting!</p>
        )}
      </div>

      {/* Message Input */}
      <form onSubmit={sendMessage} className="flex space-x-2 mb-4">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Send
        </button>
      </form>

      {/* Clear Chat Button */}
      <button
        onClick={clearChat}
        className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Clear Chat
      </button>

      {/* Instructions */}
      <div className="mt-6 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
        <h4 className="font-semibold text-yellow-800 mb-2">How to Test Real-time Features:</h4>
        <ol className="text-yellow-700 text-sm space-y-1">
          <li>1. Open multiple browser tabs to this page</li>
          <li>2. Enter different names in each tab</li>
          <li>3. Send messages from different tabs</li>
          <li>4. Watch messages appear in real-time across all tabs!</li>
          <li>5. No external services needed - works offline!</li>
        </ol>
      </div>
    </div>
  );
}

export default LocalRealTimeChat; 