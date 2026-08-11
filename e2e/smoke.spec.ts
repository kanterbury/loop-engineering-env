import { test, expect } from '@playwright/test'

test('トップページが描画される', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()

  // 固定パスに保存するのが要点。
  // AI は Read ツールでこの PNG を「画像として」開き、テストが緑でも
  // レイアウトが崩れていないかを自分の目で確認できる。
  // パスが実行ごとに変わると、この自己確認ができなくなる。
  await page.screenshot({
    path: '.loop/screenshots/home.png',
    fullPage: true,
  })
})
