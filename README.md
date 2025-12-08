# devin-e2e

Playwright Test AgentsとAllure Reportを使用したE2Eテスト環境

## 概要

このリポジトリは、公開されているWebサービス（ステージング環境）に対するE2Eテストを実施するための環境です。

### 主な機能

1. **Playwright Test Agents** - AIを活用したテスト設計・実装・修復
   - Planner: アプリを探索し、Markdownテスト計画を作成
   - Generator: テスト計画からPlaywrightテストコードを生成
   - Healer: 失敗したテストを自動修復

2. **Allure Report** - テスト結果の可視化
   - 詳細なテストレポート生成
   - GitHub Pagesでの公開

## セットアップ

### 必要条件

- Node.js 20以上
- npm

### インストール

```bash
npm install
npx playwright install --with-deps
```

### Playwright Test Agentsの初期化

```bash
npm run init-agents
```

## 使い方

### テストの実行

```bash
# 全テストを実行
npm test

# UIモードで実行
npm run test:ui

# ブラウザを表示して実行
npm run test:headed

# デバッグモードで実行
npm run test:debug
```

### レポートの確認

```bash
# Playwrightレポートを表示
npm run report

# Allureレポートを生成
npm run allure:generate

# Allureレポートを表示
npm run allure:open

# Allureレポートをサーブ（生成と表示を同時に）
npm run allure:serve
```

## ディレクトリ構成

```
.
├── .github/
│   ├── agents/           # Playwright Test Agents定義
│   │   ├── playwright-test-generator.agent.md
│   │   ├── playwright-test-healer.agent.md
│   │   └── playwright-test-planner.agent.md
│   └── workflows/        # GitHub Actionsワークフロー
│       ├── copilot-setup-steps.yml
│       └── e2e-tests.yml
├── specs/                # テスト計画（Markdown）
├── tests/                # 生成されたテストファイル
├── seed.spec.ts          # シードテスト（環境セットアップ用）
├── playwright.config.ts  # Playwright設定
└── package.json
```

## ワークフロー

1. **テスト設計**: Plannerエージェントを使用して仕様書からテスト計画を作成
2. **テスト実装**: GeneratorとHealerエージェントを使用してテストコードを生成・修復
3. **テスト実行**: `npm test`でテストを実行
4. **レポート確認**: GitHub Pagesで公開されたAllure Reportを確認

## Playwright Agents MCPを使用したテスト作成の実例

このリポジトリでは、Playwright Agents MCPサーバーを使用してE2Eテストを作成しました。以下はその具体的なワークフローです。

### 1. Playwright Agents MCPサーバーの確認

Devin環境では、Playwright MCPサーバーが利用可能です。以下のツールが提供されています：

- `browser_navigate`: URLにナビゲート
- `browser_snapshot`: ページのアクセシビリティスナップショットを取得
- `browser_click`: 要素をクリック
- `browser_type`: テキストを入力
- `browser_run_code`: Playwrightコードスニペットを実行
- `browser_take_screenshot`: スクリーンショットを取得

### 2. ページの探索（Plannerの役割）

MCPサーバーの`browser_navigate`と`browser_snapshot`ツールを使用して、対象サイトを探索しました：

```
# MCPサーバーでページにアクセス
browser_navigate: {"url": "https://playwright.dev/"}

# ページのスナップショットを取得
browser_snapshot: {}
```

スナップショットからは以下の情報が取得できます：
- ページURL、タイトル
- 各要素の参照ID（ref）
- 要素の種類（heading, link, button等）
- 要素のテキスト内容

### 3. テスト計画の作成

探索結果をもとに、`specs/playwright-dev.md`にテスト計画を作成しました：

```markdown
## 1. ホームページテスト

### 1.1 ホームページの基本表示確認
**Steps:**
1. https://playwright.dev/ にアクセスする
2. ページタイトルに「Playwright」が含まれていることを確認する
3. メインヘッダーが表示されていることを確認する
...
```

### 4. テストコードの生成（Generatorの役割）

MCPサーバーで取得したスナップショット情報を参考に、Playwrightテストコードを生成しました：

```typescript
// spec: specs/playwright-dev.md
// Generated using Playwright Agents MCP

import { test, expect } from '@playwright/test';

test.describe('1. ホームページテスト', () => {
  test('1.1 ホームページの基本表示確認', async ({ page }) => {
    // 1. https://playwright.dev/ にアクセスする
    await page.goto('https://playwright.dev/');

    // 2. ページタイトルに「Playwright」が含まれていることを確認する
    await expect(page).toHaveTitle(/Playwright/);

    // 3. メインヘッダーが表示されていることを確認する
    const mainHeading = page.getByRole('heading', {
      name: 'Playwright enables reliable end-to-end testing for modern web apps.',
      level: 1,
    });
    await expect(mainHeading).toBeVisible();
    ...
  });
});
```

### 5. テストの修復（Healerの役割）

テスト実行時にエラーが発生した場合、エラーメッセージを分析して修正しました：

```
Error: strict mode violation: locator('footer').getByText('Learn') resolved to 2 elements
```

この場合、`{ exact: true }`オプションを追加して修正：

```typescript
// 修正前
await expect(footer.getByText('Learn')).toBeVisible();

// 修正後
await expect(footer.getByText('Learn', { exact: true })).toBeVisible();
```

### 6. Devinブラウザでの検証

Playwright Agents MCPサーバーとDevinのブラウザツールを併用して、実際にページが正しく表示されることを視覚的に確認しました。

### まとめ

Playwright Agents MCPを使用することで：
1. **探索**: MCPサーバーでページ構造を自動取得
2. **計画**: スナップショット情報からテスト計画を作成
3. **生成**: 要素の参照情報を使ってテストコードを生成
4. **修復**: エラー情報を分析して自動修正

このワークフローにより、効率的にE2Eテストを作成・保守できます。

## GitHub Pages

テスト結果はGitHub Pagesで自動的に公開されます。

リポジトリの設定で GitHub Pages を有効にしてください：
1. Settings > Pages
2. Source: GitHub Actions

## ライセンス

ISC
