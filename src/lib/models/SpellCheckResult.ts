export class SpellCheckResult {
  public words: string[];

  constructor(public fileName: string) {
    this.words = [];
  }
}

export class IgnoredCheckResult extends SpellCheckResult {
  constructor(fileName: string) {
    super(fileName);
  }
}