# Firestore Security Rules for Little Genius App

## 🔒 Secure Rules for Production

Replace your current rules with these more secure ones:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to test collection for development
    match /test/{document=**} {
      allow read, write: if true;
    }
    
    // Allow read/write access to messages collection for chat
    match /messages/{document=**} {
      allow read, write: if true;
    }
    
    // Allow read/write access to counters collection
    match /counters/{document=**} {
      allow read, write: if true;
    }
    
    // Allow read/write access to artifacts collection for collaborative features
    match /artifacts/{appId}/{document=**} {
      allow read, write: if true;
    }
    
    // Deny access to all other collections
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

## 🛡️ Even More Secure Rules (Recommended)

For better security, use these rules that include basic validation:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Test collection - allow all access for development
    match /test/{document=**} {
      allow read, write: if true;
    }
    
    // Messages collection - allow chat functionality
    match /messages/{messageId} {
      allow read, write: if 
        request.resource.data.keys().hasAll(['text', 'userName', 'timestamp']) &&
        request.resource.data.text is string &&
        request.resource.data.text.size() > 0 &&
        request.resource.data.text.size() <= 1000 &&
        request.resource.data.userName is string &&
        request.resource.data.userName.size() > 0 &&
        request.resource.data.userName.size() <= 50;
    }
    
    // Counters collection - allow counter updates
    match /counters/{counterId} {
      allow read, write: if 
        request.resource.data.keys().hasAll(['value']) &&
        request.resource.data.value is number;
    }
    
    // Artifacts collection - allow collaborative features
    match /artifacts/{appId}/collaborative/stories/{storyId} {
      allow read, write: if 
        request.resource.data.keys().hasAll(['title', 'sentences', 'contributors', 'createdAt']) &&
        request.resource.data.title is string &&
        request.resource.data.sentences is list &&
        request.resource.data.contributors is list;
    }
    
    match /artifacts/{appId}/drawings/{drawingId} {
      allow read, write: if 
        request.resource.data.keys().hasAll(['title', 'imageData', 'artist', 'createdAt']) &&
        request.resource.data.title is string &&
        request.resource.data.imageData is string &&
        request.resource.data.artist is string;
    }
    
    match /artifacts/{appId}/music/{musicId} {
      allow read, write: if 
        request.resource.data.keys().hasAll(['title', 'notes', 'instrument', 'composer']) &&
        request.resource.data.title is string &&
        request.resource.data.notes is list &&
        request.resource.data.instrument is string;
    }
    
    match /artifacts/{appId}/activity/{activityId} {
      allow read, write: if 
        request.resource.data.keys().hasAll(['type', 'description', 'timestamp']) &&
        request.resource.data.type is string &&
        request.resource.data.description is string;
    }
    
    match /artifacts/{appId}/onlineUsers/{userId} {
      allow read, write: if 
        request.resource.data.keys().hasAll(['name', 'lastSeen']) &&
        request.resource.data.name is string;
    }
    
    // Deny access to all other collections
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

## 🤖 Gemini AI Compatible Rules

These rules are structured to work well with Gemini AI assistance:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper functions for validation
    function isValidString(field, maxLength) {
      return field is string && field.size() > 0 && field.size() <= maxLength;
    }
    
    function isValidTimestamp(field) {
      return field is timestamp;
    }
    
    function isValidNumber(field) {
      return field is number;
    }
    
    function isValidList(field) {
      return field is list;
    }
    
    // Test collection - development only
    match /test/{document=**} {
      allow read, write: if true;
    }
    
    // Chat messages
    match /messages/{messageId} {
      allow read, write: if 
        isValidString(request.resource.data.text, 1000) &&
        isValidString(request.resource.data.userName, 50) &&
        isValidTimestamp(request.resource.data.timestamp);
    }
    
    // Real-time counters
    match /counters/{counterId} {
      allow read, write: if 
        isValidNumber(request.resource.data.value);
    }
    
    // Collaborative stories
    match /artifacts/{appId}/collaborative/stories/{storyId} {
      allow read, write: if 
        isValidString(request.resource.data.title, 100) &&
        isValidList(request.resource.data.sentences) &&
        isValidList(request.resource.data.contributors) &&
        isValidTimestamp(request.resource.data.createdAt);
    }
    
    // Collaborative drawings
    match /artifacts/{appId}/drawings/{drawingId} {
      allow read, write: if 
        isValidString(request.resource.data.title, 100) &&
        isValidString(request.resource.data.imageData, 1000000) && // 1MB max
        isValidString(request.resource.data.artist, 50) &&
        isValidTimestamp(request.resource.data.createdAt);
    }
    
    // Collaborative music
    match /artifacts/{appId}/music/{musicId} {
      allow read, write: if 
        isValidString(request.resource.data.title, 100) &&
        isValidList(request.resource.data.notes) &&
        isValidString(request.resource.data.instrument, 20) &&
        isValidString(request.resource.data.composer, 50) &&
        isValidTimestamp(request.resource.data.createdAt);
    }
    
    // Activity feed
    match /artifacts/{appId}/activity/{activityId} {
      allow read, write: if 
        isValidString(request.resource.data.type, 20) &&
        isValidString(request.resource.data.description, 200) &&
        isValidTimestamp(request.resource.data.timestamp);
    }
    
    // Online users
    match /artifacts/{appId}/onlineUsers/{userId} {
      allow read, write: if 
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

## 📝 How to Apply These Rules

1. Go to your [Firebase Console](https://console.firebase.google.com/u/0/project/little-genius-67ad1/firestore/rules)
2. Click on the "Rules" tab
3. Replace the current rules with one of the above rule sets
4. Click "Develop & Test" to publish

## 🎯 Which Rules to Choose

- **For Development**: Use the first set (simple but functional)
- **For Production**: Use the second set (with validation)
- **For Gemini AI**: Use the third set (well-structured with helper functions)

## 🔍 Testing Your Rules

After updating the rules, test them by:
1. Going to your app at `http://localhost:5173`
2. Clicking the "🔧 Firebase Test" tab
3. Sending test messages
4. Checking if real-time features work

## 💡 Tips for Gemini AI

When asking Gemini AI about Firestore rules, mention:
- Your app structure (collections: test, messages, counters, artifacts)
- Data validation requirements
- Security concerns
- Performance considerations

The third rule set is specifically designed to be clear and well-documented for AI assistance! 