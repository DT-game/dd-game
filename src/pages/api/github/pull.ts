import Joi from 'joi';
import { NextApiRequest, NextApiResponse } from 'next';
import { GithubServiceFactory } from '../../../services'; 
import { handleGithubError, InvalidArgumentError } from '../../../utils';

interface PullRequestData {
  title: string;
  description?: string;
  source: string;
  target?: string;
};

const validatePullRequestData= (data: PullRequestData): void => {
  const schema = Joi.object({
    title: Joi.string().required(),
    source: Joi.string().required(),
    description: Joi.string().optional(),
    target: Joi.string().optional(),
  }).options({ allowUnknown: true });

  const validationResult = schema.validate(data);

  if (validationResult.error) {
    throw new InvalidArgumentError(validationResult.error.message);
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      const data = req.body as PullRequestData;
      validatePullRequestData(data);

      const service = (new GithubServiceFactory).getInstance();
      await service.createPullRequest(data.title, data.description, data.source, data.target);

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
