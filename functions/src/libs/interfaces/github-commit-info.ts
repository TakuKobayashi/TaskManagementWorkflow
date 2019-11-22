export interface GithubCommitInfo {
  ownerName: string; //リポジトリのオーナーの名前,
  repositoryName: string; //リポジトリ名,
  filePath: string; //ファイルをアップロードする場所(root/...の形でパスを指定)
  message: string; //コミットメッセージ
  contentBuffer: Buffer; //アップロードするファイルのBuffer,
  replaceFileSha: string; //上書きしたいファイルのSha
  branchName: string; //アップロードしたいBranchの名前
}
