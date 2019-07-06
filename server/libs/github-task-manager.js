const Octokit = require('@octokit/rest')

//TODO あとでTypeScriptで書き直す
export class GithubManager {
  constructor(accessToken){
    this.octokit = new Octokit({auth: accessToken});
  }

  async createRepositoryFromUser(repositoryName){
    return this.octokit.repos.createForAuthenticatedUser({name: repositoryName})
  }

  async createRepositoryInOrg(organizationName, repositoryName){
    return this.octokit.repos.createInOrg({org: organizationName, name: repositoryName})
  }

  
}