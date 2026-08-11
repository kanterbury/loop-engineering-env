import { defineConfig, devices } from '@playwright/test'

const PORT = 4173
const BASE_URL = `http://localhost:${PORT}`

export default defineConfig({
  testDir: './e2e',
  outputDir: './.loop/artifacts',
  // 自走ループでは「落ちたのに緑」が最悪。並列度を絞って不安定さを減らす。
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [['list']],
  use: {
    baseURL: BASE_URL,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  // AI にサーバープロセスを手動管理させると必ず事故る（ゾンビプロセス / ポート衝突）。
  // Playwright に起動と停止を任せ、`playwright test` の一撃で完結させる。
  // dist/ が必要なので、単体実行時は `npm run e2e`（build 込み）を使うこと。
  webServer: {
    command: `npm run preview -- --port ${PORT} --strictPort`,
    url: BASE_URL,
    reuseExistingServer: true,
    timeout: 120_000,
  },
})
