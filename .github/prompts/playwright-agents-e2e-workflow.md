# Playwright Agents E2Eテストワークフロー

このドキュメントは、Devinを使用してPlaywright AgentsでE2Eテストを作成する際の標準フローを定義します。

## 概要

Playwright Agentsは3つのAIエージェント（Planner、Generator、Healer）を使用して、E2Eテストのライフサイクルを自動化します。

## 前提条件

- Node.js環境がセットアップされていること
- Playwright MCPサーバーが利用可能であること
- テスト対象のURLと仕様書が準備されていること

## ワークフロー

### Step 1: Playwright Agents Plannerでテスト設計

**目的**: テスト対象のWebアプリケーションを探索し、包括的なテスト計画を作成する

**手順**:
1. 仕様書を `target_docs/` ディレクトリに配置する
2. MCPサーバーの `planner_setup_page` ツールでブラウザを初期化する
3. `browser_navigate` でテスト対象URLにアクセスする
4. `browser_snapshot` でページ構造を取得し、要素を分析する
5. 以下の観点でテストシナリオを設計する:
   - ハッピーパス（正常系）
   - エッジケース（境界値）
   - エラーハンドリング（異常系）
6. `planner_save_plan` でテスト計画を `specs/` ディレクトリに保存する

**出力**: `specs/{project-name}.plan.md`

**テスト計画のフォーマット**:
```markdown
# {プロジェクト名} E2Eテスト計画

seed: tests/seed.spec.ts

## 1. {テストスイート名}

### 1.1 {テストケース名}

**Steps:**
1. {ステップ1}
2. {ステップ2}
...

**Expected:**
- {期待結果1}
- {期待結果2}
```

### Step 2: Playwright Agents Generatorでテスト実装

**目的**: テスト計画に基づいて実行可能なPlaywrightテストコードを生成する

**手順**:
1. MCPサーバーの `generator_setup_page` ツールでブラウザを初期化する
2. テスト計画の各ステップを手動で実行し、アクションログを生成する
3. `generator_read_log` でアクションログとベストプラクティスを取得する
4. `generator_write_test` でテストコードを `tests/` ディレクトリに出力する

**出力**: `tests/{feature-name}.spec.ts`

**テストファイルの規約**:
```typescript
// spec: specs/{project-name}.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('{テストスイート名}', () => {
  test('{テストケース名}', async ({ page }) => {
    // 1. {ステップ説明}
    await page.goto('https://example.com');
    
    // 2. {検証説明}
    await expect(page.locator('selector')).toBeVisible();
  });
});
```

### Step 3: ヘッドレスモードではなく実際のブラウザでテスト実行

**目的**: 実際のブラウザでテストを実行し、全件パスするまで繰り返す

**手順**:
1. ヘッド付きモードでテストを実行する:
   ```bash
   npx playwright test tests/{feature-name}/ --headed --project=chromium
   ```
2. テスト結果を確認する
3. 失敗したテストがある場合は Step 4 へ進む
4. 全件パスするまで繰り返す

**重要**: `--headed` フラグを使用し、ヘッドレスモードは使用しない

### Step 4: Playwright Agents Healerで失敗テストを修正

**目的**: 失敗したテストを診断し、自動的に修正する

**手順**:
1. MCPサーバーの `test_debug` ツールで失敗したテストをデバッグする
2. `browser_snapshot` でページ状態を確認する
3. `browser_console_messages` でコンソールエラーを確認する
4. `browser_generate_locator` で新しいセレクタを生成する
5. `edit` ツールでテストコードを修正する
6. 修正後、Step 3 に戻ってテストを再実行する

**修正不可能な場合**:
```typescript
test.fixme('テスト名', async ({ page }) => {
  // 修正不可能な理由をコメントで説明
});
```

## ディレクトリ構成

```
project/
├── target_docs/           # 仕様書（PDF、Markdown等）
├── specs/                 # テスト計画（Planner出力）
│   └── {project}.plan.md
├── tests/                 # テストコード（Generator出力）
│   ├── seed.spec.ts       # 環境検証用シードテスト
│   └── {feature}/         # 機能別テストファイル
│       ├── login.spec.ts
│       ├── cart.spec.ts
│       └── ...
└── playwright.config.ts   # Playwright設定
```

## MCPツール一覧

### Plannerフェーズ
- `planner_setup_page`: ブラウザ初期化
- `browser_navigate`: URL遷移
- `browser_snapshot`: ページ構造取得
- `browser_click`: クリック操作
- `browser_type`: テキスト入力
- `planner_save_plan`: テスト計画保存

### Generatorフェーズ
- `generator_setup_page`: ブラウザ初期化
- `browser_*`: ブラウザ操作ツール群
- `generator_read_log`: アクションログ取得
- `generator_write_test`: テストコード出力

### Healerフェーズ
- `test_run`: テスト実行
- `test_debug`: テストデバッグ
- `test_list`: テスト一覧
- `browser_generate_locator`: セレクタ生成
- `edit`: ファイル編集

## ベストプラクティス

1. **セレクタの優先順位**:
   - `data-test` 属性 > Role-based (`getByRole`) > CSS セレクタ

2. **テストの独立性**:
   - 各テストは独立して実行可能であること
   - 共通のセットアップはヘルパー関数として抽出

3. **待機処理**:
   - 明示的な待機よりも `expect` のビルトイン待機を使用
   - `waitForURL` でページ遷移を待機

4. **エラーメッセージの検証**:
   - `toContainText` で部分一致を使用
   - 完全一致が必要な場合は `toHaveText`

5. **コメント**:
   - 各ステップにコメントを追加し、テスト計画との対応を明確にする

## トラブルシューティング

### Strict Mode Violation
複数の要素にマッチした場合:
- より具体的なセレクタを使用する
- `first()` や `nth()` で要素を特定する
- `{ exact: true }` オプションを追加する

### タイムアウトエラー
要素が見つからない場合:
- ページの読み込み完了を待機する
- セレクタが正しいか確認する
- 動的に生成される要素の場合は待機時間を調整する

### Reset App State後のUI更新
状態リセット後にUIが更新されない場合:
- `page.reload()` でページをリロードする
