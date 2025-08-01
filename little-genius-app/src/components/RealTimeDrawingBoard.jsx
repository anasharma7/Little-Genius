import { useState, useEffect, useRef } from 'react';
import { collection, addDoc, onSnapshot, orderBy, query, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

function RealTimeDrawingBoard({ appId, userId }) {
  const [drawings, setDrawings] = useState([]);
  const [activeDrawing, setActiveDrawing] = useState(null);
  const [drawingData, setDrawingData] = useState('');
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 600;
    canvas.height = 400;
    
    const context = canvas.getContext('2d');
    context.strokeStyle = '#000000';
    context.lineWidth = 2;
    context.lineCap = 'round';
    contextRef.current = context;
  }, []);

  // Real-time listener for drawings
  useEffect(() => {
    if (!db || !appId) return;
    
    const drawingsRef = collection(db, `artifacts/${appId}/drawings`);
    const q = query(drawingsRef, orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const drawingsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDrawings(drawingsList);
    });

    return () => unsubscribe();
  }, [db, appId]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const saveDrawing = async () => {
    if (!db || !appId || !userId) return;
    
    try {
      const canvas = canvasRef.current;
      const imageData = canvas.toDataURL('image/png');
      
      const drawingData = {
        title: 'Collaborative Drawing',
        imageData: imageData,
        artist: userId,
        createdAt: serverTimestamp(),
        contributors: [userId]
      };
      
      await addDoc(collection(db, `artifacts/${appId}/drawings`), drawingData);
      clearCanvas();
    } catch (error) {
      console.error('Error saving drawing:', error);
    }
  };

  const loadDrawing = (drawing) => {
    setActiveDrawing(drawing);
    const canvas = canvasRef.current;
    const context = contextRef.current;
    
    const img = new Image();
    img.onload = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0);
    };
    img.src = drawing.imageData;
  };

  return (
    <div className="p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg">
      <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
        🎨 Collaborative Drawing Board
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Drawing Canvas */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-blue-600 mb-4">Draw Together!</h3>
            
            <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
              <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={finishDrawing}
                onMouseLeave={finishDrawing}
                className="cursor-crosshair bg-white"
                style={{ touchAction: 'none' }}
              />
            </div>
            
            <div className="flex gap-2 mt-4">
              <button
                onClick={clearCanvas}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                🗑️ Clear
              </button>
              <button
                onClick={saveDrawing}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                💾 Save Drawing
              </button>
            </div>
            
            <p className="text-sm text-gray-600 mt-2">
              Draw with your mouse! Multiple people can see the drawing in real-time.
            </p>
          </div>
        </div>

        {/* Drawing Gallery */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-purple-600 mb-4">Gallery</h3>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {drawings.map((drawing) => (
                <div
                  key={drawing.id}
                  className="border-2 border-gray-200 rounded-lg p-2 cursor-pointer hover:border-blue-400 transition-colors"
                  onClick={() => loadDrawing(drawing)}
                >
                  <img
                    src={drawing.imageData}
                    alt="Collaborative drawing"
                    className="w-full h-32 object-cover rounded"
                  />
                  <p className="text-sm text-gray-600 mt-2">
                    By: {drawing.artist || 'Anonymous'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {drawing.createdAt?.toDate?.()?.toLocaleDateString() || 'Just now'}
                  </p>
                </div>
              ))}
            </div>
            
            {drawings.length === 0 && (
              <p className="text-gray-600 text-center py-4">
                No drawings yet! Start creating! 🎨
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-6 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
        <h4 className="font-semibold text-yellow-800 mb-2">How to Collaborate:</h4>
        <ul className="text-yellow-700 text-sm space-y-1">
          <li>• Draw on the canvas with your mouse</li>
          <li>• Save your drawing to share with others</li>
          <li>• Click on gallery images to load them</li>
          <li>• Open multiple browser tabs to see real-time collaboration!</li>
        </ul>
      </div>
    </div>
  );
}

export default RealTimeDrawingBoard; 