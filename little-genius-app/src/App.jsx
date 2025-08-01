import { useState } from 'react'
import './App.css'
import ChatRoom from './components/ChatRoom'
import RealTimeCounter from './components/RealTimeCounter'
import RealTimeDashboard from './components/RealTimeDashboard'
import FirebaseTest from './components/FirebaseTest'
import LocalRealTimeChat from './components/LocalRealTimeChat'
import SimpleChat from './components/SimpleChat'

function App() {
  const [activeTab, setActiveTab] = useState('pusher-chat')

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Little Genius Real-time App
        </h1>
        
        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-md p-1">
            <button
              onClick={() => setActiveTab('pusher-chat')}
              className={`px-6 py-2 rounded-md transition-colors ${
                activeTab === 'pusher-chat'
                  ? 'bg-purple-500 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              🚀 Pusher Chat (Real-time!)
            </button>
            <button
              onClick={() => setActiveTab('local-chat')}
              className={`px-6 py-2 rounded-md transition-colors ${
                activeTab === 'local-chat'
                  ? 'bg-green-500 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              📱 Local Chat (No Setup!)
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-6 py-2 rounded-md transition-colors ${
                activeTab === 'dashboard'
                  ? 'bg-purple-500 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              🌟 Collaboration Hub
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-6 py-2 rounded-md transition-colors ${
                activeTab === 'chat'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Chat Room
            </button>
            <button
              onClick={() => setActiveTab('counter')}
              className={`px-6 py-2 rounded-md transition-colors ${
                activeTab === 'counter'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Real-time Counter
            </button>
            <button
              onClick={() => setActiveTab('test')}
              className={`px-6 py-2 rounded-md transition-colors ${
                activeTab === 'test'
                  ? 'bg-green-500 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              🔧 Firebase Test
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="mb-8">
          {activeTab === 'pusher-chat' && <SimpleChat />}
          {activeTab === 'local-chat' && <LocalRealTimeChat />}
          {activeTab === 'dashboard' && <RealTimeDashboard appId="little-genius-67ad1" userId="demo-user" />}
          {activeTab === 'chat' && <ChatRoom />}
          {activeTab === 'counter' && <RealTimeCounter />}
          {activeTab === 'test' && <FirebaseTest />}
        </div>

        {/* Setup Instructions */}
        <div className="max-w-2xl mx-auto bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-800 mb-2">Quick Start:</h3>
          <ol className="text-sm text-yellow-700 space-y-1">
            <li>1. 🚀 <strong>Try "Pusher Chat" tab first</strong> - real-time with your credentials!</li>
            <li>2. ✅ Open multiple browser tabs to test real-time features</li>
            <li>3. 📱 "Local Chat" works without any external services</li>
            <li>4. 🔧 For Firebase features, use the "Firebase Test" tab</li>
            <li>5. 💡 Pusher is now configured and ready to use!</li>
          </ol>
        </div>
      </div>
    </div>
  )
}

export default App
