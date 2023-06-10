import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/

// eslint-disable-next-line import/no-unused-modules
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
  },
  build: {
    target: 'es2015',
    assetsInlineLimit: 0,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        dead_code: true,
      },
      toplevel: false,
      keep_classnames: false,
      keep_fnames: false,
      safari10: false,
    },
  },
  base: '/todo-app/',
});
