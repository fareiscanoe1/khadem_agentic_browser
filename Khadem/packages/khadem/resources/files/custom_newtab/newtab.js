// Khadem Custom New Tab - Beautiful & Customizable

// Default Wallpapers (Unsplash high-quality)
const DEFAULT_WALLPAPERS = [
  {
    id: 'gradient1',
    name: 'Purple Gradient',
    url: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1920&q=80'
  },
  {
    id: 'gradient2',
    name: 'Blue Gradient',
    url: 'https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=1920&q=80'
  },
  {
    id: 'mountains',
    name: 'Mountains',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80'
  },
  {
    id: 'ocean',
    name: 'Ocean',
    url: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1920&q=80'
  },
  {
    id: 'forest',
    name: 'Forest',
    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80'
  },
  {
    id: 'city',
    name: 'City Night',
    url: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1920&q=80'
  },
  {
    id: 'space',
    name: 'Space',
    url: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1920&q=80'
  },
  {
    id: 'abstract',
    name: 'Abstract',
    url: 'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=1920&q=80'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    url: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=1920&q=80'
  }
];

// Default Quick Links
const DEFAULT_QUICK_LINKS = [
  { name: 'Gmail', icon: '📧', url: 'https://mail.google.com' },
  { name: 'YouTube', icon: '▶️', url: 'https://youtube.com' },
  { name: 'GitHub', icon: '💻', url: 'https://github.com' },
  { name: 'Twitter', icon: '🐦', url: 'https://twitter.com' },
  { name: 'Reddit', icon: '🔴', url: 'https://reddit.com' },
  { name: 'LinkedIn', icon: '💼', url: 'https://linkedin.com' }
];

// State
let currentWallpaper = DEFAULT_WALLPAPERS[0].url;
let quickLinks = DEFAULT_QUICK_LINKS;

// Load saved settings
async function loadSettings() {
  const result = await chrome.storage.local.get(['wallpaper', 'quickLinks']);
  
  if (result.wallpaper) {
    currentWallpaper = result.wallpaper;
  }
  
  if (result.quickLinks) {
    quickLinks = result.quickLinks;
  }
  
  applyWallpaper();
  renderQuickLinks();
}

// Apply wallpaper
function applyWallpaper() {
  const wallpaperEl = document.getElementById('wallpaper');
  wallpaperEl.src = currentWallpaper;
}

// Render quick links
function renderQuickLinks() {
  const container = document.getElementById('quickLinks');
  container.innerHTML = '';
  
  quickLinks.forEach(link => {
    const linkEl = document.createElement('a');
    linkEl.className = 'quick-link';
    linkEl.href = link.url;
    
    linkEl.innerHTML = `
      <div class="quick-link-icon">${link.icon}</div>
      <div class="quick-link-name">${link.name}</div>
    `;
    
    container.appendChild(linkEl);
  });
}

// Update clock
function updateClock() {
  const now = new Date();
  
  // Time
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  document.getElementById('clock').textContent = `${hours}:${minutes}`;
  
  // Date
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  const dateStr = now.toLocaleDateString('en-US', options);
  document.getElementById('date').textContent = dateStr;
}

// Render wallpaper gallery
function renderWallpaperGallery() {
  const gallery = document.getElementById('wallpaperGallery');
  gallery.innerHTML = '';
  
  DEFAULT_WALLPAPERS.forEach(wallpaper => {
    const option = document.createElement('div');
    option.className = 'wallpaper-option';
    if (wallpaper.url === currentWallpaper) {
      option.classList.add('active');
    }
    option.style.backgroundImage = `url(${wallpaper.url})`;
    
    option.innerHTML = `<div class="wallpaper-label">${wallpaper.name}</div>`;
    
    option.addEventListener('click', () => {
      currentWallpaper = wallpaper.url;
      chrome.storage.local.set({ wallpaper: currentWallpaper });
      applyWallpaper();
      renderWallpaperGallery();
    });
    
    gallery.appendChild(option);
  });
}

// Search
document.getElementById('searchBox').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const query = e.target.value.trim();
    if (!query) return;
    
    // Check if it's a URL
    const isUrl = query.includes('.') && !query.includes(' ');
    
    if (isUrl) {
      const url = query.startsWith('http') ? query : `https://${query}`;
      window.location.href = url;
    } else {
      // Search Google
      window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    }
  }
});

// Custom wallpaper input
document.getElementById('customWallpaperInput').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const url = e.target.value.trim();
    if (url) {
      currentWallpaper = url;
      chrome.storage.local.set({ wallpaper: currentWallpaper });
      applyWallpaper();
      renderWallpaperGallery();
      e.target.value = '';
    }
  }
});

// Settings modal
document.getElementById('settingsBtn').addEventListener('click', () => {
  document.getElementById('settingsModal').classList.add('active');
  renderWallpaperGallery();
});

document.getElementById('closeBtn').addEventListener('click', () => {
  document.getElementById('settingsModal').classList.remove('active');
});

document.getElementById('settingsModal').addEventListener('click', (e) => {
  if (e.target.id === 'settingsModal') {
    document.getElementById('settingsModal').classList.remove('active');
  }
});

// Initialize
loadSettings();
updateClock();
setInterval(updateClock, 1000);

console.log('🎨 Khadem Custom New Tab loaded!');


