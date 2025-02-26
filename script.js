const img = document.querySelector('img');
const ssid = document.querySelector('.ssid');
const password = document.querySelector('.password');
const downloadButton = document.querySelector('.download-btn'); // Changed from print-btn to download-btn
const toggleBtn = document.getElementById('toggle-mode');
const body = document.body;

// Update QR Code
function update() {
  const wifi = `WIFI:T:WPA;S:${ssid.value};P:${password.value};;`;
  img.src = `https://api.qrserver.com/v1/create-qr-code/?size=164x164&data=${wifi}`;
}

ssid.addEventListener('keyup', update);
password.addEventListener('keyup', update);

// Download QR Code
downloadButton.addEventListener('click', (event) => {
  event.preventDefault(); // Prevent form submission issues

  // Create a temporary anchor element to trigger the download
  const link = document.createElement('a');
  link.href = img.src;
  link.download = 'wifi_qr_code.png'; // Set the filename for the downloaded image
  document.body.appendChild(link);
  link.click(); // Trigger the download
  document.body.removeChild(link); // Clean up
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