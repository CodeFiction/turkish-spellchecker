import { readFile } from 'fs';
import { extname } from 'path';
import { Observable } from 'rxjs/Observable';
import { FileContent } from './models';
import * as dir from 'node-dir';

import 'rxjs';

export class FileLoader {

  constructor(private rootFolder: string,
    private matchingFiles: RegExp | string[],
    private excludeFiles: RegExp | string[]) {
  }

  public loadFiles(): Observable<FileContent> {
    return Observable.create((observer) => {
      dir.readFiles(this.rootFolder, {
        match: this.matchingFiles,
        exclude: this.excludeFiles
      },
        (e: any, content: string | Buffer, filename, next) => {
          if (e) {
            observer.onError(e);
          } else {
            let fileContent = new FileContent();
            fileContent.Content = content;
            fileContent.Name = filename;

            observer.next(fileContent);
            next();
          }
        });
    });
  }
}