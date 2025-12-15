# Swag Labs E2E テスト計画（problem_user）

**対象URL**: https://www.saucedemo.com
**テストユーザー**: problem_user / secret_sauce
**仕様書**: target_docs/swag_labs_basic_spec_ja.md

## problem_userの特徴

problem_userは、UIの崩れや画像の不整合など、問題を意図的に発生させるテストユーザーです。
以下の問題が発生することが想定されています：

1. 商品一覧画面で全ての商品画像が壊れている（sl-404.jpg）
2. ソート機能が正常に動作しない
3. フォーム入力に問題がある（Last Nameが入力できない等）
4. カートへの追加が正常に動作しない場合がある

---

## 1. ログイン機能テスト

**Seed:** `tests/seed.spec.ts`

### 1.1 正常ログイン
**Steps:**
1. https://www.saucedemo.com にアクセスする
2. Username フィールドに「problem_user」を入力する
3. Password フィールドに「secret_sauce」を入力する
4. Login ボタンをクリックする

**Expected:**
- /inventory.html に遷移する
- 商品一覧が表示される

### 1.2 ユーザー名未入力エラー
**Steps:**
1. https://www.saucedemo.com にアクセスする
2. Password フィールドに「secret_sauce」を入力する
3. Login ボタンをクリックする

**Expected:**
- エラーメッセージ「Epic sadface: Username is required」が表示される
- ログイン画面に留まる

---

## 2. 商品一覧機能テスト

**Seed:** `tests/seed.spec.ts`

### 2.1 商品一覧表示
**Steps:**
1. problem_user でログインする
2. 商品一覧画面を確認する

**Expected:**
- 6つの商品が表示される
- 各商品に商品名、価格、Add to cart ボタンが表示される
- **problem_user特有**: 全ての商品画像が壊れている（sl-404.jpg）

### 2.2 商品ソート（名前昇順）
**Steps:**
1. problem_user でログインする
2. ソートドロップダウンから「Name (A to Z)」を選択する

**Expected:**
- **problem_user特有**: ソートが正常に動作しない可能性がある

### 2.3 商品ソート（価格昇順）
**Steps:**
1. problem_user でログインする
2. ソートドロップダウンから「Price (low to high)」を選択する

**Expected:**
- **problem_user特有**: ソートが正常に動作しない可能性がある

---

## 3. カート機能テスト

**Seed:** `tests/seed.spec.ts`

### 3.1 商品をカートに追加
**Steps:**
1. problem_user でログインする
2. 任意の商品の「Add to cart」ボタンをクリックする

**Expected:**
- ボタンが「Remove」に変わる
- カートアイコンにバッジが表示される
- **problem_user特有**: カートへの追加が正常に動作しない場合がある

### 3.2 カート画面で商品を確認
**Steps:**
1. problem_user でログインする
2. 任意の商品の「Add to cart」ボタンをクリックする
3. カートアイコンをクリックする

**Expected:**
- /cart.html に遷移する
- 追加した商品が表示される

---

## 4. チェックアウト機能テスト

**Seed:** `tests/seed.spec.ts`

### 4.1 チェックアウト Step One 正常遷移
**Steps:**
1. problem_user でログインする
2. 任意の商品の「Add to cart」ボタンをクリックする
3. カートアイコンをクリックする
4. 「Checkout」ボタンをクリックする
5. First Name に「Test」を入力する
6. Last Name に「User」を入力する
7. Postal Code に「12345」を入力する
8. 「Continue」ボタンをクリックする

**Expected:**
- **problem_user特有**: Last Nameの入力が正常に動作しない可能性がある
- エラーが発生する可能性がある

### 4.2 チェックアウト Step One - Last Name 未入力エラー（problem_user特有）
**Steps:**
1. problem_user でログインする
2. 任意の商品の「Add to cart」ボタンをクリックする
3. カートアイコンをクリックする
4. 「Checkout」ボタンをクリックする
5. Last Name に「User」を入力する（`[data-test="lastName"]`を使用）
6. Postal Code に「12345」を入力する
7. 「Continue」ボタンをクリックする

**Expected:**
- **problem_user特有**: `[data-test="lastName"]`への入力がFirst Nameフィールドに入ってしまうため、Last Nameは空のまま
- エラーメッセージ「Error: Last Name is required」が表示される
- 同画面に留まる

---

## 5. 注文完了テスト（E2E ハッピーパス）

**Seed:** `tests/seed.spec.ts`

### 5.1 注文完了フロー
**Steps:**
1. https://www.saucedemo.com にアクセスする
2. problem_user / secret_sauce でログインする
3. 「Sauce Labs Backpack」の「Add to cart」ボタンをクリックする
4. カートアイコンをクリックする
5. 「Checkout」ボタンをクリックする
6. First Name に「Test」を入力する
7. Last Name に「User」を入力する
8. Postal Code に「12345」を入力する
9. 「Continue」ボタンをクリックする
10. 注文明細を確認する
11. 「Finish」ボタンをクリックする

**Expected:**
- **problem_user特有**: Last Nameの入力問題により、注文完了まで到達できない可能性がある

---

## 6. 商品詳細画面テスト

**Seed:** `tests/seed.spec.ts`

### 6.1 商品詳細画面への遷移
**Steps:**
1. problem_user でログインする
2. 任意の商品名をクリックする

**Expected:**
- /inventory-item.html?id=xxx に遷移する
- 商品の画像、商品名、説明、価格、Add to cart ボタンが表示される
- **problem_user特有**: 商品詳細画面では画像が正常に表示される（一覧とは異なる）

---

## 7. ハンバーガーメニューテスト

**Seed:** `tests/seed.spec.ts`

### 7.1 ログアウト
**Steps:**
1. problem_user でログインする
2. ハンバーガーメニューをクリックする
3. 「Logout」をクリックする

**Expected:**
- /（ログイン画面）に遷移する

### 7.2 Reset App State
**Steps:**
1. problem_user でログインする
2. 任意の商品の「Add to cart」ボタンをクリックする
3. ハンバーガーメニューをクリックする
4. 「Reset App State」をクリックする

**Expected:**
- カートが空になる（バッジが消える）
- 商品ボタンが「Add to cart」に戻る

---

## 8. 未認証アクセステスト

**Seed:** `tests/seed.spec.ts`

### 8.1 未ログイン状態で商品一覧にアクセス
**Steps:**
1. ログインせずに https://www.saucedemo.com/inventory.html に直接アクセスする

**Expected:**
- ログイン画面にリダイレクトされる
- エラーメッセージが表示される
