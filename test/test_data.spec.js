import {expect} from 'chai';
import {getCoverage, getPath, buildTableData, getTimesInArray, buildTableEntriesWithChild} from '../src/components/data';

describe('data', () => {
    describe('getCoverage', () => {
        it('returns coverage', () => {
            const coverage = getCoverage(10, 5);
            const expectedAnswer = 50 + '%'
            expect(coverage).to.equal(expectedAnswer);
        })
        it('returns 0 if string is passed', () => {
            const coverage = getCoverage('e', 5);
            const expectedAnswer = 0 + '%'
            expect(coverage).to.equal(expectedAnswer);
        })
        it('returns 0 if nothing is passed', () => {
            const coverage = getCoverage('e', 5);
            const expectedAnswer = 0 + '%'
            expect(coverage).to.equal(expectedAnswer);
        })
    })
    describe('getPath', () => {
        it('returns path', () => {
            const path = getPath('utils/file.java');
            const expectedAnswer = 'utils'
            expect(path).to.equal(expectedAnswer);
        })
        it('returns an empty string', () => {
            const path = getPath('file.java');
            const expectedAnswer = ''
            expect(path).to.equal(expectedAnswer);
        })
        it('returns path when when there is a / at the start', () => {
            const path = getPath('/utils/file.java');
            const expectedAnswer = 'utils'
            expect(path).to.equal(expectedAnswer);
        })
    })
    describe('buildTableData', () => {
        const data = {"Main.java": [0, 10]}
        it('returns an object', () => {
            let object;
            for(let key in data) {
                object = buildTableData(key)
            }
            expect(object).to.be.an('object').to.have.property('name', 'Main.java')
        })
    })
    describe('getTimesInArray', () => {
        const data = [
            {'path': 'grapes'},
            {'path': 'bananas'},
            {'path': 'pears'},
        ]
        it('returns 1', () => {
            const result = getTimesInArray(data, 'grapes')
            expect(result).to.equal(1);
        })
        it('returns 0', () => {
            const result = getTimesInArray(data, 'apples')
            expect(result).to.equal(0);
        })
    })
    describe('buildTableEntriesWithChild', () => {
        it('correctly calculates the parent directorys statements', () => {
            const data = {
                "utils/Copy.java ": [15, 37],
                "utils/Paste.java ": [14, 14],
                "utils/nums/Add.java ": [9, 22],
            }
            const path = getPath('/utils/file.java');
            const result = buildTableEntriesWithChild(path, data)
            expect(result.statements).to.equal(73);
        })
    })
})