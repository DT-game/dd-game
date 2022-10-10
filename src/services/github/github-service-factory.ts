import { getGithubClient } from './github-client';
import { GithubService } from './github-service';

export class GithubServiceFactory {
  private _instance: GithubService | null;

  constructor() {
    this._instance = null;
  }

  public getInstance = () => {
    if (!this._instance) {
      this._instance = new GithubService(getGithubClient());
    }
    return this._instance;
  }
}
