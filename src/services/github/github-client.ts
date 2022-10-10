import getConfig from 'next/config';
import { Octokit } from 'octokit';

const { serverRuntimeConfig } = getConfig();

export const getGithubClient = () => new Octokit({
  auth: serverRuntimeConfig.githubToken,
});
