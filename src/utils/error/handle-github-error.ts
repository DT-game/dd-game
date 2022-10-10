import { NextApiResponse } from 'next';
import { InvalidArgumentError } from './invalid-argument-error';

export const handleGithubError = (err: any, res: NextApiResponse) => {
  if (err instanceof InvalidArgumentError) {
    res.status(400).end(err.message);
  } else {
    console.log('ERROR', err.message, err.status);
    res.status(err.status || 500).end(err.message || 'Internal server error');
  }
};
