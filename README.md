# (アニメーター、デザイナー向け)Gitを知らなくても使えるGithubワークフロー

## Trelloと同期させて考えるGitflow

### 機能のイメージ(フロー)

1. タスク起票 → branch作成
2. 作品をアップロード → Commit
3. リーダーチェック → develop branchにPull Request
4. チェックOK(タスクをDONEに移動) → Pull Requestをdevelop branchにMerge
5. 監督(クライアント)チェック → master branchにPull Request
6. チェックOK(タスクをDONEに移動) → Pull Requestをmaster branchにMerge
7. 区切りがいいところ(リリースとか) → tag打ち

### 制約

1. 1日1回は最低アップロードしましょう(日報作成のため)

### おまけ機能

1. 終業時にその日のコメントを元に全員の日報を自動的に作成
2. 日報をメールで自動送信
3. Pull Requestが作成されたらScrollViewのWebpack BuildしてHTMLページを作成

### 特徴

* 一連の途中のフローが全てバージョン管理される → どのバージョンにも巻き戻せる
* アクションに対して、Git flow(Gitコマンド相当)が当てはめられる

### できたら
ボタンを押したらスクリプトを実行して、動画をRenderingでして抽出(CI)