import { defineConfig } from 'wxt';

export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: {
    name: 'Eklipse - YouTube Distraction Remover',
    short_name: 'Eklipse',
    description: 'Hide YouTube home feed, comments, shorts, and disable thumbnail autoplay',
    version: '0.1.0',
    permissions: ['storage'],
    host_permissions: ['*://*.youtube.com/*'],
    action: {
      default_title: 'Eklipse',
    },
    icons: {
      16: 'eklipse-icon/144.png',
      32: 'eklipse-icon/144.png',
      48: 'eklipse-icon/144.png',
      128: 'eklipse-icon/144.png',
    },
  },
});
