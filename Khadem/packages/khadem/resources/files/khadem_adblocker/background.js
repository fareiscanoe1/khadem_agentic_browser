// Khadem AdBlocker - Background Service Worker
// Blocks ads, trackers, and YouTube ads

let adBlockerEnabled = true;
let stats = {
  adsBlocked: 0,
  trackersBlocked: 0,
  youtubeSessions: 0,
  bandwidthSaved: 0
};

// Common ad domains to block
const AD_DOMAINS = [
  'doubleclick.net',
  'googlesyndication.com',
  'googleadservices.com',
  'google-analytics.com',
  'facebook.com/tr',
  'facebook.net',
  'scorecardresearch.com',
  'adnxs.com',
  'advertising.com',
  'adsystem.com',
  'adtechus.com',
  'amazon-adsystem.com',
  'advertising.yahoo.com',
  'ads.yahoo.com',
  'analytics.twitter.com',
  'ads-twitter.com',
  'ads.linkedin.com',
  'ads.reddit.com',
  'ads.pinterest.com',
  'ads.tiktok.com',
  'taboola.com',
  'outbrain.com',
  'criteo.com',
  'adroll.com',
  'quantserve.com'
];

// YouTube ad patterns
const YOUTUBE_AD_PATTERNS = [
  'googlevideo.com/videoplayback',
  'youtube.com/api/stats/ads',
  'youtube.com/pagead',
  'youtube.com/ptracking',
  'doubleclick.net'
];

// Load settings and stats
chrome.storage.local.get(['adBlockerEnabled', 'stats'], (result) => {
  adBlockerEnabled = result.adBlockerEnabled !== false;
  stats = result.stats || stats;
  updateIcon();
});

// Update icon based on status
function updateIcon() {
  if (adBlockerEnabled) {
    chrome.action.setIcon({
      path: {
        "16": "assets/icon16.png",
        "48": "assets/icon48.png",
        "128": "assets/icon128.png"
      }
    });
    chrome.action.setBadgeText({ text: '' });
  } else {
    chrome.action.setIcon({
      path: {
        "16": "assets/icon16_off.png",
        "48": "assets/icon48_off.png",
        "128": "assets/icon128_off.png"
      }
    });
    chrome.action.setBadgeText({ text: 'OFF' });
    chrome.action.setBadgeBackgroundColor({ color: '#999' });
  }
}

// Listen for messages from popup and content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'toggle') {
    adBlockerEnabled = !adBlockerEnabled;
    chrome.storage.local.set({ adBlockerEnabled });
    updateIcon();
    sendResponse({ enabled: adBlockerEnabled, stats });
  } else if (message.action === 'getStatus') {
    sendResponse({ enabled: adBlockerEnabled, stats });
  } else if (message.action === 'adBlocked') {
    stats.adsBlocked++;
    stats.bandwidthSaved += message.size || 50; // Estimate 50KB per ad
    chrome.storage.local.set({ stats });
  } else if (message.action === 'trackerBlocked') {
    stats.trackersBlocked++;
    chrome.storage.local.set({ stats });
  } else if (message.action === 'youtubeSession') {
    stats.youtubeSessions++;
    chrome.storage.local.set({ stats });
  }
  return true;
});

// Intercept requests and block ads
chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    if (!adBlockerEnabled) return;
    
    const url = details.url.toLowerCase();
    
    // Check if it's an ad domain
    for (const domain of AD_DOMAINS) {
      if (url.includes(domain)) {
        chrome.runtime.sendMessage({ action: 'adBlocked', size: 50 }).catch(() => {});
        return { cancel: true };
      }
    }
    
    // Check for YouTube ads
    if (url.includes('youtube.com') || url.includes('googlevideo.com')) {
      for (const pattern of YOUTUBE_AD_PATTERNS) {
        if (url.includes(pattern) && (url.includes('&ad') || url.includes('adformat'))) {
          chrome.runtime.sendMessage({ action: 'adBlocked', size: 100 }).catch(() => {});
          return { cancel: true };
        }
      }
    }
    
    return {};
  },
  {
    urls: ["<all_urls>"],
    types: ["script", "xmlhttprequest", "image", "media", "sub_frame"]
  },
  ["blocking"]
);

// Block tracking pixels
chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    if (!adBlockerEnabled) return;
    
    const url = details.url.toLowerCase();
    
    // Block common trackers
    if (url.includes('analytics') || 
        url.includes('tracking') || 
        url.includes('pixel') ||
        url.includes('beacon')) {
      chrome.runtime.sendMessage({ action: 'trackerBlocked' }).catch(() => {});
      return { cancel: true };
    }
    
    return {};
  },
  { urls: ["<all_urls>"], types: ["image", "xmlhttprequest"] },
  ["blocking"]
);

// Update badge with blocked count
setInterval(() => {
  if (adBlockerEnabled && stats.adsBlocked > 0) {
    const count = stats.adsBlocked >= 1000 
      ? (stats.adsBlocked / 1000).toFixed(1) + 'K'
      : stats.adsBlocked.toString();
    chrome.action.setBadgeText({ text: count });
    chrome.action.setBadgeBackgroundColor({ color: '#22c55e' });
  }
}, 5000);

console.log('🛡️ Khadem AdBlocker - Background worker loaded');


