# Swag Labs E2E テスト計画

**対象URL**: https://www.saucedemo.com
**テストユーザー**: standard_user / secret_sauce
**仕様書**: target_docs/swag_labs_basic_spec_ja.md

---

## 1. ログイン機能テスト

**Seed:** `tests/seed.spec.ts`

### 1.1 正常ログイン
**Steps:**
1. https://www.saucedemo.com にアクセスする
2. Username フィールドに「standard_user」を入力する
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

### 1.3 パスワード未入力エラー
**Steps:**
1. https://www.saucedemo.com にアクセスする
2. Username フィールドに「standard_user」を入力する
3. Login ボタンをクリックする

**Expected:**
- エラーメッセージ「Epic sadface: Password is required」が表示される
- ログイン画面に留まる

### 1.4 認証情報不正エラー
**Steps:**
1. https://www.saucedemo.com にアクセスする
2. Username フィールドに「invalid_user」を入力する
3. Password フィールドに「wrong_password」を入力する
4. Login ボタンをクリックする

**Expected:**
- エラーメッセージ「Epic sadface: Username and password do not match any user in this service」が表示される
- ログイン画面に留まる

### 1.5 ロックアウトユーザーエラー
**Steps:**
1. https://www.saucedemo.com にアクセスする
2. Username フィールドに「locked_out_user」を入力する
3. Password フィールドに「secret_sauce」を入力する
4. Login ボタンをクリックする

**Expected:**
- エラーメッセージ「Epic sadface: Sorry, this user has been locked out.」が表示される
- ログイン画面に留まる

---

## 2. 商品一覧機能テスト

**Seed:** `tests/seed.spec.ts`

### 2.1 商品一覧表示
**Steps:**
1. standard_user でログインする
2. 商品一覧画面を確認する

**Expected:**
- 6つの商品が表示される
- 各商品に画像、商品名、価格、Add to cart ボタンが表示される

### 2.2 商品ソート（名前昇順）
**Steps:**
1. standard_user でログインする
2. ソートドロップダウンから「Name (A to Z)」を選択する

**Expected:**
- 商品が名前のアルファベット順（A→Z）で並び替えられる

### 2.3 商品ソート（名前降順）
**Steps:**
1. standard_user でログインする
2. ソートドロップダウンから「Name (Z to A)」を選択する

**Expected:**
- 商品が名前のアルファベット逆順（Z→A）で並び替えられる

### 2.4 商品ソート（価格昇順）
**Steps:**
1. standard_user でログインする
2. ソートドロップダウンから「Price (low to high)」を選択する

**Expected:**
- 商品が価格の安い順で並び替えられる

### 2.5 商品ソート（価格降順）
**Steps:**
1. standard_user でログインする
2. ソートドロップダウンから「Price (high to low)」を選択する

**Expected:**
- 商品が価格の高い順で並び替えられる

---

## 3. カート機能テスト

**Seed:** `tests/seed.spec.ts`

### 3.1 商品をカートに追加
**Steps:**
1. standard_user でログインする
2. 任意の商品の「Add to cart」ボタンをクリックする

**Expected:**
- ボタンが「Remove」に変わる
- カートアイコンにバッジ「1」が表示される

### 3.2 複数商品をカートに追加
**Steps:**
1. standard_user でログインする
2. 1つ目の商品の「Add to cart」ボタンをクリックする
3. 2つ目の商品の「Add to cart」ボタンをクリックする

**Expected:**
- 両方のボタンが「Remove」に変わる
- カートアイコンにバッジ「2」が表示される

### 3.3 商品をカートから削除（一覧画面）
**Steps:**
1. standard_user でログインする
2. 任意の商品の「Add to cart」ボタンをクリックする
3. 同じ商品の「Remove」ボタンをクリックする

**Expected:**
- ボタンが「Add to cart」に戻る
- カートアイコンのバッジが消える

### 3.4 カート画面で商品を確認
**Steps:**
1. standard_user でログインする
2. 任意の商品の「Add to cart」ボタンをクリックする
3. カートアイコンをクリックする

**Expected:**
- /cart.html に遷移する
- 追加した商品が表示される
- 商品名、価格、Remove ボタンが表示される

### 3.5 カート画面で商品を削除
**Steps:**
1. standard_user でログインする
2. 任意の商品の「Add to cart」ボタンをクリックする
3. カートアイコンをクリックする
4. 「Remove」ボタンをクリックする

**Expected:**
- 商品がカートから削除される
- カートが空になる

### 3.6 Continue Shopping ボタン
**Steps:**
1. standard_user でログインする
2. カートアイコンをクリックする
3. 「Continue Shopping」ボタンをクリックする

**Expected:**
- /inventory.html に遷移する

---

## 4. チェックアウト機能テスト

**Seed:** `tests/seed.spec.ts`

### 4.1 チェックアウト Step One 正常遷移
**Steps:**
1. standard_user でログインする
2. 任意の商品の「Add to cart」ボタンをクリックする
3. カートアイコンをクリックする
4. 「Checkout」ボタンをクリックする
5. First Name に「Test」を入力する
6. Last Name に「User」を入力する
7. Postal Code に「12345」を入力する
8. 「Continue」ボタンをクリックする

**Expected:**
- /checkout-step-two.html に遷移する

### 4.2 チェックアウト Step One - First Name 未入力エラー
**Steps:**
1. standard_user でログインする
2. 任意の商品の「Add to cart」ボタンをクリックする
3. カートアイコンをクリックする
4. 「Checkout」ボタンをクリックする
5. Last Name に「User」を入力する
6. Postal Code に「12345」を入力する
7. 「Continue」ボタンをクリックする

**Expected:**
- エラーメッセージ「Error: First Name is required」が表示される
- 同画面に留まる

### 4.3 チェックアウト Step One - Last Name 未入力エラー
**Steps:**
1. standard_user でログインする
2. 任意の商品の「Add to cart」ボタンをクリックする
3. カートアイコンをクリックする
4. 「Checkout」ボタンをクリックする
5. First Name に「Test」を入力する
6. Postal Code に「12345」を入力する
7. 「Continue」ボタンをクリックする

**Expected:**
- エラーメッセージ「Error: Last Name is required」が表示される
- 同画面に留まる

### 4.4 チェックアウト Step One - Postal Code 未入力エラー
**Steps:**
1. standard_user でログインする
2. 任意の商品の「Add to cart」ボタンをクリックする
3. カートアイコンをクリックする
4. 「Checkout」ボタンをクリックする
5. First Name に「Test」を入力する
6. Last Name に「User」を入力する
7. 「Continue」ボタンをクリックする

**Expected:**
- エラーメッセージ「Error: Postal Code is required」が表示される
- 同画面に留まる

### 4.5 チェックアウト Step One - Cancel ボタン
**Steps:**
1. standard_user でログインする
2. 任意の商品の「Add to cart」ボタンをクリックする
3. カートアイコンをクリックする
4. 「Checkout」ボタンをクリックする
5. 「Cancel」ボタンをクリックする

**Expected:**
- /cart.html に遷移する

### 4.6 チェックアウト Step Two - 注文明細確認
**Steps:**
1. standard_user でログインする
2. 任意の商品の「Add to cart」ボタンをクリックする
3. カートアイコンをクリックする
4. 「Checkout」ボタンをクリックする
5. First Name、Last Name、Postal Code を入力する
6. 「Continue」ボタンをクリックする

**Expected:**
- 注文明細（商品名、価格）が表示される
- Item total、Tax、Total が表示される

### 4.7 チェックアウト Step Two - Cancel ボタン
**Steps:**
1. standard_user でログインする
2. 任意の商品の「Add to cart」ボタンをクリックする
3. カートアイコンをクリックする
4. 「Checkout」ボタンをクリックする
5. First Name、Last Name、Postal Code を入力する
6. 「Continue」ボタンをクリックする
7. 「Cancel」ボタンをクリックする

**Expected:**
- /inventory.html に遷移する

---

## 5. 注文完了テスト（E2E ハッピーパス）

**Seed:** `tests/seed.spec.ts`

### 5.1 注文完了フロー
**Steps:**
1. https://www.saucedemo.com にアクセスする
2. standard_user / secret_sauce でログインする
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
- /checkout-complete.html に遷移する
- 「Thank you for your order!」が表示される

### 5.2 注文完了後の Back Home
**Steps:**
1. 注文完了フロー（5.1）を実行する
2. 「Back Home」ボタンをクリックする

**Expected:**
- /inventory.html に遷移する
- カートが空になっている（バッジが表示されない）

---

## 6. 商品詳細画面テスト

**Seed:** `tests/seed.spec.ts`

### 6.1 商品詳細画面への遷移
**Steps:**
1. standard_user でログインする
2. 任意の商品名をクリックする

**Expected:**
- /inventory-item.html?id=xxx に遷移する
- 商品の画像、商品名、説明、価格、Add to cart ボタンが表示される

### 6.2 商品詳細画面からカートに追加
**Steps:**
1. standard_user でログインする
2. 任意の商品名をクリックする
3. 「Add to cart」ボタンをクリックする

**Expected:**
- ボタンが「Remove」に変わる
- カートアイコンにバッジ「1」が表示される

### 6.3 商品詳細画面から一覧に戻る
**Steps:**
1. standard_user でログインする
2. 任意の商品名をクリックする
3. 「Back to products」ボタンをクリックする

**Expected:**
- /inventory.html に遷移する

---

## 7. ハンバーガーメニューテスト

**Seed:** `tests/seed.spec.ts`

### 7.1 ログアウト
**Steps:**
1. standard_user でログインする
2. ハンバーガーメニューをクリックする
3. 「Logout」をクリックする

**Expected:**
- /（ログイン画面）に遷移する

### 7.2 Reset App State
**Steps:**
1. standard_user でログインする
2. 任意の商品の「Add to cart」ボタンをクリックする
3. ハンバーガーメニューをクリックする
4. 「Reset App State」をクリックする

**Expected:**
- カートが空になる（バッジが消える）
- 商品ボタンが「Add to cart」に戻る
- ログイン状態は維持される

### 7.3 All Items
**Steps:**
1. standard_user でログインする
2. カートアイコンをクリックする
3. ハンバーガーメニューをクリックする
4. 「All Items」をクリックする

**Expected:**
- /inventory.html に遷移する

---

## 8. 未認証アクセステスト

**Seed:** `tests/seed.spec.ts`

### 8.1 未ログイン状態で商品一覧にアクセス
**Steps:**
1. ログインせずに https://www.saucedemo.com/inventory.html に直接アクセスする

**Expected:**
- ログイン画面にリダイレクトされる
- エラーメッセージが表示される
