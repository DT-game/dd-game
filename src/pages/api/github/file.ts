import Joi from 'joi';
import { NextApiRequest, NextApiResponse } from 'next';
import { FileNormalizer, GithubServiceFactory } from '../../../services'; 
import { handleGithubError, InvalidArgumentError } from '../../../utils';

interface FileData {
  commit: string;
  content: string;
};

const validateFileQuery = (path: string, branch: string): void => {
  const schema = Joi.object({
    path: Joi.string().required(),
    branch: Joi.string().required(),
  }).options({ allowUnknown: true });

  const validationResult = schema.validate({
    path,
    branch,
  });

  if (validationResult.error) {
    throw new InvalidArgumentError(validationResult.error.message);
  }
};

const validateFileData= (data: FileData): void => {
  const schema = Joi.object({
    commit: Joi.string().required(),
    content: Joi.string().base64().required(),
  }).options({ allowUnknown: true });

  const validationResult = schema.validate(data);

  if (validationResult.error) {
    throw new InvalidArgumentError(validationResult.error.message);
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      const path = req.query.path as string;
      const branch = req.query.branch as string;

      validateFileQuery(path, branch);

      const service = (new GithubServiceFactory).getInstance();
      const result = await service.getFile(path, branch);
      res.status(200).json({ data: FileNormalizer.normalize(result) });

    } else if (req.method === 'PUT') {
      const path = req.query.path as string;
      const branch = req.query.branch as string;
      const data = req.body as FileData;

      validateFileQuery(path, branch);
      validateFileData(data);

      const service = (new GithubServiceFactory).getInstance();
      await service.updateAFile(path, branch, data.commit, data.content);

      res.status(200).end();

    } else if (req.method === 'OPTIONS') {
      res.status(200).end();
    } else {
      res.status(405).end('Method not allowed');
    }
  } catch (err: any) {
    handleGithubError(err, res);
  }
};

export default handler;
