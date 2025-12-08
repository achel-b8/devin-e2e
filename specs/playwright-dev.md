# Playwright.dev E2E テスト計画

## 概要
このテスト計画は、https://playwright.dev/ の主要ページが正しく表示されることを検証するE2Eテストを定義します。

**Seed:** `seed.spec.ts`

---

## 1. ホームページテスト

### 1.1 ホームページの基本表示確認
**Steps:**
1. https://playwright.dev/ にアクセスする
2. ページタイトルに「Playwright」が含まれていることを確認する
3. メインヘッダー「Playwright enables reliable end-to-end testing for modern web apps.」が表示されていることを確認する
4. 「Get started」リンクが表示されていることを確認する
5. GitHubスターボタンが表示されていることを確認する

### 1.2 ナビゲーションメニューの確認
**Steps:**
1. https://playwright.dev/ にアクセスする
2. Playwrightロゴが表示されていることを確認する
3. 検索ボタンが表示されていることを確認する

### 1.3 フッターリンクの確認
**Steps:**
1. https://playwright.dev/ にアクセスする
2. フッターに「Learn」セクションが表示されていることを確認する
3. フッターに「Community」セクションが表示されていることを確認する
4. フッターに「More」セクションが表示されていることを確認する
5. コピーライト表示が存在することを確認する

---

## 2. ドキュメントページテスト

### 2.1 Getting Startedページの表示確認
**Steps:**
1. https://playwright.dev/docs/intro にアクセスする
2. ページタイトルに「Installation」が含まれていることを確認する
3. 「Installation」見出しが表示されていることを確認する
4. インストールコマンド「npm init playwright@latest」が表示されていることを確認する

### 2.2 ドキュメントナビゲーションの確認
**Steps:**
1. https://playwright.dev/docs/intro にアクセスする
2. サイドバーナビゲーションが表示されていることを確認する
3. 「Next」ナビゲーションリンクが表示されていることを確認する

---

## 3. コミュニティページテスト

### 3.1 Welcomeページの表示確認
**Steps:**
1. https://playwright.dev/community/welcome にアクセスする
2. ページタイトルに「Welcome」が含まれていることを確認する
3. 「Welcome」見出しが表示されていることを確認する
4. 「Ambassadors」セクションが表示されていることを確認する
5. 「GitHub」セクションが表示されていることを確認する
6. 「Community Discord」セクションが表示されていることを確認する
