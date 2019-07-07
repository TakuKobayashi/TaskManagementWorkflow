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


## 技術的なTipsメモ

### Asana APIのWebhook

### AWS API Gatewayで受け取ったヘッダーとかをLambdaに流す

マッピングテンプレートの `
Content-Type` の設定に `application/json` を追加し、マッピングテンプレートに以下の内容を追記する。

```
{
    "method": "$context.httpMethod",
    "body" : $input.json('$'),
    "headers": {
        #foreach($param in $input.params().header.keySet())
        "$param": "$util.escapeJavaScript($input.params().header.get($param))"
        #if($foreach.hasNext),#end
        #end
    }
}
```

こうすることで、LambdaにHeaderの値を受け渡すことができる。

【参考】
* [カスタムの Lambda 統合を使用して、どのように Amazon API Gateway から AWS Lambda 関数にカスタムヘッダーを渡して処理することができますか?
](https://aws.amazon.com/jp/premiumsupport/knowledge-center/custom-headers-api-gateway-lambda/)