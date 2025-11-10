// Khadem AdBlocker - Content Script
// Blocks ads on all websites

(function() {
  'use strict';
  
  // CSS to hide common ad elements
  const hideAdsCSS = `
    /* Common ad containers */
    [id*="google_ads"],
    [id*="adbanner"],
    [id*="advertisement"],
    [class*="ad-container"],
    [class*="ad-banner"],
    [class*="ad-wrapper"],
    [class*="advertisement"],
    [class*="adsbygoogle"],
    .ad,
    .ads,
    .advert,
    .banner-ad,
    .sponsored,
    .ad-placement,
    iframe[src*="doubleclick"],
    iframe[src*="googlesyndication"],
    iframe[src*="advertising"],
    div[data-ad-slot],
    div[data-google-query-id] {
      display: none !important;
      visibility: hidden !important;
      opacity: 0 !important;
      height: 0 !important;
      width: 0 !important;
    }
    
    /* Popup overlays */
    [class*="modal"][class*="ad"],
    [class*="popup"][class*="ad"],
    [id*="modal"][id*="ad"],
    [id*="popup"][id*="ad"] {
      display: none !important;
    }
    
    /* Sticky ads */
    [class*="sticky"][class*="ad"],
    [class*="fixed"][class*="ad"] {
      display: none !important;
    }
  `;
  
  // Inject CSS
  const style = document.createElement('style');
  style.textContent = hideAdsCSS;
  (document.head || document.documentElement).appendChild(style);
  
  // Remove ad elements from DOM
  function removeAdElements() {
    const adSelectors = [
      '[id*="google_ads"]',
      '[id*="adbanner"]',
      '[class*="ad-container"]',
      '[class*="advertisement"]',
      'iframe[src*="doubleclick"]',
      'iframe[src*="googlesyndication"]',
      'div[data-ad-slot]',
      '.adsbygoogle'
    ];
    
    adSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        el.remove();
        chrome.runtime.sendMessage({ action: 'adBlocked', size: 100 }).catch(() => {});
      });
    });
  }
  
  // Block inline scripts trying to load ads
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.tagName === 'SCRIPT') {
          const src = node.src || '';
          if (src.includes('doubleclick') || 
              src.includes('googlesyndication') ||
              src.includes('advertising')) {
            node.remove();
            chrome.runtime.sendMessage({ action: 'adBlocked' }).catch(() => {});
          }
        }
        
        if (node.tagName === 'IFRAME') {
          const src = node.src || '';
          if (src.includes('doubleclick') || 
              src.includes('googlesyndication') ||
              src.includes('ads')) {
            node.remove();
            chrome.runtime.sendMessage({ action: 'adBlocked' }).catch(() => {});
          }
        }
      });
    });
  });
  
  // Start observing
  if (document.body) {
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
  
  // Initial cleanup
  removeAdElements();
  
  // Periodic cleanup
  setInterval(removeAdElements, 2000);
  
  console.log('🛡️ Khadem AdBlocker: Content protection active');
})();


