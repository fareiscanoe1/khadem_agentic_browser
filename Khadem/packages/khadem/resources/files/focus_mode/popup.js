// Khadem Focus Mode - Popup UI Controller

let focusModeEnabled = false;
let stats = null;

// Load current status
async function loadStatus() {
  const response = await chrome.runtime.sendMessage({ action: 'getStatus' });
  focusModeEnabled = response.enabled;
  stats = response.stats;
  
  updateUI();
}

// Toggle focus mode
async function toggleFocusMode() {
  const response = await chrome.runtime.sendMessage({ action: 'toggle' });
  focusModeEnabled = response.enabled;
  stats = response.stats;
  
  updateUI();
}

// Update UI based on status
function updateUI() {
  const toggleBtn = document.getElementById('toggleBtn');
  const focusTimeEl = document.getElementById('focusTime');
  const sitesBlockedEl = document.getElementById('sitesBlocked');
  const streakEl = document.getElementById('streak');
  
  if (focusModeEnabled) {
    toggleBtn.textContent = '✅ Focus Mode Active';
    toggleBtn.classList.add('active');
  } else {
    toggleBtn.textContent = '🚀 Start Focusing';
    toggleBtn.classList.remove('active');
  }
  
  // Calculate focus time
  let totalMinutes = Math.floor(stats.totalFocusTime / 60000);
  if (stats.startTime) {
    const currentSessionMinutes = Math.floor((Date.now() - stats.startTime) / 60000);
    totalMinutes += currentSessionMinutes;
  }
  
  if (totalMinutes < 60) {
    focusTimeEl.textContent = `${totalMinutes}m`;
  } else {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    focusTimeEl.textContent = `${hours}h ${minutes}m`;
  }
  
  sitesBlockedEl.textContent = stats.sitesBlocked;
  streakEl.textContent = `${stats.streak} days`;
}

// Event listeners
document.getElementById('toggleBtn').addEventListener('click', toggleFocusMode);

// Load status on popup open
loadStatus();


