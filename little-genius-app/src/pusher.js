import Pusher from 'pusher-js';

// Initialize Pusher
const pusher = new Pusher('your-app-key', {
  cluster: 'your-cluster',
  encrypted: true
});

export default pusher;

// For development, you can use a free Pusher account
// Sign up at https://pusher.com/ and get your credentials 