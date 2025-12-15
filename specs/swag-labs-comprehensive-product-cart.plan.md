# Swag Labs 商品一覧・商品選択・カート投入 網羅的テスト計画

**対象URL**: https://www.saucedemo.com
**テストユーザー**: standard_user / secret_sauce, problem_user / secret_sauce
**スコープ**: 商品一覧、商品選択（詳細画面）、カート投入

---

## 商品データ

| ID | 商品名 | 価格 | data-test属性 |
|----|--------|------|---------------|
| 4 | Sauce Labs Backpack | $29.99 | sauce-labs-backpack |
| 0 | Sauce Labs Bike Light | $9.99 | sauce-labs-bike-light |
| 1 | Sauce Labs Bolt T-Shirt | $15.99 | sauce-labs-bolt-t-shirt |
| 5 | Sauce Labs Fleece Jacket | $49.99 | sauce-labs-fleece-jacket |
| 2 | Sauce Labs Onesie | $7.99 | sauce-labs-onesie |
| 3 | Test.allTheThings() T-Shirt (Red) | $15.99 | test.allthethings()-t-shirt-(red) |

---

## 1. 商品一覧機能テスト（standard_user）

**Seed:** `tests/seed.spec.ts`

### 1.1 商品一覧の基本表示確認
**Steps:**
1. standard_user でログインする
2. 商品一覧画面を確認する

**Expected:**
- 6つの商品が表示される
- 各商品に画像、商品名、説明、価格、Add to cart ボタンが表示される
- ヘッダーに「Products」タイトルが表示される
- ソートドロップダウンが表示される

### 1.2 全商品の個別表示確認
**Steps:**
1. standard_user でログインする
2. 各商品の表示内容を確認する

**Expected:**
- Sauce Labs Backpack: $29.99
- Sauce Labs Bike Light: $9.99
- Sauce Labs Bolt T-Shirt: $15.99
- Sauce Labs Fleece Jacket: $49.99
- Sauce Labs Onesie: $7.99
- Test.allTheThings() T-Shirt (Red): $15.99

### 1.3 商品画像の表示確認
**Steps:**
1. standard_user でログインする
2. 各商品の画像が正しく表示されているか確認する

**Expected:**
- 全6商品の画像が表示される
- 画像のsrc属性が空でない
- 画像が壊れていない（naturalWidthが0より大きい）

### 1.4 商品ソート（名前昇順 A to Z）
**Steps:**
1. standard_user でログインする
2. ソートドロップダウンから「Name (A to Z)」を選択する

**Expected:**
- 商品が名前のアルファベット順（A→Z）で並び替えられる
- 最初の商品が「Sauce Labs Backpack」
- 最後の商品が「Test.allTheThings() T-Shirt (Red)」

### 1.5 商品ソート（名前降順 Z to A）
**Steps:**
1. standard_user でログインする
2. ソートドロップダウンから「Name (Z to A)」を選択する

**Expected:**
- 商品が名前のアルファベット逆順（Z→A）で並び替えられる
- 最初の商品が「Test.allTheThings() T-Shirt (Red)」
- 最後の商品が「Sauce Labs Backpack」

### 1.6 商品ソート（価格昇順 low to high）
**Steps:**
1. standard_user でログインする
2. ソートドロップダウンから「Price (low to high)」を選択する

**Expected:**
- 商品が価格の安い順で並び替えられる
- 最初の商品が「Sauce Labs Onesie」（$7.99）
- 最後の商品が「Sauce Labs Fleece Jacket」（$49.99）

### 1.7 商品ソート（価格降順 high to low）
**Steps:**
1. standard_user でログインする
2. ソートドロップダウンから「Price (high to low)」を選択する

**Expected:**
- 商品が価格の高い順で並び替えられる
- 最初の商品が「Sauce Labs Fleece Jacket」（$49.99）
- 最後の商品が「Sauce Labs Onesie」（$7.99）

### 1.8 ソート状態の維持確認
**Steps:**
1. standard_user でログインする
2. ソートドロップダウンから「Price (high to low)」を選択する
3. 任意の商品詳細画面に遷移する
4. 「Back to products」で一覧に戻る

**Expected:**
- ソート状態が維持されている（Price high to low）

---

## 2. 商品詳細画面テスト（standard_user）

**Seed:** `tests/seed.spec.ts`

### 2.1 各商品の詳細画面への遷移確認
**Steps:**
1. standard_user でログインする
2. 各商品名をクリックして詳細画面に遷移する

**Expected:**
- 各商品の詳細画面に正しく遷移する
- URLが /inventory-item.html?id=xxx の形式

### 2.2 商品詳細画面の要素確認
**Steps:**
1. standard_user でログインする
2. 任意の商品詳細画面に遷移する

**Expected:**
- 商品画像が表示される
- 商品名が表示される
- 商品説明が表示される
- 価格が表示される
- Add to cart ボタンが表示される
- Back to products ボタンが表示される

### 2.3 商品詳細の内容一致確認（Sauce Labs Backpack）
**Steps:**
1. standard_user でログインする
2. Sauce Labs Backpack の詳細画面に遷移する

**Expected:**
- 商品名: Sauce Labs Backpack
- 価格: $29.99
- 説明文が表示される

### 2.4 商品詳細の内容一致確認（全商品）
**Steps:**
1. standard_user でログインする
2. 各商品の詳細画面に遷移し、情報を確認する

**Expected:**
- 各商品の名前、価格、説明が一覧画面と一致する

### 2.5 商品画像クリックでの詳細画面遷移
**Steps:**
1. standard_user でログインする
2. 商品画像をクリックする

**Expected:**
- 商品詳細画面に遷移する

### 2.6 詳細画面からカートに追加
**Steps:**
1. standard_user でログインする
2. 任意の商品詳細画面に遷移する
3. Add to cart ボタンをクリックする

**Expected:**
- ボタンが「Remove」に変わる
- カートアイコンにバッジ「1」が表示される

### 2.7 詳細画面でカートから削除
**Steps:**
1. standard_user でログインする
2. 任意の商品詳細画面に遷移する
3. Add to cart ボタンをクリックする
4. Remove ボタンをクリックする

**Expected:**
- ボタンが「Add to cart」に戻る
- カートアイコンのバッジが消える

### 2.8 詳細画面から一覧に戻る
**Steps:**
1. standard_user でログインする
2. 任意の商品詳細画面に遷移する
3. Back to products ボタンをクリックする

**Expected:**
- /inventory.html に遷移する

---

## 3. カート投入機能テスト（standard_user）

**Seed:** `tests/seed.spec.ts`

### 3.1 単一商品をカートに追加
**Steps:**
1. standard_user でログインする
2. Sauce Labs Backpack の Add to cart ボタンをクリックする

**Expected:**
- ボタンが「Remove」に変わる
- カートアイコンにバッジ「1」が表示される

### 3.2 複数商品をカートに追加（2商品）
**Steps:**
1. standard_user でログインする
2. Sauce Labs Backpack の Add to cart ボタンをクリックする
3. Sauce Labs Bike Light の Add to cart ボタンをクリックする

**Expected:**
- 両方のボタンが「Remove」に変わる
- カートアイコンにバッジ「2」が表示される

### 3.3 全商品をカートに追加（6商品）
**Steps:**
1. standard_user でログインする
2. 全6商品の Add to cart ボタンをクリックする

**Expected:**
- 全てのボタンが「Remove」に変わる
- カートアイコンにバッジ「6」が表示される

### 3.4 商品をカートから削除（一覧画面）
**Steps:**
1. standard_user でログインする
2. Sauce Labs Backpack の Add to cart ボタンをクリックする
3. Sauce Labs Backpack の Remove ボタンをクリックする

**Expected:**
- ボタンが「Add to cart」に戻る
- カートアイコンのバッジが消える

### 3.5 複数商品から一部を削除
**Steps:**
1. standard_user でログインする
2. Sauce Labs Backpack と Sauce Labs Bike Light をカートに追加する
3. Sauce Labs Backpack の Remove ボタンをクリックする

**Expected:**
- Sauce Labs Backpack のボタンが「Add to cart」に戻る
- Sauce Labs Bike Light のボタンは「Remove」のまま
- カートアイコンにバッジ「1」が表示される

### 3.6 カート画面で商品を確認
**Steps:**
1. standard_user でログインする
2. Sauce Labs Backpack をカートに追加する
3. カートアイコンをクリックする

**Expected:**
- /cart.html に遷移する
- Sauce Labs Backpack が表示される
- 商品名、価格、数量、Remove ボタンが表示される

### 3.7 カート画面で複数商品を確認
**Steps:**
1. standard_user でログインする
2. Sauce Labs Backpack と Sauce Labs Bike Light をカートに追加する
3. カートアイコンをクリックする

**Expected:**
- 2つの商品が表示される
- 各商品の情報が正しく表示される

### 3.8 カート画面で商品を削除
**Steps:**
1. standard_user でログインする
2. Sauce Labs Backpack をカートに追加する
3. カートアイコンをクリックする
4. Remove ボタンをクリックする

**Expected:**
- 商品がカートから削除される
- カートが空になる
- カートアイコンのバッジが消える

### 3.9 カート画面で一部商品を削除
**Steps:**
1. standard_user でログインする
2. Sauce Labs Backpack と Sauce Labs Bike Light をカートに追加する
3. カートアイコンをクリックする
4. Sauce Labs Backpack の Remove ボタンをクリックする

**Expected:**
- Sauce Labs Backpack がカートから削除される
- Sauce Labs Bike Light は残る
- カートアイコンにバッジ「1」が表示される

### 3.10 Continue Shopping ボタン
**Steps:**
1. standard_user でログインする
2. カートアイコンをクリックする
3. Continue Shopping ボタンをクリックする

**Expected:**
- /inventory.html に遷移する

### 3.11 カート追加後に一覧に戻った時の状態確認
**Steps:**
1. standard_user でログインする
2. Sauce Labs Backpack をカートに追加する
3. カートアイコンをクリックする
4. Continue Shopping ボタンをクリックする

**Expected:**
- Sauce Labs Backpack のボタンが「Remove」のまま
- カートアイコンにバッジ「1」が表示されたまま

### 3.12 詳細画面からカート追加後の一覧画面状態
**Steps:**
1. standard_user でログインする
2. Sauce Labs Backpack の詳細画面に遷移する
3. Add to cart ボタンをクリックする
4. Back to products で一覧に戻る

**Expected:**
- 一覧画面で Sauce Labs Backpack のボタンが「Remove」になっている
- カートアイコンにバッジ「1」が表示される

---

## 4. 商品一覧機能テスト（problem_user）

**Seed:** `tests/seed.spec.ts`

### 4.1 商品一覧の基本表示確認
**Steps:**
1. problem_user でログインする
2. 商品一覧画面を確認する

**Expected:**
- 6つの商品が表示される
- 各商品に画像、商品名、説明、価格、Add to cart ボタンが表示される

### 4.2 商品画像の問題確認
**Steps:**
1. problem_user でログインする
2. 各商品の画像を確認する

**Expected:**
- 画像が正しく表示されない可能性がある（problem_userの既知の問題）

### 4.3 商品ソート（名前昇順）
**Steps:**
1. problem_user でログインする
2. ソートドロップダウンから「Name (A to Z)」を選択する

**Expected:**
- 商品が名前のアルファベット順で並び替えられる

### 4.4 商品ソート（名前降順）- 問題検証
**Steps:**
1. problem_user でログインする
2. ソートドロップダウンから「Name (Z to A)」を選択する

**Expected:**
- ソートが正しく動作しない可能性がある（problem_userの既知の問題）

### 4.5 商品ソート（価格昇順）- 問題検証
**Steps:**
1. problem_user でログインする
2. ソートドロップダウンから「Price (low to high)」を選択する

**Expected:**
- ソートが正しく動作しない可能性がある（problem_userの既知の問題）

### 4.6 商品ソート（価格降順）- 問題検証
**Steps:**
1. problem_user でログインする
2. ソートドロップダウンから「Price (high to low)」を選択する

**Expected:**
- ソートが正しく動作しない可能性がある（problem_userの既知の問題）

---

## 5. 商品詳細画面テスト（problem_user）

**Seed:** `tests/seed.spec.ts`

### 5.1 商品詳細画面への遷移
**Steps:**
1. problem_user でログインする
2. 任意の商品名をクリックする

**Expected:**
- 商品詳細画面に遷移する

### 5.2 詳細画面からカートに追加 - 問題検証
**Steps:**
1. problem_user でログインする
2. 任意の商品詳細画面に遷移する
3. Add to cart ボタンをクリックする

**Expected:**
- ボタンが「Remove」に変わらない可能性がある（problem_userの既知の問題）

### 5.3 詳細画面から一覧に戻る
**Steps:**
1. problem_user でログインする
2. 任意の商品詳細画面に遷移する
3. Back to products ボタンをクリックする

**Expected:**
- /inventory.html に遷移する

---

## 6. カート投入機能テスト（problem_user）

**Seed:** `tests/seed.spec.ts`

### 6.1 商品をカートに追加
**Steps:**
1. problem_user でログインする
2. Sauce Labs Backpack の Add to cart ボタンをクリックする

**Expected:**
- ボタンが「Remove」に変わる
- カートアイコンにバッジ「1」が表示される

### 6.2 複数商品をカートに追加
**Steps:**
1. problem_user でログインする
2. Sauce Labs Backpack と Sauce Labs Bike Light をカートに追加する

**Expected:**
- 両方のボタンが「Remove」に変わる
- カートアイコンにバッジ「2」が表示される

### 6.3 商品をカートから削除（一覧画面）- 問題検証
**Steps:**
1. problem_user でログインする
2. Sauce Labs Backpack をカートに追加する
3. Remove ボタンをクリックする

**Expected:**
- ボタンが「Add to cart」に戻らない可能性がある（problem_userの既知の問題）

### 6.4 カート画面で商品を確認
**Steps:**
1. problem_user でログインする
2. Sauce Labs Backpack をカートに追加する
3. カートアイコンをクリックする

**Expected:**
- /cart.html に遷移する
- 追加した商品が表示される

### 6.5 カート画面で商品を削除
**Steps:**
1. problem_user でログインする
2. Sauce Labs Backpack をカートに追加する
3. カートアイコンをクリックする
4. Remove ボタンをクリックする

**Expected:**
- 商品がカートから削除される

### 6.6 Continue Shopping ボタン
**Steps:**
1. problem_user でログインする
2. カートアイコンをクリックする
3. Continue Shopping ボタンをクリックする

**Expected:**
- /inventory.html に遷移する

---

## テストケース数サマリー

| カテゴリ | standard_user | problem_user | 合計 |
|----------|---------------|--------------|------|
| 商品一覧機能 | 8 | 6 | 14 |
| 商品詳細画面 | 8 | 3 | 11 |
| カート投入機能 | 12 | 6 | 18 |
| **合計** | **28** | **15** | **43** |
