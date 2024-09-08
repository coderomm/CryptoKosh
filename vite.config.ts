import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import inject from '@rollup/plugin-inject';

export default defineConfig({
  plugins: [react(), inject({
    Buffer: ['buffer', 'Buffer'],  // Polyfill Buffer
  })],
  resolve: {
    alias: {
      crypto: 'crypto-browserify',   // Polyfill crypto
      stream: 'stream-browserify',   // Polyfill stream if needed
    },
  },
});
