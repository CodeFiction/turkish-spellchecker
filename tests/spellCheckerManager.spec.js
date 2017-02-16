const chai = require('chai'),
    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),
    spellChecker = require('../bin/lib/spellCheckerManager'),
    fc = require('../bin/lib/models/FileContent'),
    scr = require('../bin/lib/models/SpellCheckResult'),
    rxjs = require('rxjs');

chai.should();
chai.use(sinonChai);

describe('spellCheckerManager', () => {
    describe('CheckSpelling', () => {
        let fileLoaderMock, spellCheckerMock, loggerMock;

        beforeEach(() => {
            fileLoaderMock = {
                loadFiles: sinon.stub()
            };
            spellCheckerMock = {
                spellChecker: sinon.stub()
            };
            loggerMock = {
                error: sinon.stub(),
                info: sinon.stub()
            };
        });

        it('should load observable from fileloader', () => {
            const file = new fc.FileContent('foo.md', 'some content');
            const file$ = new rxjs.Observable.of(file);
            fileLoaderMock.loadFiles.withArgs().returns(file$);

            const spellCheckerResult = new scr.IgnoredCheckResult('foo.md');
            spellCheckerMock.spellChecker.withArgs(file).returns(
                spellCheckerResult
            );

            var checker = new spellChecker.SpellCheckerManager(fileLoaderMock, spellCheckerMock, loggerMock);
            checker.CheckSpelling();

            expect(fileLoaderMock.loadFiles.should.have.been.called);
        });

        it('should log errors if there is a spell error on any file', () => {
            const file = new fc.FileContent('foo.md', 'some content');
            const file$ = new rxjs.Observable.of(file);
            fileLoaderMock.loadFiles.withArgs().returns(file$);

            const spellCheckerResult = new scr.SpellCheckResult('foo.md');
            spellCheckerResult.words.push('wrong-word');
            spellCheckerMock.spellChecker.withArgs(file).returns(
                spellCheckerResult
            );

            var checker = new spellChecker.SpellCheckerManager(fileLoaderMock, spellCheckerMock, loggerMock);
            checker.CheckSpelling();

            expect(loggerMock.error.should.have.been.called.twice);
            expect(loggerMock.error.should.have.been.calledWith(`1 error(s) found on file 'foo.md'.`));
            expect(loggerMock.error.should.have.been.calledWith(`Word: 'wrong-word'.`));
        });

        it('should log skipped files if there are no errors found', () => {
            const file = new fc.FileContent('foo.md', 'some content');
            const file$ = new rxjs.Observable.of(file);
            fileLoaderMock.loadFiles.withArgs().returns(file$);

            const spellCheckerResult = new scr.SpellCheckResult('foo.md');
            spellCheckerMock.spellChecker.withArgs(file).returns(
                spellCheckerResult
            );

            var checker = new spellChecker.SpellCheckerManager(fileLoaderMock, spellCheckerMock, loggerMock);
            checker.CheckSpelling();

            expect(loggerMock.info.should.have.been.called);
            expect(loggerMock.info.should.have.been.calledWith(`No error found or skipped file: 'foo.md'.`));
        });

        it('should log skipped files if the file is ignored', () => {
            const file = new fc.FileContent('foo.md', 'some content');
            const file$ = new rxjs.Observable.of(file);
            fileLoaderMock.loadFiles.withArgs().returns(file$);

            const spellCheckerResult = new scr.IgnoredCheckResult('foo.md');
            spellCheckerMock.spellChecker.withArgs(file).returns(
                spellCheckerResult
            );

            var checker = new spellChecker.SpellCheckerManager(fileLoaderMock, spellCheckerMock, loggerMock);
            checker.CheckSpelling();

            expect(loggerMock.info.should.have.been.called);
            expect(loggerMock.info.should.have.been.calledWith(`No error found or skipped file: 'foo.md'.`));
        });


    });
});