import {
  hideHomeFeed,
  hideComments,
  hideShorts,
  disableThumbnailAutoplay,
  hideRelatedSidebar,
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
      hideShorts: boolean;
      disableThumbnailAutoplay: boolean;
      hideRelatedSidebar: boolean;
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

      if (settings.hideShorts) {
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
            max-width: 65% !important;
            width: 65% !important;
            margin: 0 auto !important;
          }
          ytd-watch-flexy #columns {
            justify-content: center !important;
          }
        `);
      }

      return rules.join('\n');
    }

    async function applySettings() {
      const settings = {
        hideHomeFeed: await hideHomeFeed.getValue(),
        hideComments: await hideComments.getValue(),
        hideShorts: await hideShorts.getValue(),
        disableThumbnailAutoplay: await disableThumbnailAutoplay.getValue(),
        hideRelatedSidebar: await hideRelatedSidebar.getValue(),
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

    hideHomeFeed.watch(() => applySettings());
    hideComments.watch(() => applySettings());
    hideShorts.watch(() => applySettings());
    disableThumbnailAutoplay.watch(() => applySettings());
    hideRelatedSidebar.watch(() => applySettings());

    await applySettings();
  },
});
