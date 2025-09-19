# Repository Guidelines

## プロジェクト構成とモジュール配置
- `backend/` は Rails API を管理します。主要なエンドポイントは `app/controllers/`、ドメインロジックは `app/models/`、補助的なジョブやヘルパーは `app/jobs` および `lib/` にあります。データベースのマイグレーションとシードは `db/` 配下です。
- `frontend/` には React Router + Vite アプリがあります。エントリーポイントは `app/root.tsx`、ルートモジュールは `app/routes/`、共通ユーティリティは `app/lib/` に配置します。静的アセットは `public/` に置きます。
- 双方に個別の `Dockerfile` があるため、依存関係や環境変数を追加する際は該当するランタイム側を更新してください。

## ビルド・テスト・開発コマンド
- `cd backend && bundle install` — Ruby 依存関係をインストールします。
- `cd backend && bin/rails db:prepare` — API 起動前に SQLite スキーマを準備／マイグレーションします。
- `cd backend && bin/rails server` — `http://localhost:3000` でバックエンドを起動します。
- `cd frontend && npm install` — Node 依存関係をインストールします。
- `cd frontend && npm run dev` — Vite の開発サーバーを起動します（設定済みなら Rails への API コールをプロキシします）。
- `cd frontend && npm run build` — 本番ビルドを生成します。
- `cd frontend && npm run typecheck` — React Router の型生成と TypeScript チェックを実行します。フロントエンド変更をコミットする前に使ってください。

## コーディングスタイルと命名規約
- Ruby: RuboCop の規約に従い、インデントは 2 スペース、ファイル・メソッド・DB カラムは snake_case を使用し、データ取得ヘルパーは `backend/app/models/body_composition/` のようにモデル外へ切り出します。
- TypeScript/React: インデントは 2 スペース、コンポーネントは PascalCase、フックやユーティリティは camelCase を採用し、UI 固有のスタイルはコンポーネント付近に配置します。
- 共有ユーティリティでは戻り値の型を明示し、文字列は将来の多言語対応を見据えて管理します。

## テストガイドライン
- バックエンド: Rails 標準の Minitest を `backend/test/` に配置し（必要に応じてディレクトリを作成）、`bin/rails test` で実行します。開発中は `bin/rails test test/models/...` のように対象を絞ってください。
- フロントエンド: 必要に応じて Vitest/RTL でコンポーネントやルーティングのテストを追加し、ルート構造に合わせて配置します。正式なテスト基盤が整うまでは `npm run typecheck` と `npm run dev` での手動スモークテストを最低ラインとします。

## コミットとプルリクエストの運用
- コミットメッセージは「`Add body composition retriever`」のように短い命令形でまとめ、可能であればバックエンドとフロントエンドの変更を別コミットに分けます。履歴に沿う限り日本語コミットも歓迎です。
- PR には簡潔な概要、テスト結果、UI 変更時のスクリーンショットや動画、関連 Issue のリンクを含めてください。破壊的なマイグレーションがある場合は明記し、依存関係を変えた際は対応する Dockerfile を更新します。
