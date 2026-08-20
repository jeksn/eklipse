# Eklipse

A browser extension that strips away distractions and puts you back in control of your YouTube experience.

## Features

### Home
- **Hide Home Feed** — Remove the algorithmic feed entirely so you only watch what you came for
- **Home Feed Limit** — Limit the number of recommendations on the home page (8, 12, 16, or 24 items). Also hides the "Show more" button when a limit is set.
- **Disable Thumbnail Autoplay** — Stop thumbnails from autoplaying video previews on hover
- **Hide Mixes** — Remove auto-generated mix/radio playlists from the home feed
- **Hide Recommended Categories** — Remove "Explore more topics" sections, filter chips, and other non-video recommended sections
- **Hide Members-Only Videos** — Hide videos with "Members only" badges from all feeds

### Shorts
- **Disable Shorts** — Completely remove all Shorts UI and redirect `/shorts/` URLs to the homepage
  - Uses scoped `:has()` selectors that only hide containers actually containing Shorts content, so YouTube's virtual scroller and search rendering stay intact (no reload loops)
  - Targets modern YouTube elements including `grid-shelf-view-model`, `ytd-rich-grid-group`, and `ytm-shorts-lockup-view-model`
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
