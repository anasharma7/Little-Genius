import { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, query, orderBy, limit, serverTimestamp } from 'firebase/firestore';
import { db, auth, signInUser, getCurrentUser } from '../firebase';

function FirebaseTest() {
  const [testMessage, setTestMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState('Testing...');
  const [isConnected, setIsConnected] = useState(false);
  const [user, setUser] = useState(null);
  const [authStatus, setAuthStatus] = useState('Not signed in');

  useEffect(() => {
    // Sign in anonymously when component mounts
    const initializeAuth = async () => {
      try {
        const currentUser = getCurrentUser();
        if (!currentUser) {
          const newUser = await signInUser();
          setUser(newUser);
          setAuthStatus(newUser ? '✅ Signed in anonymously' : '❌ Sign in failed');
        } else {
          setUser(currentUser);
          setAuthStatus('✅ Already signed in');
        }
      } catch (error) {
        console.error('Auth error:', error);
        setAuthStatus('❌ Authentication error');
      }
    };

    initializeAuth();
  }, []);

  useEffect(() => {
    // Test Firebase connection
    const testConnection = async () => {
      try {
        const testRef = collection(db, 'test');
        const q = query(testRef, orderBy('timestamp', 'desc'), limit(5));
        
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const testMessages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setMessages(testMessages);
          setConnectionStatus('✅ Connected to Firebase!');
          setIsConnected(true);
        }, (error) => {
          console.error('Firebase connection error:', error);
          setConnectionStatus('❌ Firebase connection failed');
          setIsConnected(false);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error('Firebase setup error:', error);
        setConnectionStatus('❌ Firebase setup failed');
        setIsConnected(false);
      }
    };

    testConnection();
  }, []);

  const sendTestMessage = async () => {
    if (!testMessage.trim() || !user) return;
    
    try {
      await addDoc(collection(db, 'test'), {
        message: testMessage,
        timestamp: serverTimestamp(),
        sender: user.uid,
        userName: `User ${user.uid.substring(0, 6)}`
      });
      setTestMessage('');
    } catch (error) {
      console.error('Error sending test message:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Firebase Connection Test</h2>
      
      {/* Authentication Status */}
      <div className="p-4 rounded-lg mb-6 bg-blue-50 border border-blue-200">
        <h3 className="font-semibold mb-2">Authentication Status:</h3>
        <p className="text-blue-700">{authStatus}</p>
        {user && (
          <p className="text-sm text-blue-600 mt-1">
            User ID: {user.uid.substring(0, 12)}...
          </p>
        )}
      </div>
      
      {/* Connection Status */}
      <div className={`p-4 rounded-lg mb-6 ${
        isConnected ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
      }`}>
        <h3 className="font-semibold mb-2">Connection Status:</h3>
        <p className={isConnected ? 'text-green-700' : 'text-red-700'}>
          {connectionStatus}
        </p>
      </div>

      {/* Test Message Input */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Send Test Message:</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={testMessage}
            onChange={(e) => setTestMessage(e.target.value)}
            placeholder="Type a test message..."
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendTestMessage}
            disabled={!isConnected || !user || !testMessage.trim()}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            Send Test
          </button>
        </div>
      </div>

      {/* Test Messages */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Recent Test Messages:</h3>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {messages.map((msg) => (
            <div key={msg.id} className="p-3 bg-gray-50 rounded-lg">
              <p className="font-medium">{msg.message}</p>
              <p className="text-sm text-gray-600">
                By: {msg.userName || msg.sender?.substring(0, 6) || 'Unknown'} | 
                {msg.timestamp?.toDate?.()?.toLocaleTimeString() || 'Just now'}
              </p>
            </div>
          ))}
          {messages.length === 0 && (
            <p className="text-gray-600 text-center py-4">No test messages yet</p>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
        <h4 className="font-semibold text-yellow-800 mb-2">How to Test Real-time Features:</h4>
        <ol className="text-yellow-700 text-sm space-y-1">
          <li>1. Make sure you see "✅ Signed in anonymously" above</li>
          <li>2. Make sure you see "✅ Connected to Firebase!" above</li>
          <li>3. Open multiple browser tabs to this page</li>
          <li>4. Send test messages from different tabs</li>
          <li>5. Watch messages appear in real-time across all tabs</li>
          <li>6. If this works, your Firebase is properly configured!</li>
        </ol>
      </div>
    </div>
  );
}

export default FirebaseTest; 