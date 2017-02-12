import * as checker from 'hunspell-spellchecker';
import { readFileSync } from 'fs';
import { FileContent, IgnoredCheckResult, SpellCheckResult } from './models';

export class SpellChecker {
  private internalChecker: checker;
  private affBuf: Buffer;
  private dicBuf: Buffer;

  constructor() {
    this.affBuf = readFileSync(__dirname + '/dictionaries/tr.aff');
    this.dicBuf = readFileSync(__dirname + '/dictionaries/tr.dic');

    this.internalChecker = new checker();

    const dictionary = this.internalChecker.parse({
      aff: this.affBuf,
      dic: this.dicBuf
    });

    this.internalChecker.use(dictionary);
  }

  public spellChecker(fileContent: FileContent): SpellCheckResult {
    const content: string = fileContent.content.toString();
    if (content.match(/\[ignore\]\:/)) {
      return new IgnoredCheckResult(fileContent.name);
    }

    var words: RegExpMatchArray = content.match(/\S+/gi);

    const spellResult: SpellCheckResult =
      new SpellCheckResult(fileContent.name);

    words.forEach((word: string, index: number) => {
      let isCorrect = this.internalChecker.check(word);
      if (!isCorrect) {
        spellResult.words.push(word);
      }
    });

    return spellResult;
  }
}