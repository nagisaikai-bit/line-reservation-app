# LINEミニアプリ 予約受付Webアプリ

LINEミニアプリ向けの予約受付フォームです。Next.js + TypeScriptで構築し、スマホ最適化済みです。

## 機能

- 予約フォーム（お名前・電話番号・希望日・希望時間・備考）
- バリデーション（必須チェック・電話番号形式チェック）
- 予約一覧表示
- スマートフォン最適化デザイン

## 技術スタック

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS

## セットアップ

```bash
# 依存パッケージのインストール
npm install

# 開発サーバーの起動
npm run dev
```

ブラウザで http://localhost:3000 を開いてください。

## フォルダ構成

```
line-reservation-app/
├── app/
│   ├── page.tsx              # メインページ
│   ├── layout.tsx            # レイアウト
│   └── globals.css           # グローバルCSS
├── components/
│   ├── ReservationForm.tsx   # 予約フォーム
│   └── ReservationList.tsx   # 予約一覧
├── types/
│   └── reservation.ts        # 型定義
└── README.md
```

## 今後の拡張予定

- Vercelへのデプロイ
- LINE Developers連携
- データベース保存（Supabase等）
