export const hideHomeFeed = storage.defineItem<boolean>('sync:hideHomeFeed', {
  fallback: false,
});

export const hideComments = storage.defineItem<boolean>('sync:hideComments', {
  fallback: false,
});

export const disableShorts = storage.defineItem<boolean>('sync:disableShorts', {
  fallback: false,
});

export const hideRecommendedShorts = storage.defineItem<boolean>('sync:hideRecommendedShorts', {
  fallback: false,
});

export const playShortsInNativePlayer = storage.defineItem<boolean>('sync:playShortsInNativePlayer', {
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

export const hideEndScreenCards = storage.defineItem<boolean>('sync:hideEndScreenCards', {
  fallback: false,
});

export const hideCreatorElements = storage.defineItem<boolean>('sync:hideCreatorElements', {
  fallback: false,
});

export const hideAISummary = storage.defineItem<boolean>('sync:hideAISummary', {
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
    key: 'shorts',
    label: 'Shorts',
    features: [
      { key: 'disableShorts', label: 'Disable Shorts', storageItem: disableShorts },
      { key: 'hideRecommendedShorts', label: 'Hide Recommended Shorts', storageItem: hideRecommendedShorts },
      { key: 'playShortsInNativePlayer', label: 'Play Shorts in Native Player', storageItem: playShortsInNativePlayer },
    ],
  },
  {
    key: 'global',
    label: 'Global',
    features: [
      { key: 'redirectChannelToVideos', label: 'Redirect Channel Home to Videos', storageItem: redirectChannelToVideos },
      { key: 'removeSubscriptions', label: 'Remove Subscriptions', storageItem: removeSubscriptions },
    ],
  },
  {
    key: 'ai',
    label: 'AI',
    features: [
      { key: 'hideAISummary', label: 'Hide AI Summary', storageItem: hideAISummary },
    ],
  },
  {
    key: 'video',
    label: 'Video Page',
    features: [
      { key: 'hideComments', label: 'Hide Comments', storageItem: hideComments },
      { key: 'hideRelatedSidebar', label: 'Hide Related Sidebar', storageItem: hideRelatedSidebar },
      { key: 'hideEndScreenCards', label: 'Hide End Screen Cards', storageItem: hideEndScreenCards },
      { key: 'hideCreatorElements', label: 'Hide Creator Endscreen Elements', storageItem: hideCreatorElements },
    ],
  },
];

// Keep flat features array for backward compatibility
export const features: FeatureToggle[] = featureGroups.flatMap((g) => g.features);
