// Khadem AdBlocker - YouTube Ad Skipper
// Automatically skips YouTube ads and removes ad elements

(function() {
  'use strict';
  
  console.log('🛡️ Khadem AdBlocker - YouTube module loaded');
  
  // Notify background that we're on YouTube
  chrome.runtime.sendMessage({ action: 'youtubeSession' }).catch(() => {});
  
  // Remove ad containers
  function removeAdElements() {
    // Video ads overlay
    const adOverlays = document.querySelectorAll(
      '.video-ads, .ytp-ad-module, .ytp-ad-overlay-container, ' +
      '.ytp-ad-text, .ytp-ad-preview-container, #player-ads, ' +
      '.ad-container, .ad-showing'
    );
    
    adOverlays.forEach(el => {
      el.remove();
      chrome.runtime.sendMessage({ action: 'adBlocked', size: 200 }).catch(() => {});
    });
    
    // Banner ads
    const bannerAds = document.querySelectorAll(
      'ytd-display-ad-renderer, ytd-promoted-sparkles-web-renderer, ' +
      'ytd-promoted-video-renderer, ytd-compact-promoted-video-renderer, ' +
      '.ytd-merch-shelf-renderer, .ytd-player-legacy-desktop-watch-ads-renderer'
    );
    
    bannerAds.forEach(el => {
      el.remove();
      chrome.runtime.sendMessage({ action: 'adBlocked', size: 150 }).catch(() => {});
    });
  }
  
  // Skip video ads
  function skipVideoAd() {
    // Click skip button if available
    const skipButton = document.querySelector(
      '.ytp-ad-skip-button, .ytp-skip-ad-button, ' +
      '.videoAdUiSkipButton, button.ytp-ad-skip-button-modern'
    );
    
    if (skipButton) {
      skipButton.click();
      console.log('✅ Khadem: Skipped YouTube ad');
      chrome.runtime.sendMessage({ action: 'adBlocked', size: 300 }).catch(() => {});
    }
    
    // Fast-forward ad if can't skip yet
    const video = document.querySelector('video.html5-main-video');
    if (video && video.duration) {
      const adIndicator = document.querySelector('.ytp-ad-player-overlay');
      if (adIndicator) {
        // Jump to end of ad
        video.currentTime = video.duration;
        console.log('⏭️ Khadem: Fast-forwarded YouTube ad');
      }
    }
  }
  
  // Remove suggested ads in sidebar
  function removeSidebarAds() {
    const sidebarAds = document.querySelectorAll(
      'ytd-ad-slot-renderer, ytd-display-ad-renderer'
    );
    
    sidebarAds.forEach(el => {
      el.remove();
    });
  }
  
  // Clean homepage ads
  function removeHomepageAds() {
    const homepageAds = document.querySelectorAll(
      'ytd-rich-item-renderer[is-ad], ' +
      'ytd-ad-slot-renderer, ' +
      '[id^="player-ads"]'
    );
    
    homepageAds.forEach(el => {
      el.remove();
    });
  }
  
  // Run cleaners
  function runCleaners() {
    removeAdElements();
    skipVideoAd();
    removeSidebarAds();
    removeHomepageAds();
  }
  
  // Run immediately
  runCleaners();
  
  // Run every 500ms to catch dynamic ads
  setInterval(runCleaners, 500);
  
  // Watch for DOM changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length) {
        runCleaners();
      }
    });
  });
  
  // Start observing
  if (document.body) {
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
  
  // Hide ad-playing indicator
  const style = document.createElement('style');
  style.textContent = `
    .video-ads,
    .ytp-ad-module,
    .ytp-ad-overlay-container,
    .ytp-ad-text,
    #player-ads,
    .ad-container,
    .ad-showing,
    ytd-display-ad-renderer,
    ytd-promoted-sparkles-web-renderer,
    ytd-ad-slot-renderer {
      display: none !important;
      visibility: hidden !important;
    }
  `;
  document.head.appendChild(style);
  
  console.log('✅ Khadem AdBlocker: YouTube protection active');
})();


