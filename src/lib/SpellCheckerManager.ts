import 'rxjs';

import { Observable } from 'rxjs/Observable';
import { FileLoader, SpellChecker } from './index';
import { FileContent, SpellCheckResult } from './models';

export class SpellCheckerManager {

  constructor(private fileLoader: FileLoader,
    private spellChecker: SpellChecker) { }

  public CheckSpelling(): void {
    let files$: Observable<FileContent[]> = this.fileLoader.loadFiles();

    files$.subscribe((files: FileContent[]) => {
      files.map((file: FileContent) => {
        let spellResult: SpellCheckResult =
          this.spellChecker.spellChecker(file);

        console.log(`+ ${spellResult.word} on file
          ${file}( at line ${spellResult.lineNumber}).`);
      });
    });
  }
}
