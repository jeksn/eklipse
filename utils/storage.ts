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

export const redirectChannelToVideos = storage.defineItem<boolean>('sync:redirectChannelToVideos', {
  fallback: false,
});

export const removeSubscriptions = storage.defineItem<boolean>('sync:removeSubscriptions', {
  fallback: false,
});

export interface FeatureToggle {
  key: string;
  label: string;
  storageItem: typeof hideHomeFeed;
}

export interface FeatureGroup {
  key: string;
  label: string;
  features: FeatureToggle[];
}

export const featureGroups: FeatureGroup[] = [
  {
    key: 'home',
    label: 'Home',
    features: [
      { key: 'hideHomeFeed', label: 'Hide Home Feed', storageItem: hideHomeFeed },
      { key: 'disableThumbnailAutoplay', label: 'Disable Thumbnail Autoplay', storageItem: disableThumbnailAutoplay },
    ],
  },
  {
    key: 'global',
    label: 'Global',
    features: [
      { key: 'hideShorts', label: 'Hide Shorts', storageItem: hideShorts },
      { key: 'redirectChannelToVideos', label: 'Redirect Channel Home to Videos', storageItem: redirectChannelToVideos },
      { key: 'removeSubscriptions', label: 'Remove Subscriptions', storageItem: removeSubscriptions },
    ],
  },
  {
    key: 'video',
    label: 'Video Page',
    features: [
      { key: 'hideComments', label: 'Hide Comments', storageItem: hideComments },
      { key: 'hideRelatedSidebar', label: 'Hide Related Sidebar', storageItem: hideRelatedSidebar },
    ],
  },
];

// Keep flat features array for backward compatibility
export const features: FeatureToggle[] = featureGroups.flatMap((g) => g.features);
