import { Octokit } from 'octokit';
import getConfig from 'next/config';
import { Branch, File } from './interface';

const { serverRuntimeConfig } = getConfig();

export class GithubService {
  MASTER_BRANCH_NAME = serverRuntimeConfig.githubMasterBranch;
  GITID = {
    owner: serverRuntimeConfig.githubOwner,
    repo: serverRuntimeConfig.githubRepo,
  };
  OWNER_EMAIL = serverRuntimeConfig.githubEmail;
  // TODO - special account for changes? with setup permissions?


  constructor(
    private readonly client: Octokit,
  ) {}

  getBranches = async () => {
    const branches = await this.client.request("GET /repos/{owner}/{repo}/git/refs/heads", {
      ...this.GITID,
    });

    return branches.data as Branch[];
  }

  createBranch = async (branchName: string) => {
    const sha = await this.getMasterSha();

    await this.client.request('POST /repos/{owner}/{repo}/git/refs', {
      ...this.GITID,
      ref: `refs/heads/${branchName}`,
      sha,
    });
  }

  createPullRequest = async (
    title: string,
    description: string | undefined,
    sourceBranch: string,
    targetBranch: string = this.MASTER_BRANCH_NAME,
  ) => {
    await this.client.request('POST /repos/{owner}/{repo}/pulls', {
      ...this.GITID,
      title,
      body: description,
      head: `${this.GITID.owner}:${sourceBranch}`,
      base: targetBranch,
    });
  }

  getFile = async (pathToFile: string, branchName: string) => {
    const file = await this.client.request("GET /repos/{owner}/{repo}/contents/{path}", {
      ...this.GITID,
      path: pathToFile,
      ref: `refs/heads/${branchName}`,
    });
    return file.data as File;
  }

  updateAFile = async (pathToFile: string, branchName: string, commitMessage: string, fileContent: string) => {
    let sha = undefined;

    try {
      const file = await this.getFile(pathToFile, branchName);
      sha = file.sha;
    } catch (e) {
      if (e.status !== 404) throw e;
    }
    
    await this.client.request('PUT /repos/{owner}/{repo}/contents/{path}', {
      ...this.GITID,
      path: pathToFile,
      message: commitMessage,
      committer: {
        name: this.GITID.owner,
        email: this.OWNER_EMAIL,
      },
      content: fileContent,
      branch: branchName,
      sha,
    });
  }

  private getMasterSha = async () => {
    const branches = await this.getBranches();
    return branches.find((item: any) => item.ref === `refs/heads/${this.MASTER_BRANCH_NAME}`)?.object.sha || '';
  }
}
