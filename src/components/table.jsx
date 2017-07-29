import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class Table extends React.Component {
    constructor(props) {
        super(props);
    }
    isExpandableRow(row) {
        if (row.children) {
            return true;
        } else {
            return false;
        }
    }
    expandComponent(row) {
        return (
            <BootstrapTable data={row.children} >
                <TableHeaderColumn isKey dataField='name' dataSort={ true }>File Name</TableHeaderColumn>
                <TableHeaderColumn dataField='statements' dataSort={ true }>Lines of Code</TableHeaderColumn>
                <TableHeaderColumn dataField='missing' dataSort={ true }>Missing</TableHeaderColumn>
                <TableHeaderColumn dataField='coverage' dataSort={ true }>Coverage</TableHeaderColumn>
            </BootstrapTable>
        );  
    }
    render() {
        return (
            <BootstrapTable data={this.props.data} hover pagination search
            expandableRow={ this.isExpandableRow } expandComponent={ this.expandComponent }>
                <TableHeaderColumn isKey dataField='name' dataSort={ true }>File Name</TableHeaderColumn>
                <TableHeaderColumn dataField='statements' dataSort={ true }>Lines of Code</TableHeaderColumn>
                <TableHeaderColumn dataField='missing' dataSort={ true }>Missing</TableHeaderColumn>
                <TableHeaderColumn dataField='coverage' dataSort={ true }>Coverage</TableHeaderColumn>
            </BootstrapTable>
        );
    }
}
export default Table;