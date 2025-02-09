const seats = Array(120).fill(false); // 6 coaches * 20 seats
const seatingPlan = document.getElementById('seating-plan');

function renderSeats() {
    seatingPlan.innerHTML = '';
    seats.forEach((isLocked, index) => {
        const seat = document.createElement('div');
        seat.className = `seat ${isLocked ? 'locked' : ''}`;
        seat.innerText = index + 1;
        seat.onclick = () => bookSeat(index);
        seatingPlan.appendChild(seat);
    });
}

function bookSeat(index) {
    if (!seats[index]) {
        seats[index] = true; // Lock the seat
        renderSeats();
        alert(`Seat ${index + 1} booked!`);
    } else {
        alert(`Seat ${index + 1} is already locked.`);
    }
}

renderSeats();
