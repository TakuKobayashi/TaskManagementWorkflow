const Octokit = require('@octokit/rest')

//TODO あとでTypeScriptで書き直す
exports.GithubSynchronizer = class GithubSynchronizer {
  constructor(accessToken){
    this.octokit = new Octokit({auth: accessToken});
  }

  async createRepositoryFromUser(repositoryName){
    return this.octokit.repos.createForAuthenticatedUser({name: repositoryName})
  }

  async createRepositoryInOrg(organizationName, repositoryName){
    return this.octokit.repos.createInOrg({org: organizationName, name: repositoryName})
  }

  /*
    commitInfo: {
      ownerName: リポジトリのオーナーの名前,
      repositoryName: リポジトリ名,
      filePath: ファイルをアップロードする場所(root/...の形でパスを指定)
      message: コミットメッセージ
      contentBuffer: アップロードするファイルのBuffer,
      replaceFileSha: 上書きしたいファイルのSha
      branchName: アップロードしたいBranchの名前
    }
  */
  async pushFile(uploadFileImfo = {}){
    const commitInfo = {
      owner: uploadFileImfo.ownerName,
      repo: uploadFileImfo.repositoryName,
      path: uploadFileImfo.filePath,
      message: uploadFileImfo.message,
      content: uploadFileImfo.contentBuffer.toString('base64'),
    }
    if(uploadFileImfo.replaceFileSha){
      commitInfo.sha = uploadFileImfo.replaceFileSha;
    }
    if(uploadFileImfo.branchName){
      commitInfo.branch = uploadFileImfo.branchName;
    }
    await this.octokit.repos.createOrUpdateFile(commitInfo)
  }
}