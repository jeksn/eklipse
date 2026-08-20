export const hideHomeFeed = storage.defineItem<boolean>('sync:hideHomeFeed', {
  fallback: false,
});

export const hideComments = storage.defineItem<boolean>('sync:hideComments', {
  fallback: false,
});

export const disableShorts = storage.defineItem<boolean>('sync:disableShorts', {
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

export const hideLikeDislike = storage.defineItem<boolean>('sync:hideLikeDislike', {
  fallback: false,
});

export const hideSubscribeButton = storage.defineItem<boolean>('sync:hideSubscribeButton', {
  fallback: false,
});

export const hideShareButton = storage.defineItem<boolean>('sync:hideShareButton', {
  fallback: false,
});

export const hideDownloadButton = storage.defineItem<boolean>('sync:hideDownloadButton', {
  fallback: false,
});

export const hideClipButton = storage.defineItem<boolean>('sync:hideClipButton', {
  fallback: false,
});

export const hideSaveButton = storage.defineItem<boolean>('sync:hideSaveButton', {
  fallback: false,
});

export const hideThanksButton = storage.defineItem<boolean>('sync:hideThanksButton', {
  fallback: false,
});

export const hideMembershipButton = storage.defineItem<boolean>('sync:hideMembershipButton', {
  fallback: false,
});

export const hideInfoCards = storage.defineItem<boolean>('sync:hideInfoCards', {
  fallback: false,
});

export const hideDescription = storage.defineItem<boolean>('sync:hideDescription', {
  fallback: false,
});

export const hideAISummary = storage.defineItem<boolean>('sync:hideAISummary', {
  fallback: false,
});

export const homeFeedLimit = storage.defineItem<number>('sync:homeFeedLimit', {
  fallback: 0,
});

export const hideMixes = storage.defineItem<boolean>('sync:hideMixes', {
  fallback: false,
});

export const hideRecommendedCategories = storage.defineItem<boolean>('sync:hideRecommendedCategories', {
  fallback: false,
});

export const hideMembersOnly = storage.defineItem<boolean>('sync:hideMembersOnly', {
  fallback: false,
});

export interface FeatureToggle {
  key: string;
  label: string;
  storageItem: typeof hideHomeFeed;
}

export interface NumericFeatureToggle {
  key: string;
  label: string;
  storageItem: typeof homeFeedLimit;
  options: number[];
}

export interface FeatureSubgroup {
  label: string;
  features: FeatureToggle[];
}

export interface FeatureGroup {
  key: string;
  label: string;
  features: FeatureToggle[];
  numericFeatures?: NumericFeatureToggle[];
  subgroups?: FeatureSubgroup[];
}

export const featureGroups: FeatureGroup[] = [
  {
    key: 'home',
    label: 'Home',
    features: [
      { key: 'hideHomeFeed', label: 'Hide Home Feed', storageItem: hideHomeFeed },
      { key: 'disableThumbnailAutoplay', label: 'Disable Thumbnail Autoplay', storageItem: disableThumbnailAutoplay },
      { key: 'hideMixes', label: 'Hide Mixes', storageItem: hideMixes },
      { key: 'hideRecommendedCategories', label: 'Hide Recommended Categories', storageItem: hideRecommendedCategories },
      { key: 'hideMembersOnly', label: 'Hide Members-Only Videos', storageItem: hideMembersOnly },
    ],
    numericFeatures: [
      { key: 'homeFeedLimit', label: 'Home Feed Limit', storageItem: homeFeedLimit, options: [0, 8, 12, 16, 24] },
    ],
  },
  {
    key: 'shorts',
    label: 'Shorts',
    features: [
      { key: 'disableShorts', label: 'Disable Shorts', storageItem: disableShorts },
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
    features: [],
    subgroups: [
      {
        label: 'Buttons',
        features: [
          { key: 'hideLikeDislike', label: 'Like / Dislike', storageItem: hideLikeDislike },
          { key: 'hideSubscribeButton', label: 'Subscribe', storageItem: hideSubscribeButton },
          { key: 'hideShareButton', label: 'Share', storageItem: hideShareButton },
          { key: 'hideDownloadButton', label: 'Download', storageItem: hideDownloadButton },
          { key: 'hideClipButton', label: 'Clip', storageItem: hideClipButton },
          { key: 'hideSaveButton', label: 'Save', storageItem: hideSaveButton },
          { key: 'hideThanksButton', label: 'Thanks', storageItem: hideThanksButton },
          { key: 'hideMembershipButton', label: 'Join / Membership', storageItem: hideMembershipButton },
        ],
      },
      {
        label: 'Content',
        features: [
          { key: 'hideDescription', label: 'Description', storageItem: hideDescription },
          { key: 'hideComments', label: 'Comments', storageItem: hideComments },
          { key: 'hideRelatedSidebar', label: 'Related Sidebar', storageItem: hideRelatedSidebar },
        ],
      },
      {
        label: 'Player',
        features: [
          { key: 'hideInfoCards', label: 'Info Cards', storageItem: hideInfoCards },
          { key: 'hideEndScreenCards', label: 'End Screen Cards', storageItem: hideEndScreenCards },
          { key: 'hideCreatorElements', label: 'Creator Endscreen', storageItem: hideCreatorElements },
        ],
      },
    ],
  },
];

// Keep flat features array for backward compatibility
export const features: FeatureToggle[] = featureGroups.flatMap((g) => g.features);
