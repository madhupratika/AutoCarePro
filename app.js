// Handle form submissions
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    if (form.id === 'registerForm') {
      registerUser(data);
    } else if (form.id === 'loginForm') {
      loginUser(data);
    } else if (form.id === 'bookingForm') {
      createBooking(data);
    } else if (form.id === 'editBookingForm') {
      updateBooking(data);
    } else if (form.id === 'editProfileForm') {
      updateProfile(data);
    }
  });
});

// Create booking
function createBooking(data) {
  fetch('/bookings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        alert(data.error);
      } else {
        alert('Booking created successfully!');
        window.location.reload();
      }
    })
    .catch(error => console.error(error));
}

function updateBooking(data) {
  fetch(`/bookings/${data.bookingId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      vehicleType: data.vehicleType,
      date: data.date,
      time: data.time,
    }),
  })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        alert(data.error);
      } else {
        alert('Booking updated successfully!');
        window.location.reload();
      }
    })
    .catch(error => console.error(error));
}
