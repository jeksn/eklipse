export default defineContentScript({
  matches: ['*://*.youtube.com/*'],
  world: 'MAIN',
  runAt: 'document_start',

  main() {
    let autoplayEnabled = false;

    window.addEventListener('message', (event: MessageEvent) => {
      if (event.source !== window) return;
      if (event.data?.type === 'eklipse-settings') {
        autoplayEnabled = !!event.data.disableThumbnailAutoplay;
      }
    });

    const originalPlay = HTMLVideoElement.prototype.play;
    HTMLVideoElement.prototype.play = function () {
      if (autoplayEnabled && this.closest('ytd-thumbnail')) {
        return Promise.resolve() as Promise<void>;
      }
      return originalPlay.call(this) as Promise<void>;
    };

    document.addEventListener(
      'yt-action',
      function (event: Event) {
        if (!autoplayEnabled) return;
        if ((event as any).detail?.actionName === 'yt-open-video-preview-action') {
          event.stopImmediatePropagation();
          event.preventDefault();
        }
      },
      true,
    );

    document.addEventListener(
      'mouseover',
      function (event: Event) {
        if (!autoplayEnabled) return;
        const target = (event.target as Element)?.closest('ytd-thumbnail');
        if (target) {
          event.stopPropagation();
        }
      },
      true,
    );
  },
});
