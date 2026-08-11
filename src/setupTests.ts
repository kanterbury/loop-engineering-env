import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// テスト間で DOM を確実に破棄する。これが無いと前のテストの描画が残り、
// 「単体では通るのに全体では落ちる」不安定なテストの原因になる。
afterEach(() => {
  cleanup()
})
