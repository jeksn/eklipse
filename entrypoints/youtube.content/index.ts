import {
  hideHomeFeed,
  hideComments,
  disableShorts,
  hideRecommendedShorts,
  playShortsInNativePlayer,
  disableThumbnailAutoplay,
  hideRelatedSidebar,
  redirectChannelToVideos,
  removeSubscriptions,
  hideEndScreenCards,
  hideCreatorElements,
  hideAISummary,
  homeFeedLimit,
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
      hideRecommendedShorts: boolean;
      playShortsInNativePlayer: boolean;
      disableThumbnailAutoplay: boolean;
      hideRelatedSidebar: boolean;
      redirectChannelToVideos: boolean;
      removeSubscriptions: boolean;
      hideEndScreenCards: boolean;
      hideCreatorElements: boolean;
      hideAISummary: boolean;
      homeFeedLimit: number;
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

      if (settings.disableShorts || settings.hideRecommendedShorts) {
        rules.push(`
          ytd-rich-section-renderer,
          ytd-reel-shelf-renderer,
          ytd-rich-shelf-renderer[is-shorts],
          [is-shorts],
          ytd-mini-guide-entry-renderer[aria-label="Shorts"],
          ytd-guide-entry-renderer a[title="Shorts"],
          a[title="Shorts"],
          ytd-tab-shape-renderer[tab-title="Shorts"] {
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

      return rules.join('\n');
    }

    async function applySettings() {
      const settings = {
        hideHomeFeed: await hideHomeFeed.getValue(),
        hideComments: await hideComments.getValue(),
        disableShorts: await disableShorts.getValue(),
        hideRecommendedShorts: await hideRecommendedShorts.getValue(),
        playShortsInNativePlayer: await playShortsInNativePlayer.getValue(),
        disableThumbnailAutoplay: await disableThumbnailAutoplay.getValue(),
        hideRelatedSidebar: await hideRelatedSidebar.getValue(),
        redirectChannelToVideos: await redirectChannelToVideos.getValue(),
        removeSubscriptions: await removeSubscriptions.getValue(),
        hideEndScreenCards: await hideEndScreenCards.getValue(),
        hideCreatorElements: await hideCreatorElements.getValue(),
        hideAISummary: await hideAISummary.getValue(),
        homeFeedLimit: await homeFeedLimit.getValue(),
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

    hideHomeFeed.watch(() => applySettings());
    hideComments.watch(() => applySettings());
    disableShorts.watch(() => applySettings());
    hideRecommendedShorts.watch(() => applySettings());
    playShortsInNativePlayer.watch(() => applySettings());
    disableThumbnailAutoplay.watch(() => applySettings());
    hideRelatedSidebar.watch(() => applySettings());
    redirectChannelToVideos.watch(() => applySettings());
    removeSubscriptions.watch(() => applySettings());
    hideEndScreenCards.watch(() => applySettings());
    hideCreatorElements.watch(() => applySettings());
    hideAISummary.watch(() => applySettings());
    homeFeedLimit.watch(() => applySettings());

    await applySettings();

    if (await disableShorts.getValue()) {
      handleDisableShortsRedirect();
    } else if (await playShortsInNativePlayer.getValue()) {
      handleShortsToNativePlayer();
    }
    disableShorts.watch((value: boolean) => {
      if (value) handleDisableShortsRedirect();
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
