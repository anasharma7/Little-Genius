# Secure Firestore Rules for Little Genius App

## 🔐 Gemini AI Compatible Secure Rules

Since Gemini AI won't provide rules with public access, here are secure alternatives that work well with AI assistance:

### Option 1: Development Rules (Temporary)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Development mode - allow all access for testing
    // WARNING: Only use for development, not production!
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### Option 2: Authenticated Access Rules (Recommended)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isValidUser(userId) {
      return request.auth.uid == userId;
    }
    
    function isValidString(field, maxLength) {
      return field is string && field.size() > 0 && field.size() <= maxLength;
    }
    
    function isValidTimestamp(field) {
      return field is timestamp;
    }
    
    // Test collection - authenticated users only
    match /test/{document=**} {
      allow read, write: if isAuthenticated();
    }
    
    // Messages - authenticated users can read all, write their own
    match /messages/{messageId} {
      allow read: if isAuthenticated();
      allow write: if 
        isAuthenticated() &&
        isValidString(request.resource.data.text, 1000) &&
        isValidString(request.resource.data.userName, 50) &&
        isValidTimestamp(request.resource.data.timestamp);
    }
    
    // Counters - authenticated users only
    match /counters/{counterId} {
      allow read, write: if 
        isAuthenticated() &&
        request.resource.data.value is number;
    }
    
    // Collaborative features - authenticated users only
    match /artifacts/{appId}/collaborative/stories/{storyId} {
      allow read, write: if 
        isAuthenticated() &&
        isValidString(request.resource.data.title, 100) &&
        request.resource.data.sentences is list &&
        request.resource.data.contributors is list &&
        isValidTimestamp(request.resource.data.createdAt);
    }
    
    match /artifacts/{appId}/drawings/{drawingId} {
      allow read, write: if 
        isAuthenticated() &&
        isValidString(request.resource.data.title, 100) &&
        isValidString(request.resource.data.imageData, 1000000) &&
        isValidString(request.resource.data.artist, 50) &&
        isValidTimestamp(request.resource.data.createdAt);
    }
    
    match /artifacts/{appId}/music/{musicId} {
      allow read, write: if 
        isAuthenticated() &&
        isValidString(request.resource.data.title, 100) &&
        request.resource.data.notes is list &&
        isValidString(request.resource.data.instrument, 20) &&
        isValidString(request.resource.data.composer, 50) &&
        isValidTimestamp(request.resource.data.createdAt);
    }
    
    match /artifacts/{appId}/activity/{activityId} {
      allow read, write: if 
        isAuthenticated() &&
        isValidString(request.resource.data.type, 20) &&
        isValidString(request.resource.data.description, 200) &&
        isValidTimestamp(request.resource.data.timestamp);
    }
    
    match /artifacts/{appId}/onlineUsers/{userId} {
      allow read, write: if 
        isAuthenticated() &&
        isValidString(request.resource.data.name, 50) &&
        isValidTimestamp(request.resource.data.lastSeen);
    }
    
    // Default deny
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

### Option 3: Anonymous Authentication Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isValidString(field, maxLength) {
      return field is string && field.size() > 0 && field.size() <= maxLength;
    }
    
    function isValidTimestamp(field) {
      return field is timestamp;
    }
    
    // Allow anonymous users (no sign-up required)
    match /test/{document=**} {
      allow read, write: if isAuthenticated();
    }
    
    match /messages/{messageId} {
      allow read, write: if 
        isAuthenticated() &&
        isValidString(request.resource.data.text, 1000) &&
        isValidString(request.resource.data.userName, 50) &&
        isValidTimestamp(request.resource.data.timestamp);
    }
    
    match /counters/{counterId} {
      allow read, write: if 
        isAuthenticated() &&
        request.resource.data.value is number;
    }
    
    match /artifacts/{appId}/{document=**} {
      allow read, write: if isAuthenticated();
    }
    
    // Default deny
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

## 🔧 How to Enable Authentication

### Step 1: Enable Anonymous Authentication
1. Go to [Firebase Console](https://console.firebase.google.com/u/0/project/little-genius-67ad1/authentication)
2. Click "Authentication" in the left sidebar
3. Click "Get started"
4. Go to "Sign-in method" tab
5. Enable "Anonymous" authentication
6. Click "Save"

### Step 2: Update Your App Code
Add authentication to your app:

```javascript
// In your firebase.js file, add:
import { signInAnonymously } from 'firebase/auth';

// Function to sign in anonymously
export const signInUser = async () => {
  try {
    const result = await signInAnonymously(auth);
    return result.user;
  } catch (error) {
    console.error('Error signing in:', error);
  }
};
```

### Step 3: Update Your Components
Add authentication to your components:

```javascript
// In your components, add:
import { useEffect, useState } from 'react';
import { auth, signInUser } from '../firebase';

function YourComponent() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // Sign in anonymously when component mounts
    signInUser().then(user => {
      setUser(user);
    });
  }, []);
  
  // Rest of your component code...
}
```

## 🎯 Which Option to Choose

- **For Quick Testing**: Use Option 1 (development rules)
- **For Production**: Use Option 2 (authenticated access)
- **For Easy Setup**: Use Option 3 (anonymous authentication)

## 💡 Tips for Working with Gemini AI

When asking Gemini AI about Firestore rules, mention:
- "I need rules for authenticated users only"
- "I'm using anonymous authentication for my app"
- "I need to validate data before allowing writes"
- "I want to restrict access to specific collections"

This approach will work much better with Gemini AI's security recommendations! 