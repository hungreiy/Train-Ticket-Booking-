const initializeSeats = () => {
  const seats = {};
  for (let coach = 1; coach <= 6; coach++) {
    seats[coach] = Array.from({ length: 20 }, (_, i) => ({
      id: `A${i + 1}`,
      status: 'available',
      userSession: null
    }));
  }
  return seats;
};

const lockSeat = (seats, coach, seatId, userSession) => {
  const seat = seats[coach].find(s => s.id === seatId);
  
  if (!seat || seat.status !== 'available') {
    return { success: false, message: 'Seat unavailable' };
  }

  seat.status = 'locked';
  seat.userSession = userSession;
  setTimeout(() => {
    if (seat.status === 'locked') {
      seat.status = 'available';
      seat.userSession = null;
    }
  }, 300000); // Auto-release after 5 minutes

  return { success: true, seat };
};

module.exports = { initializeSeats, lockSeat };
