# Eklipse

A browser extension that helps you focus on YouTube by hiding distractions.

## Features

- Hide YouTube home feed
- Hide comments section
- Hide Shorts
- Disable thumbnail autoplay

## Development

```bash
# Install dependencies
pnpm install

# Start development
pnpm dev

# Build for production
pnpm build

# Build for Firefox
pnpm build:firefox
```

## Installation

1. Build the extension: `pnpm build`
2. Load the unpacked extension in your browser:
   - Chrome: Go to `chrome://extensions/` → Enable "Developer mode" → "Load unpacked"
   - Firefox: Go to `about:debugging` → "This Firefox" → "Load Temporary Add-on"
