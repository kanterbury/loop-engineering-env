// Vitest の設定を同居させるため、defineConfig は 'vitest/config' から取る
// ('vite' 由来のものは test フィールドを知らず型エラーになる)
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts',
    // e2e/ は Playwright の担当。Vitest が拾うと必ず壊れるので除外は必須。
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/e2e/**'],
  },
})
