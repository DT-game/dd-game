import { File } from '../interface';

export class FileNormalizer {
  public static normalize = (data: File): object => ({
    sha: data.sha,
    content: data.content,
    name: data.name,
    path: data.path,
  });
}
