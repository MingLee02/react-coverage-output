import React from 'react';
import json from '../data/test.json';
import Table from './table';


const totalCoverage = {
    'statements': 0,
    'missing': 0,
    'coverage': 0
}

export const getCoverage = function(statements=0, tests=0) {
    if (!isNaN(statements) && !isNaN(tests)) {
        return 100 - (tests / statements * 100).toFixed(2) + '%';
    } else {
        return 0 + '%';
    }
};

/**
 * Detects if a string has '/'
 * @param {String} 'utils/file.java' 
 * @return {String} 'utils'
 */
export const getPath = function(key="") {
    if (key.charAt(0) === '/') {
        key = key.substring(1)
    }
    return key.substring(0, key.indexOf('/'));
}

export const buildTableData = function(key, table='parent', childsParent={}) {
    const value = json[key];
    const missing = value[1] - value[0];
    const coverage = getCoverage(value[1], missing);
    const path = getPath(key);

    if (table === 'child') {
        key = key.substring(key.indexOf("/") + 1);
    }
    childsParent.statements = childsParent.statements + value[1];
    childsParent.missing = childsParent.missing + missing;
    childsParent.coverage = getCoverage(childsParent.statements, childsParent.missing);
    return {
        'path': path || '',
        'name': key,
        'tests': value[0],
        'statements': value[1],
        'missing': missing,
        'coverage': coverage,
    }
}

export const getTimesInArray = function(array, name) {
    return array.reduce(function(counter , item) {
        if(item.path === name) {
           counter++;
        }
        return counter;
    },0);
}

export default React.createClass({
  render: function() {
    const itemArr = []

    for(let key in json) {
        const path = getPath(key);
        if (path.length > 0) {
            var childArr = []

            const numInArray = getTimesInArray(itemArr, path);
            
            if (numInArray === 0) {
                var parentRow = {
                    'path': path,
                    'name': path,
                    'children': childArr,
                    'statements': 0,
                    'missing': 0,
                    'coverage': 0
                }
                itemArr.push(parentRow)
                for(var key in json) {
                    if(key.indexOf(path) !== -1) {
                        childArr.push(buildTableData(key, 'child', parentRow))
                    }
                }
                childArr = []
            }
        } else {
            itemArr.push(buildTableData(key));
        }
        const value = json[key];
        totalCoverage.statements += value[1]
        totalCoverage.missing += value[0]
        totalCoverage.coverage = getCoverage(totalCoverage.statements, totalCoverage.missing);
    }

    return (
        <div>
            <h1>Coverage Report</h1>
            <div>
                <h2>Total</h2> 
                <p><strong>Lines of Code:</strong> {totalCoverage.statements}</p>
                <p><strong>Missing:</strong> {totalCoverage.missing}</p>
                <p><strong>Coverage:</strong> {totalCoverage.coverage}</p>
            </div>
            <Table data={itemArr} />
        </div>
    );
  }
});