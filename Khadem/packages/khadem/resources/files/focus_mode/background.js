// Khadem Focus Mode - Background Service Worker
// AI-powered distraction blocking

const DEFAULT_BLOCKED_SITES = [
  'youtube.com',
  'reddit.com',
  'twitter.com',
  'x.com',
  'facebook.com',
  'instagram.com',
  'tiktok.com',
  'netflix.com',
  'twitch.tv',
  'pinterest.com',
  'tumblr.com',
  '9gag.com'
];

let focusModeEnabled = false;
let blockedSites = DEFAULT_BLOCKED_SITES;
let focusStats = {
  startTime: null,
  totalFocusTime: 0,
  sitesBlocked: 0,
  streak: 0
};

// Load settings on startup
chrome.storage.local.get(['focusModeEnabled', 'blockedSites', 'focusStats'], (result) => {
  focusModeEnabled = result.focusModeEnabled || false;
  blockedSites = result.blockedSites || DEFAULT_BLOCKED_SITES;
  focusStats = result.focusStats || focusStats;
  
  if (focusModeEnabled) {
    updateBlockingRules();
  }
});

// Toggle focus mode
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'toggle') {
    focusModeEnabled = !focusModeEnabled;
    chrome.storage.local.set({ focusModeEnabled });
    
    if (focusModeEnabled) {
      focusStats.startTime = Date.now();
      updateBlockingRules();
    } else {
      // Update total focus time
      if (focusStats.startTime) {
        const sessionTime = Date.now() - focusStats.startTime;
        focusStats.totalFocusTime += sessionTime;
        focusStats.startTime = null;
      }
      chrome.storage.local.set({ focusStats });
      clearBlockingRules();
    }
    
    sendResponse({ enabled: focusModeEnabled, stats: focusStats });
  } else if (message.action === 'getStatus') {
    sendResponse({ enabled: focusModeEnabled, stats: focusStats, blockedSites });
  } else if (message.action === 'updateSites') {
    blockedSites = message.sites;
    chrome.storage.local.set({ blockedSites });
    if (focusModeEnabled) {
      updateBlockingRules();
    }
    sendResponse({ success: true });
  }
  return true;
});

// Update blocking rules
async function updateBlockingRules() {
  const rules = blockedSites.map((domain, index) => ({
    id: index + 1,
    priority: 1,
    action: {
      type: 'redirect',
      redirect: {
        url: chrome.runtime.getURL('blocked.html') + '?site=' + domain
      }
    },
    condition: {
      urlFilter: `*://*.${domain}/*`,
      resourceTypes: ['main_frame']
    }
  }));
  
  try {
    // Remove old rules
    const existingRules = await chrome.declarativeNetRequest.getDynamicRules();
    const ruleIds = existingRules.map(rule => rule.id);
    await chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: ruleIds,
      addRules: rules
    });
    
    // Update icon
    chrome.action.setIcon({
      path: {
        "16": "assets/icon16_active.png",
        "48": "assets/icon48_active.png",
        "128": "assets/icon128_active.png"
      }
    });
    
    console.log('✅ Focus Mode activated - blocking', blockedSites.length, 'sites');
  } catch (error) {
    console.error('Error updating blocking rules:', error);
  }
}

async function clearBlockingRules() {
  try {
    const existingRules = await chrome.declarativeNetRequest.getDynamicRules();
    const ruleIds = existingRules.map(rule => rule.id);
    await chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: ruleIds
    });
    
    // Update icon
    chrome.action.setIcon({
      path: {
        "16": "assets/icon16.png",
        "48": "assets/icon48.png",
        "128": "assets/icon128.png"
      }
    });
    
    console.log('✅ Focus Mode deactivated');
  } catch (error) {
    console.error('Error clearing blocking rules:', error);
  }
}

// Track blocked attempts
chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  if (focusModeEnabled && details.frameId === 0) {
    const url = new URL(details.url);
    const isBlocked = blockedSites.some(site => url.hostname.includes(site));
    
    if (isBlocked) {
      focusStats.sitesBlocked++;
      chrome.storage.local.set({ focusStats });
    }
  }
});

// Productivity reminder every hour
chrome.alarms.create('focusReminder', { periodInMinutes: 60 });

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'focusReminder' && focusModeEnabled) {
    const focusMinutes = Math.floor((Date.now() - focusStats.startTime) / 60000);
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'assets/icon128.png',
      title: '🎯 Focus Mode Active',
      message: `You've been focused for ${focusMinutes} minutes! Keep it up!`
    });
  }
});

console.log('🎯 Khadem Focus Mode - Background worker loaded');


