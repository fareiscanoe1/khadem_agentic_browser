// Khadem AdBlocker - Popup UI Controller

let adBlockerEnabled = true;
let stats = null;

// Load current status
async function loadStatus() {
  const response = await chrome.runtime.sendMessage({ action: 'getStatus' });
  adBlockerEnabled = response.enabled;
  stats = response.stats;
  
  updateUI();
}

// Toggle ad blocker
async function toggleAdBlocker() {
  const response = await chrome.runtime.sendMessage({ action: 'toggle' });
  adBlockerEnabled = response.enabled;
  stats = response.stats;
  
  updateUI();
}

// Update UI based on status
function updateUI() {
  const toggleBtn = document.getElementById('toggleBtn');
  const adsBlockedEl = document.getElementById('adsBlocked');
  const trackersBlockedEl = document.getElementById('trackersBlocked');
  const youtubeSessionsEl = document.getElementById('youtubeSessions');
  const bandwidthSavedEl = document.getElementById('bandwidthSaved');
  
  if (adBlockerEnabled) {
    toggleBtn.textContent = '✅ Protection Enabled';
    toggleBtn.classList.remove('disabled');
  } else {
    toggleBtn.textContent = '❌ Protection Disabled';
    toggleBtn.classList.add('disabled');
  }
  
  // Update stats
  adsBlockedEl.textContent = formatNumber(stats.adsBlocked);
  trackersBlockedEl.textContent = formatNumber(stats.trackersBlocked);
  youtubeSessionsEl.textContent = stats.youtubeSessions;
  
  // Convert KB to MB
  const mb = (stats.bandwidthSaved / 1024).toFixed(1);
  bandwidthSavedEl.textContent = `${mb} MB`;
}

// Format large numbers
function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

// Event listeners
document.getElementById('toggleBtn').addEventListener('click', toggleAdBlocker);

// Load status on popup open
loadStatus();

// Auto-refresh stats
setInterval(loadStatus, 2000);


