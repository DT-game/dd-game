import { Branch } from '../interface';

export class BranchNormalizer {
  public static normalize = (data: Branch): object => ({
    ref: data.ref,
    url: data.url,
    object: data.object,
  });
}
