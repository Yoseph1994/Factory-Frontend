import { io } from 'socket.io-client';

const SOCKET_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000' : '/';

export const socket = io(SOCKET_URL, {
  withCredentials: true,
  transports: ['websocket', 'polling'],
  autoConnect: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 2000
});

socket.on('connect', () => {
  console.log('[Socket.IO]: Connected to real-time plant server id =', socket.id);
});

socket.on('connect_error', (err) => {
  console.warn('[Socket.IO Warning]:', err.message);
});
