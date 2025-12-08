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

## GitHub Pages

テスト結果はGitHub Pagesで自動的に公開されます。

リポジトリの設定で GitHub Pages を有効にしてください：
1. Settings > Pages
2. Source: GitHub Actions

## ライセンス

ISC
