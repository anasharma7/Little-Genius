import { useState } from 'react'
import './App.css'
import ChatRoom from './components/ChatRoom'
import RealTimeCounter from './components/RealTimeCounter'
import RealTimeDashboard from './components/RealTimeDashboard'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')

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
          </div>
        </div>

        {/* Content */}
        <div className="mb-8">
          {activeTab === 'dashboard' && <RealTimeDashboard appId="little-genius-67ad1" userId="demo-user" />}
          {activeTab === 'chat' && <ChatRoom />}
          {activeTab === 'counter' && <RealTimeCounter />}
        </div>

        {/* Setup Instructions */}
        <div className="max-w-2xl mx-auto bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-800 mb-2">Setup Instructions:</h3>
          <ol className="text-sm text-yellow-700 space-y-1">
            <li>1. Create a Firebase project at <a href="https://console.firebase.google.com" target="_blank" rel="noopener noreferrer" className="underline">Firebase Console</a></li>
            <li>2. Enable Firestore Database in your project</li>
            <li>3. Update the Firebase config in <code className="bg-yellow-100 px-1 rounded">src/firebase.js</code></li>
            <li>4. Set Firestore security rules to allow read/write access</li>
            <li>5. Open multiple browser tabs to test real-time functionality!</li>
          </ol>
        </div>
      </div>
    </div>
  )
}

export default App
