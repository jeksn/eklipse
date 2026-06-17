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
  hideMembershipButton,
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
      hideMembershipButton: boolean;
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
        // CSS hiding for immediate effect (will be removed by JS)
        rules.push(`
          ytd-browse[page-subtype="home"] ytd-rich-grid-renderer ytd-rich-item-renderer:nth-child(n+${settings.homeFeedLimit + 1}) {
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
        // Targets the segmented like/dislike button in #top-row
        rules.push(`
          #top-row segmented-like-dislike-button-view-model,
          #top-row ytd-segmented-like-dislike-button-renderer {
            display: none !important;
          }
        `);
      }

      if (settings.hideSubscribeButton) {
        // #subscribe-button and the notification bell sit outside #top-row
        rules.push(`
          #subscribe-button,
          yt-subscribe-button-view-model,
          ytd-subscription-notification-toggle-button-renderer-next,
          #notification-preference-button {
            display: none !important;
          }
        `);
      }

      if (settings.hideShareButton) {
        // YouTube has two layouts for the share button:
        //   Old: ytd-button-renderer wrapping yt-button-shape > button[aria-label=Share/Dela]
        //   New: yt-button-view-model wrapping button-view-model > button[aria-label=Share/Dela]
        // Both are inside #top-level-buttons-computed in the watch page action row.
        // We also keep the legacy #share-button ID as a fallback.
        // "Dela" is Swedish for "Share".
        rules.push(`
          ytd-watch-metadata #share-button,
          #top-level-buttons-computed ytd-button-renderer:has(yt-button-shape > button[aria-label="Share"]),
          #top-level-buttons-computed ytd-button-renderer:has(yt-button-shape > button[aria-label="Dela"]),
          #top-level-buttons-computed yt-button-view-model:has(button-view-model > button[aria-label="Share"]),
          #top-level-buttons-computed yt-button-view-model:has(button-view-model > button[aria-label="Dela"]) {
            display: none !important;
          }
        `);
      }

      if (settings.hideDownloadButton) {
        // Download has its own dedicated element type — language-independent.
        rules.push(`
          #top-row ytd-download-button-renderer {
            display: none !important;
          }
        `);
      }

      if (settings.hideClipButton) {
        // Clip, Save, and Thanks are all yt-button-view-model inside #flexible-item-buttons.
        // Clip appears to be the 3rd child; use aria-label with a wildcard to catch localisations.
        // "Clip" in Swedish is "Klipp"; Thanks is "Tack"; Save is "Spara i spellista"
        rules.push(`
          #flexible-item-buttons yt-button-view-model:has(button[aria-label*="Clip"]),
          #flexible-item-buttons yt-button-view-model:has(button[aria-label*="Klipp"]) {
            display: none !important;
          }
        `);
      }

      if (settings.hideSaveButton) {
        // Save to playlist — Swedish: "Spara i spellista"
        rules.push(`
          #flexible-item-buttons yt-button-view-model:has(button[aria-label*="playlist"]),
          #flexible-item-buttons yt-button-view-model:has(button[aria-label*="spellista"]) {
            display: none !important;
          }
        `);
      }

      if (settings.hideThanksButton) {
        // Thanks — Swedish: "Tack"
        rules.push(`
          #flexible-item-buttons yt-button-view-model:has(button[aria-label*="Thanks"]),
          #flexible-item-buttons yt-button-view-model:has(button[aria-label*="Tack"]) {
            display: none !important;
          }
        `);
      }

      if (settings.hideMembershipButton) {
        // #sponsor-button covers the video page; the aria-label selector covers
        // cases where the element is rendered without the id (e.g. some channel layouts)
        rules.push(`
          #sponsor-button,
          ytd-sponsor-button-renderer,
          button[aria-label="Join this channel"],
          yt-button-view-model:has(button[aria-label="Join this channel"]),
          #top-row yt-button-view-model:has(button[aria-label*="Join"]) {
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
        hideMembershipButton: await hideMembershipButton.getValue(),
        hideInfoCards: await hideInfoCards.getValue(),
        hideDescription: await hideDescription.getValue(),
      };

      styleEl.textContent = buildCSS(settings);

      // Apply home feed limit via DOM removal
      if (settings.homeFeedLimit > 0) {
        applyHomeFeedLimit(settings.homeFeedLimit);
      }

      window.postMessage(
        {
          type: 'eklipse-settings',
          disableThumbnailAutoplay: settings.disableThumbnailAutoplay,
        },
        '*',
      );
    }

    // DOM-based home feed limit - removes elements instead of just hiding
    let homeFeedLimitObserver: MutationObserver | null = null;
    let currentHomeFeedLimit = 0;

    function applyHomeFeedLimit(limit: number) {
      currentHomeFeedLimit = limit;

      // Remove excess items immediately
      removeExcessHomeFeedItems(limit);

      // Set up observer to catch dynamically loaded items
      setupHomeFeedLimitObserver(limit);
    }

    function removeExcessHomeFeedItems(limit: number) {
      const grid = document.querySelector('ytd-browse[page-subtype="home"] ytd-rich-grid-renderer');
      if (!grid) return;

      const items = grid.querySelectorAll(':scope > ytd-rich-item-renderer');
      if (items.length > limit) {
        for (let i = limit; i < items.length; i++) {
          items[i].remove();
        }
      }
    }

    function setupHomeFeedLimitObserver(limit: number) {
      if (homeFeedLimitObserver) return;

      const grid = document.querySelector('ytd-browse[page-subtype="home"] ytd-rich-grid-renderer');
      if (!grid) return;

      homeFeedLimitObserver = new MutationObserver((mutations) => {
        // Check if new items were added
        const hasNewItems = mutations.some(m =>
          Array.from(m.addedNodes).some(node =>
            node instanceof HTMLElement && node.tagName === 'YTD-RICH-ITEM-RENDERER'
          )
        );

        if (hasNewItems) {
          removeExcessHomeFeedItems(limit);
        }
      });

      homeFeedLimitObserver.observe(grid, {
        childList: true,
      });
    }

    function stopHomeFeedLimitObserver() {
      if (homeFeedLimitObserver) {
        homeFeedLimitObserver.disconnect();
        homeFeedLimitObserver = null;
      }
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

    // Track URL changes for SPA navigation — redirect away from /shorts if disableShorts is on
    let lastUrl = location.href;
    let shortsIntervalId: ReturnType<typeof setInterval> | null = null;

    function startShortsInterval() {
      if (shortsIntervalId !== null) return; // already running
      shortsIntervalId = setInterval(checkUrlChange, 500);
    }

    function stopShortsInterval() {
      if (shortsIntervalId !== null) {
        clearInterval(shortsIntervalId);
        shortsIntervalId = null;
      }
    }

    async function checkUrlChange() {
      const currentUrl = location.href;
      if (currentUrl !== lastUrl) {
        lastUrl = currentUrl;
        const url = new URL(currentUrl);
        const shortsMatch = url.pathname.match(/^\/shorts\/(.+)$/);
        if (shortsMatch && await disableShorts.getValue()) {
          window.location.replace('https://www.youtube.com/');
        }
      }
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
    hideMembershipButton.watch(() => applySettings());
    hideInfoCards.watch(() => applySettings());
    hideDescription.watch(() => applySettings());
    homeFeedLimit.watch((value: number) => {
      applySettings();
      if (value > 0) {
        applyHomeFeedLimit(value);
      } else {
        stopHomeFeedLimitObserver();
      }
    });

    await applySettings();

    if (await disableShorts.getValue()) {
      handleDisableShortsRedirect();
      startShortsInterval();
    } else if (await playShortsInNativePlayer.getValue()) {
      handleShortsToNativePlayer();
    }
    disableShorts.watch((value: boolean) => {
      if (value) {
        handleDisableShortsRedirect();
        startShortsInterval();
      } else {
        stopShortsInterval();
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
