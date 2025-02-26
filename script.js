const img = document.querySelector('img');
const ssid = document.querySelector('.ssid');
const password = document.querySelector('.password');
const printButton = document.querySelector('.print-btn'); // Select print button properly
const toggleBtn = document.getElementById('toggle-mode');
const body = document.body;

// Update QR Code
function update() {
  const wifi = `WIFI:T:WPA;S:${ssid.value};P:${password.value};;`;
  img.src = `https://api.qrserver.com/v1/create-qr-code/?size=164x164&data=${wifi}`;
}

ssid.addEventListener('keyup', update);
password.addEventListener('keyup', update);

// Ensure only the print button triggers print
printButton.addEventListener('click', (event) => {
  event.preventDefault(); // Prevent form submission issues
  window.print();
});

// Dark Mode Toggle
toggleBtn.addEventListener('click', (event) => {
  event.preventDefault(); // Prevent default behavior
  event.stopPropagation(); // Stop event bubbling (so it doesn't trigger print)
  
  body.classList.toggle('dark');
  const isDark = body.classList.contains('dark');
  localStorage.setItem('darkMode', isDark);
  toggleBtn.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
});

// Load Dark Mode Preference
if (localStorage.getItem('darkMode') === 'true') {
  body.classList.add('dark');
  toggleBtn.textContent = '☀️ Light Mode';
}
