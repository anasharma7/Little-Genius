import Pusher from 'pusher-js';

// Initialize Pusher with your actual credentials
const pusher = new Pusher('5a3bfdcf7b655154092b', {
  cluster: 'us2',
  encrypted: true
});

export default pusher;

// Helper function to get a channel
export const getChannel = (channelName) => {
  return pusher.subscribe(channelName);
};

// Helper function to send a message (you'll need a backend for this)
export const sendMessage = async (channelName, eventName, data) => {
  // For now, we'll just log the message
  // In a real app, you'd send this to your backend
  console.log(`Sending to ${channelName}:`, data);
  
  // Simulate real-time by triggering the event locally
  const channel = getChannel(channelName);
  channel.trigger(eventName, data);
}; 