# loop-engineering-env

AI が自走してアプリを実装するための、ループエンジニアリング環境。

**設計の中心原則: AI は自分で検証できる範囲でしか自走できない。**

## 使い方

```
1. docs/SPEC.md に作りたいアプリを書く（受け入れ条件を検証可能な形で）
2. /loop-plan            → .loop/backlog.md にタスクキューが生成される
3. /loop /loop-iterate   → 自走開始（自己ペース）
                           /loop 10m /loop-iterate なら10分間隔
4. /loop-status          → いつでも進捗確認
5. 停止は /loop の停止操作、または AI が停止条件に達して自ら止まる
```

## 検証コマンド

| コマンド               | 内容                               | 用途                    |
| ---------------------- | ---------------------------------- | ----------------------- |
| `npm run verify:quick` | typecheck → lint → unit test       | 実装の途中で何度でも    |
| `npm run verify`       | quick + format:check → build → e2e | **周回の締めに必ず1回** |
| `npm run format`       | Prettier で自動整形                | format:check が落ちたら |
| `npm run dev`          | 開発サーバー                       | 人間が手で見るとき      |
| `npm run e2e`          | build + Playwright                 | E2E だけ単体で回すとき  |

`npm run verify` が **唯一の合否オラクル**。AI はこれが緑かどうかだけで完了を判定する。

## 自走が壊れる4つの原因と、その対策

| 破綻の原因                     | この環境での対策                                                         |
| ------------------------------ | ------------------------------------------------------------------------ |
| 成果の正否がわからない         | `npm run verify` の単一オラクル + 固定パスのスクショを AI が Read で目視 |
| コンテキスト圧縮で進捗を見失う | `.loop/` に状態を外部化、1周回 = 1コミット                               |
| 権限確認で毎回止まる           | `.claude/settings.json` の allowlist（破壊的操作のみ deny）              |
| テストを緩めて「通った」ことに | `CLAUDE.md` で明示的に禁止 + 3回連続失敗で停止                           |

## ファイルの役割

| パス               | 役割                                    | 更新者          |
| ------------------ | --------------------------------------- | --------------- |
| `docs/SPEC.md`     | **何を作るか**。唯一の情報源            | 人間            |
| `.loop/backlog.md` | **どの順で作るか**。タスクキュー        | `/loop-plan`    |
| `.loop/state.md`   | **今どこか**。3項目のみ。毎周回で上書き | `/loop-iterate` |
| `.loop/journal.md` | **何をやったか**。追記専用、失敗も残す  | `/loop-iterate` |
| `CLAUDE.md`        | ループのプロトコルと禁止事項            | 人間            |

`.loop/screenshots/` と `.loop/artifacts/` は gitignore。**state / backlog / journal はコミットする**（進捗が git 履歴に残り、レビューできる）。

## AI が UI を「見る」仕組み

`e2e/smoke.spec.ts` は `.loop/screenshots/home.png` という **固定パス** にスクリーンショットを保存する。AI は Read ツールでこの PNG を画像として開き、レイアウト崩れを自分の目で確認する。

これが必要な理由: `toBeVisible()` は、要素が画面外に飛んでいても、背景と同化していても、カラムが潰れていても通る。テストが緑でも UI は壊れうる。

新しい画面を追加したら、`.loop/screenshots/<画面名>.png` に撮るテストも追加すること。

## セットアップ（クローン後）

```powershell
npm install
npx playwright install chromium
npm run verify   # 全て緑になることを確認
```

## スタック

Vite 8 / React 19 / TypeScript 6 / Vitest 4 + Testing Library / Playwright / ESLint 10 + Prettier 3
