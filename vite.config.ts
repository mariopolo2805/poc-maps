import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRootDir = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@models': resolve(projectRootDir, 'src/models'),
      '@db': resolve(projectRootDir, 'src/db'),
      '@providers': resolve(projectRootDir, 'src/core/providers'),
      '@features': resolve(projectRootDir, 'src/features'),
    },
  },
  server: {
    port: 5173,
  },
});
