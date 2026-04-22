import { defineConfig } from 'wxt';

export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  vite: () => ({
    css: {
      transformer: 'postcss',
    },
    build: {
      cssMinify: false,
    },
  }),
  manifest: {
    name: 'Eklipse - YouTube Enhancements',
    short_name: 'Eklipse',
    description: 'A YouTube extension that removes distractions and enhances your YouTube experience.',
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
