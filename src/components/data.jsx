import React from 'react';
import json from '../data/test.json';
import Table from './table';

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
        key = key.substring(1);
    }
    return key.substring(0, key.indexOf('/'));
};

const aggregateParentsData = function (object, missing, value) {
    object.statements = object.statements + value;
    object.missing = object.missing + missing;
    object.coverage = getCoverage(object.statements, missing);
};

export const buildTableData = function(key, table='parent', childsParent={}) {
    const value = json[key];
    const missing = value[1] - value[0];
    const coverage = getCoverage(value[1], missing);
    const path = getPath(key);

    if (table === 'child') {
        key = key.substring(key.indexOf("/") + 1);
        aggregateParentsData(childsParent, missing, value[1])
    }
    
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

let childArr = [];
const tableData = [];


export const buildTableEntriesWithChild = function (path) {
    var parentRow = {
        'path': path,
        'name': path,
        'children': childArr,
        'statements': 0,
        'missing': 0,
        'coverage': 0
    }
    tableData.push(parentRow)
    for(var key in json) {
        if(key.indexOf(path) !== -1) {
            childArr.push(buildTableData(key, 'child', parentRow))
        }
    }
    childArr = []
}

export default React.createClass({
  render: function() {
   
    for(let key in json) {
        const path = getPath(key);
        if (path.length > 0) {
            
            const numInArray = getTimesInArray(tableData, path);
            
            if (numInArray === 0) {
                buildTableEntriesWithChild(path);
            }
        } else {
            tableData.push(buildTableData(key));
        }
    }
    return (
        <div>
            <h1>Coverage Report</h1>
            <Table data={tableData} />
        </div>
    );
  }
});