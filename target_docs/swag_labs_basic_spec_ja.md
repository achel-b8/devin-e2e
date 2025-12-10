# Swag Labs 基本仕様書（日本語版サマリ）

バージョン: 1.0
作成日: 2025-12-08
対象システム: Swag Labs（SauceDemo デモ EC サイト）
URL: https://www.saucedemo.com

## 1. システム概要

Swag Labs（SauceDemo）は、Sauce Labs が提供する UI / E2E テスト検証用のデモ EC サイトである。
ログイン、商品一覧、商品詳細、カート、2 ステップのチェックアウト、ログアウト、アプリ状態リセットなど、典型的な EC サイト機能を備えている。
実際の決済や配送は行われず、すべてテスト用途のモック動作である。

## 2. テストユーザー

すべてのテストユーザーは共通パスワード「secret_sauce」を使用する。
代表的なユーザーは以下の通りである。

- **standard_user**: 正常動作用ユーザー。ログインから購入完了までの正常系テストに利用する。
- **locked_out_user**: ログインできないユーザー。エラーメッセージ「Epic sadface: Sorry, this user has been locked out.」が表示される。
- **problem_user**: UI の崩れや画像の不整合など、問題を意図的に発生させるユーザー。
- **performance_glitch_user**: 画面遷移や描画が遅くなるなど、パフォーマンス劣化を再現するユーザー。
- **error_user / visual_user**: エラー表示や視覚的差異の検証用途に使用するユーザー。

## 3. ログイン画面（/）

- 入力項目: Username, Password
- ボタン: Login
- 標準動作: standard_user / secret_sauce でログインすると /inventory.html に遷移する。
- 入力チェック:
  - ユーザー名未入力: 「Epic sadface: Username is required」
  - パスワード未入力: 「Epic sadface: Password is required」
  - 組み合わせ不正: 「Epic sadface: Username and password do not match any user in this service」
  - locked_out_user: 「Epic sadface: Sorry, this user has been locked out.」

## 4. 商品一覧画面（/inventory.html）

- 内容: 全 6 商品（Backpack, Bike Light, Bolt T-Shirt, Fleece Jacket, Onesie, Test.allTheThings() T-Shirt）がカード形式で表示される。
- 各商品: 画像、商品名、価格、Add to cart/Remove ボタンを持つ。
- ソート: 画面右上のドロップダウンで Name (A to Z / Z to A), Price (low to high / high to low) による並び替えが可能。
- カートバッジ: 追加済み商品数がヘッダーのカートアイコン横に表示される。
- 遷移:
  - 商品名クリック: 対象商品の詳細画面（/inventory-item.html?id=xxx）へ遷移。
  - カートアイコンクリック: カート画面（/cart.html）へ遷移。

## 5. 商品詳細画面

- 表示: 選択した 1 商品の画像、商品名、説明、価格、Add to cart/Remove ボタンを表示する。
- 動作: Add to cart / Remove は商品一覧・カートと共通のカート状態を更新する。
- 戻る: 「Back to products」ボタンで /inventory.html に戻る。

## 6. カート画面（/cart.html）

- 内容: カート内商品一覧（商品名、価格、Remove ボタン）と合計金額を表示する。
- ボタン:
  - Continue Shopping: /inventory.html に戻る。
  - Checkout: /checkout-step-one.html へ遷移する。
- Remove ボタン: 該当商品をカートから削除し、カートバッジと合計金額を更新する。

## 7. Checkout Step One（/checkout-step-one.html）

- 入力項目: First Name, Last Name, Postal Code（すべて必須）
- ボタン:
  - Cancel: /cart.html に戻る。
  - Continue: 入力がすべて埋まっている場合、/checkout-step-two.html に遷移する。
  - いずれかが未入力の場合、エラー表示が行われ、同画面に留まる。

## 8. Checkout Step Two（/checkout-step-two.html）

- 内容: 注文明細（商品名、価格）、Item total、Tax、Total を表示する。
- ボタン:
  - Cancel: カート画面または前画面に戻る（実装依存）。
  - Finish: /checkout-complete.html に遷移し、注文完了となる。

## 9. Checkout Complete（/checkout-complete.html）

- 表示: 見出し「Thank you for your order!」と、Back Home ボタンを表示する。
- Back Home: /inventory.html に戻る。この時点でカートは空になっていることが期待される。

## 10. 共通ヘッダーおよびメニュー

- ヘッダー: 左に Swag Labs ロゴ、中に画面タイトル、右にカートアイコン（バッジ付き）。
- ハンバーガーメニュー:
  - All Items: /inventory.html へ遷移。
  - About: Sauce Labs サイトなど、外部情報ページへ遷移。
  - Logout: ログアウトして /（ログイン画面）へ遷移。
  - Reset App State: カートと商品ボタン状態を初期化（Add to cart に戻す）が、ログイン状態は維持される。

## 11. セッションとタイムアウト

Swag Labs は一定時間（概ね 10 分程度）操作がない場合、自動的にログアウトされる挙動を持つとされる。
タイムアウト後に保護された URL にアクセスした場合は、ログイン画面へリダイレクトされることが期待される。

## 12. 代表的な E2E シナリオ（正常購入）

1. / にアクセスし、standard_user / secret_sauce でログインする。
2. /inventory.html で任意の商品を Add to cart する。
3. カートアイコンから /cart.html に遷移し、内容を確認する。
4. Checkout を押下し、/checkout-step-one.html で First Name / Last Name / Postal Code を入力して Continue を押下する。
5. /checkout-step-two.html で明細と合計金額を確認し、Finish を押下する。
6. /checkout-complete.html で「Thank you for your order!」を確認し、Back Home で /inventory.html に戻る。
