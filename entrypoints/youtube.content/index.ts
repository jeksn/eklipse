import {
  hideHomeFeed,
  hideComments,
  disableShorts,
  playShortsInNativePlayer,
  disableThumbnailAutoplay,
  hideRelatedSidebar,
  redirectChannelToVideos,
  removeSubscriptions,
  hideEndScreenCards,
  hideCreatorElements,
  hideAISummary,
  homeFeedLimit,
  hideMixes,
  hideRecommendedCategories,
  hideLikeDislike,
  hideSubscribeButton,
  hideShareButton,
  hideDownloadButton,
  hideClipButton,
  hideSaveButton,
  hideThanksButton,
  hideInfoCards,
  hideDescription,
} from '@/utils/storage';

export default defineContentScript({
  matches: ['*://*.youtube.com/*'],
  runAt: 'document_start',

  async main(ctx) {
    const styleEl = document.createElement('style');
    styleEl.id = 'eklipse-styles';
    document.documentElement.append(styleEl);

    function buildCSS(settings: {
      hideHomeFeed: boolean;
      hideComments: boolean;
      disableShorts: boolean;
      playShortsInNativePlayer: boolean;
      disableThumbnailAutoplay: boolean;
      hideRelatedSidebar: boolean;
      redirectChannelToVideos: boolean;
      removeSubscriptions: boolean;
      hideEndScreenCards: boolean;
      hideCreatorElements: boolean;
      hideAISummary: boolean;
      homeFeedLimit: number;
      hideMixes: boolean;
      hideRecommendedCategories: boolean;
      hideLikeDislike: boolean;
      hideSubscribeButton: boolean;
      hideShareButton: boolean;
      hideDownloadButton: boolean;
      hideClipButton: boolean;
      hideSaveButton: boolean;
      hideThanksButton: boolean;
      hideInfoCards: boolean;
      hideDescription: boolean;
    }): string {
      const rules: string[] = [];

      if (settings.hideHomeFeed) {
        rules.push(`
          ytd-browse[page-subtype="home"] #primary,
          ytd-browse[page-subtype="home"] .ytd-browse-primary-contents,
          ytd-browse[page-subtype="home"] ytd-rich-grid-renderer {
            display: none !important;
          }
        `);
      }

      if (settings.hideComments) {
        rules.push(`
          #comments,
          ytd-comments,
          ytd-item-section-renderer#sections #comments {
            display: none !important;
          }
        `);
      }

      if (settings.disableShorts) {
        rules.push(`
          /* Core Shorts elements */
          ytd-rich-section-renderer,
          ytd-reel-shelf-renderer,
          ytd-rich-shelf-renderer[is-shorts],
          ytd-shelf-renderer[is-shorts],
          [is-shorts],
          [is-shorts="true"],
          /* Navigation */
          ytd-mini-guide-entry-renderer[aria-label="Shorts"],
          ytd-guide-entry-renderer a[title="Shorts"],
          a[title="Shorts"],
          ytd-tab-shape-renderer[tab-title="Shorts"],
          /* Hide ALL Shorts shelves by various indicators */
          ytd-reel-shelf-renderer,
          ytd-shelf-renderer:has(> div > ytd-reel-shelf-renderer),
          ytd-shelf-renderer:has([title*="Shorts"]),
          ytd-shelf-renderer:has([title*="shorts"]),
          ytd-shelf-renderer:has([aria-label*="Shorts"]),
          ytd-shelf-renderer:has([aria-label*="shorts"]),
          ytd-item-section-renderer:has(ytd-reel-shelf-renderer),
          ytd-item-section-renderer:has(ytd-rich-shelf-renderer[is-shorts]),
          ytd-rich-section-renderer:has(ytd-reel-shelf-renderer),
          ytd-rich-section-renderer:has(ytd-rich-shelf-renderer[is-shorts]),
          /* Search page specific - hide entire sections containing Shorts */
          ytd-search ytd-reel-shelf-renderer,
          ytd-search ytd-shelf-renderer:has(ytd-reel-shelf-renderer),
          ytd-search ytd-shelf-renderer:has([title*="Shorts"]),
          ytd-search ytd-shelf-renderer:has([title*="shorts"]),
          ytd-search ytd-rich-section-renderer:has(ytd-reel-shelf-renderer),
          ytd-search ytd-rich-section-renderer:has(ytd-rich-shelf-renderer[is-shorts]),
          ytd-search ytd-item-section-renderer:has(ytd-reel-shelf-renderer),
          ytd-search ytd-rich-shelf-renderer[is-shorts],
          /* Grid shelf view model containing Shorts (search results) */
          grid-shelf-view-model:has(a[href^="/shorts/"]),
          /* Individual Shorts videos in any context */
          ytd-video-renderer:has(a[href^="/shorts/"]),
          ytd-compact-video-renderer:has(a[href^="/shorts/"]),
          ytd-grid-video-renderer:has(a[href^="/shorts/"]),
          ytd-rich-item-renderer:has(a[href^="/shorts/"]),
          ytd-reel-item-renderer,
          /* Horizontal lists containing Shorts */
          ytd-horizontal-card-list-renderer:has(a[href^="/shorts/"]),
          ytd-horizontal-card-list-renderer:has(ytd-reel-item-renderer),
          /* Filter chips */
          ytd-chip-cloud-chip-renderer:has(a[href*="shorts"]),
          /* Video renderers marked as shorts */
          ytd-video-renderer[is-short],
          ytd-video-renderer[data-is-short="true"] {
            display: none !important;
          }
        `);
      }

      if (settings.disableThumbnailAutoplay) {
        rules.push(`
          ytd-thumbnail video,
          ytd-thumbnail iframe,
          ytd-thumbnail ytd-thumbnail-overlay-hover-renderer,
          ytd-thumbnail #mouseover-overlay {
            display: none !important;
          }
        `);
      }

      if (settings.hideRelatedSidebar) {
        rules.push(`
          #related,
          ytd-watch-flexy #secondary,
          ytd-watch-flexy #secondary-inner {
            display: none !important;
          }
          ytd-watch-flexy #primary {
            max-width: 75% !important;
            width: 75% !important;
            margin: 0 auto !important;
          }
          ytd-watch-flexy #columns {
            justify-content: center !important;
          }
        `);
      }

      if (settings.removeSubscriptions) {
        rules.push(`
          a[href="/feed/subscriptions"],
          ytd-guide-entry-renderer a[href="/feed/subscriptions"],
          ytd-mini-guide-entry-renderer a[href="/feed/subscriptions"],
          ytd-guide-entry-renderer:has(a[href="/feed/subscriptions"]),
          ytd-mini-guide-entry-renderer:has(a[href="/feed/subscriptions"]) {
            display: none !important;
          }
        `);
      }

      if (settings.hideEndScreenCards) {
        rules.push(`
          .ytp-suggestion-set {
            display: none !important;
          }
        `);
      }

      if (settings.hideCreatorElements) {
        rules.push(`
          .ytp-ce-element,
          .ytp-ce-element-show {
            display: none !important;
          }
        `);
      }

      if (settings.hideAISummary) {
        rules.push(`
          #video-summary {
            display: none !important;
          }
        `);
      }

      if (settings.homeFeedLimit > 0) {
        rules.push(`
          ytd-browse[page-subtype="home"] ytd-rich-grid-renderer ytd-rich-item-renderer:nth-child(n+${settings.homeFeedLimit + 3}) {
            display: none !important;
          }
        `);
      }

      if (settings.hideMixes) {
        rules.push(`
          ytd-browse[page-subtype="home"] ytd-rich-item-renderer:has(a[href*="list=RD"]),
          ytd-browse[page-subtype="home"] ytd-rich-item-renderer:has(a[href*="list=WL"]),
          ytd-browse[page-subtype="home"] ytd-rich-item-renderer:has(ytd-thumbnail-overlay-side-panel-renderer),
          ytd-browse[page-subtype="home"] ytd-compact-video-renderer:has(a[href*="list=RD"]),
          ytd-browse[page-subtype="home"] ytd-compact-video-renderer:has(a[href*="list=WL"]) {
            display: none !important;
          }
        `);
      }

      if (settings.hideRecommendedCategories) {
        rules.push(`
          ytd-browse[page-subtype="home"] ytd-feed-nudge-renderer,
          ytd-browse[page-subtype="home"] ytd-rich-shelf-renderer:has(ytd-rich-chip-cloud-renderer),
          ytd-browse[page-subtype="home"] ytd-rich-section-renderer:has(ytd-rich-shelf-renderer),
          ytd-browse[page-subtype="home"] ytd-chip-cloud-renderer,
          ytd-browse[page-subtype="home"] #chips-wrapper {
            display: none !important;
          }
        `);
      }

      if (settings.hideDescription) {
        rules.push(`
          ytd-watch-flexy #description,
          ytd-watch-flexy ytd-text-inline-expander,
          ytd-watch-flexy #structured-description,
          ytd-watch-flexy ytd-video-description-header-renderer,
          ytd-watch-flexy #bottom-row {
            display: none !important;
          }
        `);
      }

      if (settings.hideLikeDislike) {
        rules.push(`
          segmented-like-dislike-button-view-model,
          ytd-menu-renderer segmented-like-dislike-button-view-model,
          ytd-segmented-like-dislike-button-renderer {
            display: none !important;
          }
        `);
      }

      if (settings.hideSubscribeButton) {
        rules.push(`
          ytd-watch-flexy #subscribe-button,
          ytd-watch-flexy #subscribe-button-shape,
          ytd-watch-flexy yt-smartimation:has(#subscribe-button),
          ytd-watch-flexy ytd-subscription-notification-toggle-button-renderer-next,
          ytd-watch-flexy #notification-preference-button {
            display: none !important;
          }
        `);
      }

      if (settings.hideShareButton) {
        rules.push(`
          ytd-menu-renderer div#top-level-buttons-computed > yt-button-view-model:has(button[aria-label="Share"]) {
            display: none !important;
          }
        `);
      }

      if (settings.hideDownloadButton) {
        rules.push(`
          ytd-menu-renderer div#flexible-item-buttons > ytd-download-button-renderer {
            display: none !important;
          }
        `);
      }

      if (settings.hideClipButton) {
        rules.push(`
          ytd-menu-renderer div#flexible-item-buttons > yt-button-view-model:has(button[aria-label="Clip"]) {
            display: none !important;
          }
        `);
      }

      if (settings.hideSaveButton) {
        rules.push(`
          ytd-menu-renderer div#flexible-item-buttons > yt-button-view-model:has(button[aria-label="Save to playlist"]) {
            display: none !important;
          }
        `);
      }

      if (settings.hideThanksButton) {
        rules.push(`
          ytd-menu-renderer div#flexible-item-buttons > yt-button-view-model:has(button[aria-label="Thanks"]) {
            display: none !important;
          }
        `);
      }

      if (settings.hideInfoCards) {
        rules.push(`
          .iv-card,
          .iv-branding,
          .ytp-cards-teaser,
          .ytp-cards-button,
          .iv-drawer,
          .iv-card-content,
          .ytp-ce-channel,
          .ytp-ce-video,
          .ytp-ce-playlist,
          .ytp-cards-teaser-text {
            display: none !important;
          }
        `);
      }

      return rules.join('\n');
    }

    async function applySettings() {
      const settings = {
        hideHomeFeed: await hideHomeFeed.getValue(),
        hideComments: await hideComments.getValue(),
        disableShorts: await disableShorts.getValue(),
        playShortsInNativePlayer: await playShortsInNativePlayer.getValue(),
        disableThumbnailAutoplay: await disableThumbnailAutoplay.getValue(),
        hideRelatedSidebar: await hideRelatedSidebar.getValue(),
        redirectChannelToVideos: await redirectChannelToVideos.getValue(),
        removeSubscriptions: await removeSubscriptions.getValue(),
        hideEndScreenCards: await hideEndScreenCards.getValue(),
        hideCreatorElements: await hideCreatorElements.getValue(),
        hideAISummary: await hideAISummary.getValue(),
        homeFeedLimit: await homeFeedLimit.getValue(),
        hideMixes: await hideMixes.getValue(),
        hideRecommendedCategories: await hideRecommendedCategories.getValue(),
        hideLikeDislike: await hideLikeDislike.getValue(),
        hideSubscribeButton: await hideSubscribeButton.getValue(),
        hideShareButton: await hideShareButton.getValue(),
        hideDownloadButton: await hideDownloadButton.getValue(),
        hideClipButton: await hideClipButton.getValue(),
        hideSaveButton: await hideSaveButton.getValue(),
        hideThanksButton: await hideThanksButton.getValue(),
        hideInfoCards: await hideInfoCards.getValue(),
        hideDescription: await hideDescription.getValue(),
      };

      styleEl.textContent = buildCSS(settings);

      window.postMessage(
        {
          type: 'eklipse-settings',
          disableThumbnailAutoplay: settings.disableThumbnailAutoplay,
        },
        '*',
      );
    }

    function handleChannelRedirect() {
      const url = new URL(window.location.href);
      const pathMatch = url.pathname.match(/^\/(@[^\/]+|channel\/[^\/]+|c\/[^\/]+|user\/[^\/]+)\/?$/);
      if (pathMatch) {
        const channelPath = pathMatch[1];
        if (!url.pathname.endsWith('/videos')) {
          url.pathname = `/${channelPath}/videos`;
          window.location.replace(url.toString());
        }
      }
    }

    function handleDisableShortsRedirect() {
      const url = new URL(window.location.href);
      const shortsMatch = url.pathname.match(/^\/shorts\/(.+)$/);
      if (shortsMatch) {
        window.location.replace('https://www.youtube.com/');
      }
    }

    function handleShortsToNativePlayer() {
      const url = new URL(window.location.href);
      const shortsMatch = url.pathname.match(/^\/shorts\/(.+)$/);
      if (shortsMatch) {
        const videoId = shortsMatch[1];
        url.pathname = '/watch';
        url.searchParams.set('v', videoId);
        window.location.replace(url.toString());
      }
    }

    function handleSubscriptionsRedirect() {
      const url = new URL(window.location.href);
      if (url.pathname === '/feed/subscriptions') {
        url.pathname = '/';
        window.location.replace(url.toString());
      }
    }

    // JavaScript-based Shorts hiding for elements CSS might miss
    function hideShortsElements() {
      if (!disableShorts.getValue()) return;

      // Hide reel shelf renderers
      document.querySelectorAll('ytd-reel-shelf-renderer').forEach((el) => {
        (el as HTMLElement).style.display = 'none';
      });

      // Hide shelves with Shorts title
      document.querySelectorAll('ytd-shelf-renderer').forEach((el) => {
        const title = el.querySelector('[title]')?.getAttribute('title') || '';
        const ariaLabel = el.querySelector('[aria-label]')?.getAttribute('aria-label') || '';
        if (title.toLowerCase().includes('shorts') || ariaLabel.toLowerCase().includes('shorts')) {
          (el as HTMLElement).style.display = 'none';
        }
      });

      // Hide individual Shorts videos
      document.querySelectorAll('ytd-video-renderer, ytd-compact-video-renderer, ytd-grid-video-renderer').forEach((el) => {
        const link = el.querySelector('a[href^="/shorts/"]');
        if (link) {
          (el as HTMLElement).style.display = 'none';
        }
      });

      // Hide rich sections containing Shorts
      document.querySelectorAll('ytd-rich-section-renderer, ytd-item-section-renderer').forEach((el) => {
        if (el.querySelector('ytd-reel-shelf-renderer, ytd-rich-shelf-renderer[is-shorts]')) {
          (el as HTMLElement).style.display = 'none';
        }
      });

      // Hide reel item renderers
      document.querySelectorAll('ytd-reel-item-renderer').forEach((el) => {
        (el as HTMLElement).style.display = 'none';
      });

      // Hide grid-shelf-view-model elements containing Shorts
      document.querySelectorAll('grid-shelf-view-model').forEach((el) => {
        const hasShortsLink = el.querySelector('a[href^="/shorts/"]');
        const titleEl = el.querySelector('[title]');
        const ariaLabelEl = el.querySelector('[aria-label]');
        const title = titleEl?.getAttribute('title')?.toLowerCase() || '';
        const ariaLabel = ariaLabelEl?.getAttribute('aria-label')?.toLowerCase() || '';
        const hasShortsTitle = title.includes('shorts') || ariaLabel.includes('shorts');
        if (hasShortsLink || hasShortsTitle) {
          (el as HTMLElement).style.display = 'none';
          // Also hide the parent ytd-item-section-renderer if present
          const parentSection = el.closest('ytd-item-section-renderer');
          if (parentSection) {
            (parentSection as HTMLElement).style.display = 'none';
          }
        }
      });

      // Hide sidebar Shorts navigation links
      document.querySelectorAll('ytd-guide-entry-renderer, ytd-mini-guide-entry-renderer, tp-yt-paper-item').forEach((el) => {
        const link = el.querySelector('a[href="/shorts"], a[title="Shorts"], a[aria-label="Shorts"]');
        const text = el.textContent?.toLowerCase() || '';
        const title = el.getAttribute('title')?.toLowerCase() || '';
        const ariaLabel = el.getAttribute('aria-label')?.toLowerCase() || '';
        if (link || text.includes('shorts') || title.includes('shorts') || ariaLabel.includes('shorts')) {
          (el as HTMLElement).style.display = 'none';
        }
      });
    }

    // Track URL changes for SPA navigation
    let lastUrl = location.href;
    async function checkUrlChange() {
      const currentUrl = location.href;
      if (currentUrl !== lastUrl) {
        lastUrl = currentUrl;
        // Check if we navigated to /shorts
        const url = new URL(currentUrl);
        const shortsMatch = url.pathname.match(/^\/shorts\/(.+)$/);
        if (shortsMatch && await disableShorts.getValue()) {
          window.location.replace('https://www.youtube.com/');
        }
      }
    }

    // Set up mutation observer to catch dynamically loaded Shorts
    let shortsObserver: MutationObserver | null = null;
    let shortsHideTimeout: number | null = null;
    function setupShortsObserver() {
      if (shortsObserver) return;

      shortsObserver = new MutationObserver((mutations) => {
        // Only process if mutations contain potentially relevant elements
        const hasRelevantChanges = mutations.some(m =>
          Array.from(m.addedNodes).some(node =>
            node instanceof HTMLElement &&
            (node.tagName?.includes('YTD-') ||
             node.tagName?.includes('GRID-') ||
             node.querySelector?.('ytd-reel-shelf-renderer, ytd-video-renderer, grid-shelf-view-model'))
          )
        );
        if (!hasRelevantChanges) return;

        // Debounce the hiding to avoid interfering with YouTube's rendering
        if (shortsHideTimeout) clearTimeout(shortsHideTimeout);
        shortsHideTimeout = window.setTimeout(() => {
          hideShortsElements();
        }, 100);
      });

      shortsObserver.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }

    hideHomeFeed.watch(() => applySettings());
    hideComments.watch(() => applySettings());
    disableShorts.watch(() => applySettings());
    playShortsInNativePlayer.watch(() => applySettings());
    disableThumbnailAutoplay.watch(() => applySettings());
    hideRelatedSidebar.watch(() => applySettings());
    redirectChannelToVideos.watch(() => applySettings());
    removeSubscriptions.watch(() => applySettings());
    hideEndScreenCards.watch(() => applySettings());
    hideCreatorElements.watch(() => applySettings());
    hideAISummary.watch(() => applySettings());
    homeFeedLimit.watch(() => applySettings());
    hideMixes.watch(() => applySettings());
    hideRecommendedCategories.watch(() => applySettings());
    hideLikeDislike.watch(() => applySettings());
    hideSubscribeButton.watch(() => applySettings());
    hideShareButton.watch(() => applySettings());
    hideDownloadButton.watch(() => applySettings());
    hideClipButton.watch(() => applySettings());
    hideSaveButton.watch(() => applySettings());
    hideThanksButton.watch(() => applySettings());
    hideInfoCards.watch(() => applySettings());
    hideDescription.watch(() => applySettings());

    await applySettings();

    if (await disableShorts.getValue()) {
      handleDisableShortsRedirect();
      hideShortsElements();
      setupShortsObserver();
      // Start checking for URL changes (SPA navigation)
      setInterval(checkUrlChange, 500);
    } else if (await playShortsInNativePlayer.getValue()) {
      handleShortsToNativePlayer();
    }
    disableShorts.watch((value: boolean) => {
      if (value) {
        handleDisableShortsRedirect();
        hideShortsElements();
        setupShortsObserver();
        // Start checking for URL changes (SPA navigation)
        setInterval(checkUrlChange, 500);
      }
    });
    playShortsInNativePlayer.watch(async (value: boolean) => {
      if (value && !(await disableShorts.getValue())) handleShortsToNativePlayer();
    });

    if (await redirectChannelToVideos.getValue()) {
      handleChannelRedirect();
    }
    redirectChannelToVideos.watch((value) => {
      if (value) handleChannelRedirect();
    });

    if (await removeSubscriptions.getValue()) {
      handleSubscriptionsRedirect();
    }
    removeSubscriptions.watch((value) => {
      if (value) handleSubscriptionsRedirect();
    });
  },
});
