/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  serverRuntimeConfig: {
    githubToken: process.env.GITHUB_TOKEN,
    githubRepo: process.env.GITHUB_REPO,
    githubOwner: process.env.GITHUB_OWNER,
    githubEmail: process.env.GITHUB_EMAIL,
    githubMasterBranch: process.env.GITHUB_MASTER_BRANCH,
  },
  publicRuntimeConfig: {
    githubMasterBranch: process.env.GITHUB_MASTER_BRANCH,
  },
}

module.exports = nextConfig
