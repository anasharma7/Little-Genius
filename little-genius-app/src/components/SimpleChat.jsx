import { useState, useEffect } from 'react';
import Pusher from 'pusher-js';

function SimpleChat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Initialize Pusher (you'll need to get free credentials from pusher.com)
    const pusher = new Pusher('your-app-key', {
      cluster: 'your-cluster',
      encrypted: true
    });

    const channel = pusher.subscribe('chat-channel');
    
    channel.bind('new-message', (data) => {
      setMessages(prev => [...prev, data]);
    });

    channel.bind('pusher:subscription_succeeded', () => {
      setIsConnected(true);
      console.log('✅ Connected to Pusher!');
    });

    channel.bind('pusher:subscription_error', (error) => {
      console.error('❌ Pusher connection error:', error);
      setIsConnected(false);
    });

    return () => {
      pusher.unsubscribe('chat-channel');
    };
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

    // In a real app, you'd send this to your backend
    // For now, we'll just add it locally
    setMessages(prev => [...prev, messageData]);
    setNewMessage('');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Simple Real-time Chat</h2>
      
      {/* Connection Status */}
      <div className={`p-4 rounded-lg mb-6 ${
        isConnected ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
      }`}>
        <h3 className="font-semibold mb-2">Connection Status:</h3>
        <p className={isConnected ? 'text-green-700' : 'text-red-700'}>
          {isConnected ? '✅ Connected to Pusher!' : '❌ Not connected (Pusher credentials needed)'}
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
      <form onSubmit={sendMessage} className="flex space-x-2">
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

      {/* Setup Instructions */}
      <div className="mt-6 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
        <h4 className="font-semibold text-yellow-800 mb-2">To Enable Real-time Features:</h4>
        <ol className="text-yellow-700 text-sm space-y-1">
          <li>1. Go to <a href="https://pusher.com/" target="_blank" rel="noopener noreferrer" className="underline">Pusher.com</a></li>
          <li>2. Sign up for a free account</li>
          <li>3. Create a new app</li>
          <li>4. Copy your app key and cluster</li>
          <li>5. Update the credentials in <code className="bg-yellow-100 px-1 rounded">src/pusher.js</code></li>
          <li>6. Open multiple browser tabs to test real-time chat!</li>
        </ol>
      </div>
    </div>
  );
}

export default SimpleChat; 