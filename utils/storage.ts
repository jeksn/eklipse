export const hideHomeFeed = storage.defineItem<boolean>('sync:hideHomeFeed', {
  fallback: false,
});

export const hideComments = storage.defineItem<boolean>('sync:hideComments', {
  fallback: false,
});

export const hideShorts = storage.defineItem<boolean>('sync:hideShorts', {
  fallback: false,
});

export const disableThumbnailAutoplay = storage.defineItem<boolean>('sync:disableThumbnailAutoplay', {
  fallback: false,
});

export const hideRelatedSidebar = storage.defineItem<boolean>('sync:hideRelatedSidebar', {
  fallback: false,
});

export interface FeatureToggle {
  key: string;
  label: string;
  storageItem: typeof hideHomeFeed;
}

export const features: FeatureToggle[] = [
  { key: 'hideHomeFeed', label: 'Hide Home Feed', storageItem: hideHomeFeed },
  { key: 'hideComments', label: 'Hide Comments', storageItem: hideComments },
  { key: 'hideShorts', label: 'Hide Shorts', storageItem: hideShorts },
  { key: 'disableThumbnailAutoplay', label: 'Disable Thumbnail Autoplay', storageItem: disableThumbnailAutoplay },
  { key: 'hideRelatedSidebar', label: 'Hide Related Sidebar', storageItem: hideRelatedSidebar },
];
