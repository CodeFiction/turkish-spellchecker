import { FileLoader, SpellChecker, SpellCheckerManager } from './lib';

const fileLoader =
  new FileLoader('/Users/mert.susur/dev/msusur/typescript-book');
const spellChecker = new SpellChecker();
const checker: SpellCheckerManager =
  new SpellCheckerManager(fileLoader, spellChecker);

checker.CheckSpelling();

// fileLoader.loadFiles().then((file, fileContent) => {
//   //let spellResult = spellChecker.spellCheck(file, fileContent);
//   console.log(spellResult);
// });

// var nodehun = require('nodehun'),
//   fs = require('fs'),
//   path = require('path'),
//   recursiveReadDir = require('recursive-readdir'),
//   affBuf = fs.readFileSync(__dirname + '/lib/dictionaries/tr.aff'),
//   dicBuf = fs.readFileSync(__dirname + '/lib/dictionaries/tr.dic'),
//   dictionary = new nodehun(affBuf, dicBuf);


// var readFiles = function (fileName, idx) {
//   if (path.extname(fileName) === ".md") {
//     fs.readFile(fileName, 'utf8', function (err, data) {
//       var words = data.split(/\S+/gi);
//       words.map(function (word, idx) {
//         dictionary.isCorrect(word, function (err, correct, origWord) {
//           if (!correct) {
//             console.log(`Satir No: ${idx} - ${word} - ${fileName}`);
//           }
//         });
//       });
//     });
//   }
// }

// recursiveReadDir(__dirname, function (err, files) {
//   files.map(readFiles);
// });


// // console.log(glossaryContent);

