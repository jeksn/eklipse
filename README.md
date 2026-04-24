# Eklipse

A browser extension that strips away distractions and puts you back in control of your YouTube experience.

## Features

### Home
- **Hide Home Feed** — Remove the algorithmic feed entirely so you only watch what you came for
- **Disable Thumbnail Autoplay** — Stop thumbnails from autoplaying video previews on hover

### Shorts
- **Disable Shorts** — Completely remove all Shorts UI and redirect `/shorts/` URLs to the homepage
- **Hide Recommended Shorts** — Remove Shorts shelves and recommendations from feeds
- **Play Shorts in Native Player** — Automatically redirect Shorts to the standard video player

### AI
- **Hide AI Summary** — Remove YouTube's AI-generated video summaries

### Global
- **Redirect Channel Home to Videos** — Skip the channel homepage and go straight to their videos tab
- **Remove Subscriptions** — Hide the subscriptions feed entry from the sidebar

### Video Page
- **Hide Comments** — Remove the comments section from video pages
- **Hide Related Sidebar** — Remove the recommended videos sidebar for a distraction-free viewing experience
- **Hide End Screen Cards** — Remove suggestion overlays that appear at the end of videos
- **Hide Creator Endscreen Elements** — Remove creator-added endscreen cards and overlays

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
