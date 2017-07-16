import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class Table extends React.Component {
  render() {
	return (
		<BootstrapTable data={this.props.data} hover pagination search>
			<TableHeaderColumn isKey dataField='name'>File Name</TableHeaderColumn>
			<TableHeaderColumn dataField='statements'>Lines of Code</TableHeaderColumn>
			<TableHeaderColumn dataField='missing'>Missing</TableHeaderColumn>
			<TableHeaderColumn dataField='coverage'>Coverage</TableHeaderColumn>
		</BootstrapTable>
	);
  }
}
export default Table;