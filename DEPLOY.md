# 公開手順（GitHub Pages）

このフォルダ（`quiz-site`）が**公開するサイト本体**です。
中身は安全な公開用ファイルだけ（HTML と 曲データ js）。**秘密鍵やスクリプトは含まれていません。**

すでにローカルGitリポジトリとして初期化・コミット済みです。あとは GitHub に上げるだけです。

## 朝やること（5分・コピペでOK）

### 1. GitHub で空のリポジトリを作る
- https://github.com/new を開く
- Repository name：`haropro-intro-quiz`（任意）
- **Public** を選択
- 「Add a README」などは**チェックしない**（空のまま）
- 「Create repository」

### 2. このフォルダから push する
PowerShell でこのフォルダ（`quiz-site`）に移動して、以下を実行（`<あなたのユーザー名>` を置き換え）：

```powershell
cd "C:\Users\Jiro Hirata\game_project\quiz-site"
git remote add origin https://github.com/<あなたのユーザー名>/haropro-intro-quiz.git
git branch -M main
git push -u origin main
```
※ 初回は GitHub のログイン（ブラウザ認証 or トークン）を求められます。画面の指示に従ってください。

### 3. GitHub Pages を有効化
- リポジトリの **Settings → Pages**
- **Source**：`Deploy from a branch`
- **Branch**：`main` / `/ (root)` を選んで **Save**

### 4. 数分待つと公開URLが表示される
```
https://<あなたのユーザー名>.github.io/haropro-intro-quiz/
```
このURLを友だちに送れば、スマホですぐ遊べます🎉

---

## 曲を増やした/直した後の更新方法
親フォルダ（`game_project`）で `node build_groups.js` などを実行して曲データを更新したら、
新しい `songs-*.js` をこの `quiz-site` にコピーして、以下で更新を反映：

```powershell
cd "C:\Users\Jiro Hirata\game_project\quiz-site"
git add -A
git commit -m "曲を更新"
git push
```

## ファイル構成
- `index.html` … トップ（グループ選択）
- `quiz.html` … クイズ本体（`?group=jj/mm/ag/tf`）
- `songs-jj.js` / `songs-mm.js` / `songs-ag.js` / `songs-tf.js` … 各グループの曲データ
