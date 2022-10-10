import Joi from 'joi';
import { NextApiRequest, NextApiResponse } from 'next';
import { GithubServiceFactory } from '../../../services'; 
import { handleGithubError, InvalidArgumentError } from '../../../utils';

interface BranchData {
  name: string;
};

const validateBranchData= (data: BranchData): void => {
  const schema = Joi.object({
    name: Joi.string().required(),
  }).options({ allowUnknown: true });

  const validationResult = schema.validate(data);

  if (validationResult.error) {
    throw new InvalidArgumentError(validationResult.error.message);
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      const data = req.body as BranchData;
      validateBranchData(data);

      const service = (new GithubServiceFactory).getInstance();
      await service.createBranch(data.name);

      res.status(201).end();
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
