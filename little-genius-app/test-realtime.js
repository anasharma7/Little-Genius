// Test script for real-time features
// Run this in the browser console to test Firebase connection

console.log('🧪 Testing Little Genius Real-time Features...');

// Test Firebase connection
async function testFirebaseConnection() {
  try {
    const { db } = await import('./src/firebase.js');
    console.log('✅ Firebase connection successful');
    
    // Test writing to Firestore
    const testRef = db.collection('test');
    await testRef.add({
      message: 'Test message',
      timestamp: new Date()
    });
    console.log('✅ Firestore write successful');
    
    // Test reading from Firestore
    const snapshot = await testRef.get();
    console.log('✅ Firestore read successful');
    console.log('📊 Documents in test collection:', snapshot.size);
    
    return true;
  } catch (error) {
    console.error('❌ Firebase test failed:', error);
    return false;
  }
}

// Test real-time features
function testRealTimeFeatures() {
  console.log('🎯 Testing real-time features...');
  
  // Check if we're on the right page
  const dashboard = document.querySelector('[data-testid="dashboard"]');
  if (dashboard) {
    console.log('✅ Dashboard found');
  } else {
    console.log('⚠️ Dashboard not found - make sure you\'re on the right page');
  }
  
  // Check for Firebase error messages
  const firebaseErrors = document.querySelectorAll('.text-red-700');
  if (firebaseErrors.length > 0) {
    console.log('❌ Firebase errors detected:', firebaseErrors.length);
    firebaseErrors.forEach(error => console.log('Error:', error.textContent));
  } else {
    console.log('✅ No Firebase errors detected');
  }
  
  // Check for real-time indicators
  const liveIndicator = document.querySelector('.animate-pulse');
  if (liveIndicator) {
    console.log('✅ Real-time indicator found');
  } else {
    console.log('⚠️ Real-time indicator not found');
  }
}

// Run tests
console.log('🚀 Starting tests...');
testFirebaseConnection().then(success => {
  if (success) {
    testRealTimeFeatures();
  }
});

console.log('📝 To test real-time features:');
console.log('1. Open multiple browser tabs');
console.log('2. Navigate to the same page');
console.log('3. Try the chat, drawing, or music features');
console.log('4. Watch for real-time updates across tabs'); 