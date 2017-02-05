# turkish-spellchecker
A spellchecker project for Turkish language using [Hunspell](http://hunspell.github.io/) dictionaries and spell checker. Project kicked by [Codefiction Community](http://github.com/codefiction) while translating [typescript-book](http://github.com/codefiction/typescript-book) to Turkish.

# How to run
```sh
npm install
npm start
```

# How to use?
```ts
// Look for any file with .md extension in the 'path' and exclude node_modules folder.
const fileLoader = new FileLoader(path, /.md$/, ['node_modules']); 
const spellChecker = new SpellChecker();

const checker: SpellCheckerManager = new SpellCheckerManager(fileLoader, spellChecker);

checker.CheckSpelling(); // console logs all the errors found.
```
# What's next
This repository still in progress, and will be converted into an NPM package. Tests are missing, which means still not stable.
