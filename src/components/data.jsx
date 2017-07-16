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

export const buildTableData = function(key) {
    const value = json[key];
    const missing = value[1] - value[0]
    const coverage = getCoverage(value[1], missing)
    const path = getPath(key)

    totalCoverage.statements += value[1]
    totalCoverage.missing += value[0]
    
    return {
        'path': path,
        'name': key,
        'tests': value[0],
        'statements': value[1],
        'missing': missing,
        'coverage': coverage,
    }
}

export default React.createClass({
  render: function() {
    const itemArr = []

    for(let key in json) {
        itemArr.push(buildTableData(key));
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