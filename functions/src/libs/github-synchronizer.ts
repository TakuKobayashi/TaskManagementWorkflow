import { GithubCommitInfo } from './interfaces/github-commit-info';
import * as Octokit from '@octokit/rest';

export class GithubSynchronizer {
  private octokit: Octokit;
  constructor(accessToken: string) {
    this.octokit = new Octokit({ auth: accessToken });
  }

  async createRepositoryFromUser(repositoryName: string) {
    return this.octokit.repos.createForAuthenticatedUser({ name: repositoryName });
  }

  async createRepositoryInOrg(organizationName: string, repositoryName: string) {
    return this.octokit.repos.createInOrg({ org: organizationName, name: repositoryName });
  }

  async pushFile(uploadFileImfo: GithubCommitInfo) {
    const commitInfo: Octokit.ReposCreateOrUpdateFileParams = {
      owner: uploadFileImfo.ownerName,
      repo: uploadFileImfo.repositoryName,
      path: uploadFileImfo.filePath,
      message: uploadFileImfo.message,
      content: uploadFileImfo.contentBuffer.toString('base64'),
    };
    if (uploadFileImfo.replaceFileSha) {
      commitInfo.sha = uploadFileImfo.replaceFileSha;
    }
    if (uploadFileImfo.branchName) {
      commitInfo.branch = uploadFileImfo.branchName;
    }
    await this.octokit.repos.createOrUpdateFile(commitInfo);
  }
}
