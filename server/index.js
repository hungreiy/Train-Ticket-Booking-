const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { initializeSeats, lockSeat, confirmBooking } = require('./seats');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Initialize 6 coaches with 20 seats each
let seats = initializeSeats();

// Real-time updates
io.on('connection', (socket) => {
  socket.emit('seat-update', seats);
});

// API Endpoints
app.get('/api/seats', (req, res) => {
  res.json(seats);
});

app.post('/api/book', (req, res) => {
  const { coach, seatId, userSession } = req.body;
  const result = lockSeat(seats, coach, seatId, userSession);
  io.emit('seat-update', seats);
  res.json(result);
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
