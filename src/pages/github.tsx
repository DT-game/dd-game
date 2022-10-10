import React from 'react';
import axios from 'axios';

const LoginPage = () => {

  const createBranch = async (e: any) => {
    e.preventDefault();

    try {
      const branchName = e.target.elements.name.value;
      const result = await axios.post(`/api/github/branch`, { name: branchName });
      console.log(result);
    } catch (e) {
      console.log((e as any).response);
    }
    
  }

  const createPullRequest = async (e: any) => {
    e.preventDefault();

    try {
      const source = e.target.elements.branch.value;
      const title = e.target.elements.title.value;
      const result = await axios.post(`/api/github/pull`, { source, title });
      console.log(result);
    } catch (e) {
      console.log((e as any).response);
    }
  }

  const updateAFile = async (e: any) => {
    e.preventDefault();

    try {
      const path = e.target.elements.filepath.value;
      const branch = e.target.elements.branch.value;
      const commit = e.target.elements.message.value;
      const content = Buffer.from((new Date()).toISOString()).toString('base64');
      const result = await axios.put(`/api/github/file`, { commit, content }, { params: { path, branch } });
      console.log(result);
    } catch (e) {
      console.log((e as any).response);
    }
  }

  return (
    <div>
      <div>
        <h2>Create branch</h2>
        <form onSubmit={e => createBranch(e)}>
          <div>
            <label>
              Branch name
              <input name="name" />
            </label>
          </div>
          <button>Create branch</button>
        </form>
      </div>

      <div>
        <h2>Create pull request</h2>
        <form onSubmit={e => createPullRequest(e)}>
          <div>
            <label>
              Branch to merge
              <input name="branch" />
            </label>
          </div>
          <div>
            <label>
              PR title
              <input name="title" />
            </label>
          </div>
          <button>Create PR</button>
        </form>
      </div>

      <div>
        <h2>Change a file</h2>
        <form onSubmit={e => updateAFile(e)}>
          <div>
            <label>
              File path
              <input name="filepath" />
            </label>
          </div>
          <div>
            <label>
              Branch name
              <input name="branch" />
            </label>
          </div>
          <div>
            <label>
              Commit message
              <input name="message" />
            </label>
          </div>
          <button>Change a file</button>
        </form>
      </div>
    </div>
  )
};

export default LoginPage;