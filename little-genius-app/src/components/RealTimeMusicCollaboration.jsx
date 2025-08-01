import { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, orderBy, query, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

function RealTimeMusicCollaboration({ appId, userId }) {
  const [musicCompositions, setMusicCompositions] = useState([]);
  const [activeComposition, setActiveComposition] = useState(null);
  const [newNote, setNewNote] = useState('');
  const [selectedInstrument, setSelectedInstrument] = useState('piano');
  const [isPlaying, setIsPlaying] = useState(false);

  // Real-time listener for music compositions
  useEffect(() => {
    if (!db || !appId) return;
    
    const compositionsRef = collection(db, `artifacts/${appId}/music`);
    const q = query(compositionsRef, orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const compositions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMusicCompositions(compositions);
    });

    return () => unsubscribe();
  }, [db, appId]);

  const instruments = [
    { id: 'piano', name: 'Piano', emoji: '🎹' },
    { id: 'guitar', name: 'Guitar', emoji: '🎸' },
    { id: 'violin', name: 'Violin', emoji: '🎻' },
    { id: 'drums', name: 'Drums', emoji: '🥁' },
    { id: 'flute', name: 'Flute', emoji: '🎺' }
  ];

  const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

  const createComposition = async () => {
    if (!db || !appId || !userId) return;
    
    try {
      const compositionData = {
        title: 'Collaborative Symphony',
        notes: [],
        instrument: selectedInstrument,
        composer: userId,
        createdAt: serverTimestamp(),
        contributors: [userId]
      };
      
      await addDoc(collection(db, `artifacts/${appId}/music`), compositionData);
    } catch (error) {
      console.error('Error creating composition:', error);
    }
  };

  const addNoteToComposition = async (compositionId) => {
    if (!newNote.trim() || !db || !appId || !userId) return;
    
    try {
      const compositionRef = doc(db, `artifacts/${appId}/music`, compositionId);
      const composition = musicCompositions.find(c => c.id === compositionId);
      
      if (composition) {
        const updatedNotes = [...(composition.notes || []), {
          note: newNote,
          instrument: selectedInstrument,
          addedBy: userId,
          timestamp: serverTimestamp()
        }];
        
        const updatedContributors = composition.contributors.includes(userId) 
          ? composition.contributors 
          : [...composition.contributors, userId];
        
        await updateDoc(compositionRef, {
          notes: updatedNotes,
          contributors: updatedContributors,
          lastUpdated: serverTimestamp()
        });
        
        setNewNote('');
      }
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const playNote = (note) => {
    // Simple audio feedback (in a real app, you'd use Web Audio API)
    console.log(`Playing ${note} on ${selectedInstrument}`);
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 200);
  };

  const playComposition = (composition) => {
    if (!composition.notes || composition.notes.length === 0) return;
    
    setIsPlaying(true);
    composition.notes.forEach((noteData, index) => {
      setTimeout(() => {
        console.log(`Playing ${noteData.note} on ${noteData.instrument}`);
      }, index * 500);
    });
    
    setTimeout(() => setIsPlaying(false), composition.notes.length * 500);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
      <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">
        🎵 Collaborative Music Studio
      </h2>
      
      {/* Instrument Selection */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h3 className="text-xl font-bold text-blue-600 mb-4">Choose Your Instrument</h3>
        <div className="flex flex-wrap gap-3">
          {instruments.map((instrument) => (
            <button
              key={instrument.id}
              onClick={() => setSelectedInstrument(instrument.id)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedInstrument === instrument.id
                  ? 'border-purple-500 bg-purple-50 text-purple-700'
                  : 'border-gray-200 hover:border-purple-300'
              }`}
            >
              <div className="text-2xl mb-2">{instrument.emoji}</div>
              <div className="font-semibold">{instrument.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Create New Composition */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h3 className="text-xl font-bold text-green-600 mb-4">Start a New Composition</h3>
        <button
          onClick={createComposition}
          className="bg-green-500 text-white px-6 py-3 rounded-full text-lg font-bold hover:bg-green-600"
        >
          🚀 Create Symphony Together!
        </button>
      </div>

      {/* Music Compositions */}
      <div className="space-y-6">
        {musicCompositions.map((composition) => (
          <div key={composition.id} className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xl font-bold text-blue-600">{composition.title}</h4>
              <button
                onClick={() => playComposition(composition)}
                disabled={isPlaying || !composition.notes?.length}
                className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 disabled:opacity-50"
              >
                {isPlaying ? '🎵 Playing...' : '▶️ Play'}
              </button>
            </div>
            
            {/* Musical Notes */}
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h5 className="font-semibold text-gray-700 mb-2">Musical Notes:</h5>
              <div className="flex flex-wrap gap-2">
                {composition.notes?.map((noteData, index) => (
                  <div
                    key={index}
                    className="bg-white px-3 py-2 rounded-lg border border-gray-200 flex items-center gap-2"
                  >
                    <span className="text-lg font-bold text-purple-600">{noteData.note}</span>
                    <span className="text-sm text-gray-500">on</span>
                    <span className="text-sm">{noteData.instrument}</span>
                  </div>
                ))}
              </div>
              {(!composition.notes || composition.notes.length === 0) && (
                <p className="text-gray-600">No notes yet! Add the first one! 🎵</p>
              )}
            </div>

            {/* Add New Note */}
            <div className="flex gap-2 mb-4">
              <select
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="p-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a note...</option>
                {notes.map((note) => (
                  <option key={note} value={note}>{note}</option>
                ))}
              </select>
              <button
                onClick={() => addNoteToComposition(composition.id)}
                disabled={!newNote}
                className="bg-blue-500 text-white px-4 py-3 rounded-lg font-bold hover:bg-blue-600 disabled:opacity-50"
              >
                Add Note! 🎵
              </button>
            </div>

            {/* Quick Note Buttons */}
            <div className="flex flex-wrap gap-2 mb-4">
              {notes.map((note) => (
                <button
                  key={note}
                  onClick={() => {
                    setNewNote(note);
                    playNote(note);
                  }}
                  className="bg-yellow-100 text-yellow-800 px-3 py-2 rounded-lg hover:bg-yellow-200 font-bold"
                >
                  {note}
                </button>
              ))}
            </div>

            {/* Composition Info */}
            <div className="text-sm text-gray-600">
              <p>Contributors: {composition.contributors?.length || 0} musicians</p>
              <p>Notes: {composition.notes?.length || 0}</p>
              <p>Last updated: {composition.lastUpdated?.toDate?.()?.toLocaleTimeString() || 'Just now'}</p>
            </div>
          </div>
        ))}
      </div>

      {musicCompositions.length === 0 && (
        <div className="text-center text-gray-600">
          <p className="text-lg">No compositions yet!</p>
          <p>Start creating beautiful music with friends! 🎼</p>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-6 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
        <h4 className="font-semibold text-yellow-800 mb-2">How to Make Music Together:</h4>
        <ul className="text-yellow-700 text-sm space-y-1">
          <li>• Choose your favorite instrument</li>
          <li>• Create a new composition or join an existing one</li>
          <li>• Add musical notes to build the melody</li>
          <li>• Play the composition to hear your creation</li>
          <li>• Open multiple browser tabs to collaborate in real-time!</li>
        </ul>
      </div>
    </div>
  );
}

export default RealTimeMusicCollaboration; 