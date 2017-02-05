import 'rxjs';

import { Observable } from 'rxjs/Observable';
import { FileLoader, SpellChecker } from './index';
import { FileContent, SpellCheckResult } from './models';

export class SpellCheckerManager {

  constructor(private fileLoader: FileLoader,
    private spellChecker: SpellChecker) { }

  public CheckSpelling(): void {
    let files$: Observable<FileContent> = this.fileLoader.loadFiles();

    files$.subscribe((file: FileContent) => {

      let spellResult: SpellCheckResult = this.spellChecker.spellChecker(file);
      if (spellResult.words && spellResult.words.length > 0) {
        console.log(`${spellResult.words.length} error(s) found on file '${spellResult.fileName}'.`);
        spellResult.words.forEach((word: string) => {
          console.log(`Word: '${word}'.`);
        });
      } else {
        // console.log(`No error found or skipped file:
        //               '${spellResult.fileName}'.`);
      }

    });
  }
}
