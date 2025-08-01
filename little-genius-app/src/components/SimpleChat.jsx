import { useState, useEffect } from 'react';
import pusher, { getChannel } from '../pusher';

function SimpleChat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Subscribe to the chat channel
    const channel = getChannel('chat-channel');
    
    // Listen for new messages
    channel.bind('new-message', (data) => {
      setMessages(prev => [...prev, data]);
    });

    // Listen for connection events
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

    // Add message locally
    setMessages(prev => [...prev, messageData]);
    
    // Send to Pusher channel (this will trigger the event for other users)
    const channel = getChannel('chat-channel');
    channel.trigger('new-message', messageData);
    
    setNewMessage('');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Pusher Real-time Chat</h2>
      
      {/* Connection Status */}
      <div className={`p-4 rounded-lg mb-6 ${
        isConnected ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
      }`}>
        <h3 className="font-semibold mb-2">Connection Status:</h3>
        <p className={isConnected ? 'text-green-700' : 'text-red-700'}>
          {isConnected ? '✅ Connected to Pusher!' : '❌ Connecting to Pusher...'}
        </p>
        {isConnected && (
          <p className="text-sm text-green-600 mt-1">
            App Key: 5a3bfdcf7b655154092b | Cluster: us2
          </p>
        )}
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

      {/* Instructions */}
      <div className="mt-6 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
        <h4 className="font-semibold text-yellow-800 mb-2">How to Test Real-time Features:</h4>
        <ol className="text-yellow-700 text-sm space-y-1">
          <li>1. ✅ Pusher is configured with your credentials!</li>
          <li>2. Open multiple browser tabs to this page</li>
          <li>3. Enter different names in each tab</li>
          <li>4. Send messages from different tabs</li>
          <li>5. Watch messages appear in real-time across all tabs!</li>
          <li>6. 🎉 Your real-time chat is working!</li>
        </ol>
      </div>
    </div>
  );
}

export default SimpleChat; 