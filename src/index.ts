import { ConsoleLogger, FileLoader, SpellChecker, SpellCheckerManager } from './lib';

const path: string = '/Users/mert.susur/dev/msusur/typescript-book';

const fileLoader = new FileLoader(path, /GLOSSARY.md$/, ['node_modules']);
const spellChecker = new SpellChecker();
const consoleLogger = new ConsoleLogger();
const checker: SpellCheckerManager =
  new SpellCheckerManager(fileLoader, spellChecker, consoleLogger);

checker.CheckSpelling();