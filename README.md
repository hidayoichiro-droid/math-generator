# 算数問題ジェネレーター — デプロイ手順

## 📱 iPhoneで使うには（GitHub Pages + PWA）

### Step 1: GitHubにリポジトリを作成
1. https://github.com にログイン
2. 右上「+」→「New repository」
3. Repository name: `math-generator`（または任意の名前）
4. Public を選択 → 「Create repository」

### Step 2: ファイルをアップロード
1. 作成したリポジトリのページで「uploading an existing file」をクリック
2. このZIPを解凍したフォルダ内の**全ファイル・フォルダ**をドラッグ&ドロップ
3. 「Commit changes」をクリック

### Step 3: GitHub Pages を有効化
1. リポジトリの「Settings」タブ
2. 左メニュー「Pages」
3. Source: 「Deploy from a branch」
4. Branch: `main` / `(root)` → 「Save」
5. 数分後に `https://YOUR_USERNAME.github.io/math-generator/` でアクセス可能に

### Step 4: iPhoneのホーム画面に追加（アプリ化）
1. iPhoneのSafariで上のURLを開く
2. 下の共有ボタン（□↑）をタップ
3. 「ホーム画面に追加」→「追加」
4. ホーム画面にアプリアイコンが追加される！

---

## 💼 Microsoft Teamsで使うには

### Step 1: URLを teams-app/manifest.json に設定
`teams-app/manifest.json` をテキストエディタで開き、
**3箇所**の `YOUR_USERNAME` と `YOUR_REPO` を実際の値に置き換える：

```
https://YOUR_USERNAME.github.io/YOUR_REPO
↓ 例:
https://yamada.github.io/math-generator
```

`validDomains` も同様に `yamada.github.io` に変更。

### Step 2: Teams用ZIPを作成
`teams-app` フォルダ内の3ファイルをZIP圧縮：
- `manifest.json`
- `color.png`
- `outline.png`

※ フォルダごとではなく、ファイル3つを直接ZIP化すること

### Step 3: Teamsにインストール
**管理者権限がある場合:**
1. Teams管理センター (https://admin.teams.microsoft.com) にログイン
2. 「Teams アプリ」→「アプリを管理」→「アップロード」
3. 作成したZIPをアップロード

**サイドロード（個人利用）の場合:**
1. Teamsを開く
2. 左メニュー「アプリ」→「アプリを管理」
3. 「カスタムアプリをアップロード」→ ZIPを選択

### Step 4: Teamsで使う
1. Teams左メニューの「...（その他のアプリ）」
2. 「算数ジェネレーター」を検索してクリック
3. iPhoneのTeamsアプリからも同様に使える

---

## 🖨️ iPhoneからの印刷
- SafariまたはTeams上で「🖨️ 印刷」ボタンをタップ
- AirPrint対応プリンターが自動で表示される
- A4サイズで印刷

## 💾 問題の保存
- 「💾 保存」ボタンでHTMLファイルとしてダウンロード
- PCで開いてPDF化も可能
