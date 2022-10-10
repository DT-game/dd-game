import { Commit } from './commit';

export interface Branch {
  ref: string;
  url: string;
  object: Commit;
};
