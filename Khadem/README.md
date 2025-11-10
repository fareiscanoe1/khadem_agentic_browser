# 🌐 Khadem Browser

**An AI-powered Chromium browser with Smart Focus Mode**

---

## What is Khadem?

Khadem is an open-source Chromium fork that runs AI agents natively, based on Khadem with exclusive productivity features.

**🔒 Privacy first** - use your own API keys or run local models with Ollama. Your data stays on your computer.

---

## 🌟 **UNIQUE FEATURE: Smart Focus Mode** 🎯

**Khadem's exclusive AI-powered productivity feature!**

### What makes it special:
- 🚫 **Blocks distracting websites** (YouTube, Reddit, Twitter, etc.)
- 📊 **Tracks focus time** and productivity stats  
- 🤖 **AI detection** of time-wasting patterns
- ⚡ **One-click toggle** (Cmd/Ctrl + Shift + F)
- ⏰ **Scheduled focus sessions**

**No other Chromium browser has this!**

[Read more about Focus Mode →](./FOCUS_MODE.md)

---

## Features

### 🤖 **AI Agents**
Automate any task—from scraping websites to filling out forms—just by describing what you want in plain language.

### 🎯 **Smart Focus Mode** (Unique to Khadem!)
AI-powered distraction blocking to keep you productive.

### 🪟 **Split-View AI**
Use ChatGPT, Gemini, Claude in a side panel while browsing.

### 🔌 **MCP Servers**
Pre-installed servers for Gmail, Calendar, Docs, Sheets, and Notion.

### 🧠 **Semantic Search**
Search history and bookmarks by meaning, not just keywords.

### 🛡️ **Privacy First**
Run models locally with Ollama or bring your own API keys.

---

## Quick Start

### Building from Source

**Requirements:**
- Python 3.9+
- Node.js 18+
- Git

**Build:**
```bash
cd packages/khadem/build
python build.py
```

This will:
1. Download Chromium source
2. Apply Khadem patches
3. Build the browser
4. Create installer

**Platforms:**
- macOS (x64, arm64)
- Windows (x64)
- Linux (x64, arm64)

---

## What Makes Khadem Different?

| Feature | Chrome | Brave | Arc | **Khadem** |
|---------|--------|-------|-----|------------|
| AI Agents | ❌ | ❌ | ❌ | ✅ |
| **Smart Focus Mode** | ❌ | ❌ | ❌ | **✅** |
| Open Source | ❌ | ✅ | ❌ | ✅ |
| Local AI | ❌ | ❌ | ❌ | ✅ |
| MCP Support | ❌ | ❌ | ❌ | ✅ |
| Privacy First | ❌ | ✅ | ❌ | ✅ |

---

## Project Structure

```
Khadem/
├── packages/
│   ├── khadem/              ← Main browser
│   │   ├── build/           ← Build system
│   │   ├── chromium_patches/← Chromium modifications
│   │   └── resources/
│   │       └── files/
│   │           ├── ai_side_panel/    ← AI chat
│   │           ├── focus_mode/       ← 🎯 UNIQUE FEATURE!
│   │           └── bug_reporter/
│   └── khadem-agent/     ← Agent backend
├── docs/                    ← Documentation
└── scripts/                 ← Build scripts
```

---

## Development

### Running in Dev Mode:
```bash
cd packages/khadem/build
python dev.py
```

### Adding Features:
1. Create patch in `chromium_patches/`
2. Update `build.py`
3. Rebuild browser

---

## Contributing

We'd love your help making Khadem better!

- 🐛 [Report bugs](https://github.com/your-repo/issues)
- 💡 [Suggest features](https://github.com/your-repo/issues)
- 🔧 Submit pull requests

---

## License

Khadem is open source under the **AGPL-3.0 license**.

Based on [Khadem](https://github.com/khadem-ai/Khadem) and Chromium.

---

## Credits

**Based on:**
- Khadem - Open-source Chromium with AI
- Chromium - Google's open-source browser

**Unique to Khadem:**
- Smart Focus Mode 🎯
- Enhanced productivity features
- Custom branding and UX

---

**Built with ❤️ for productivity and privacy**
