import React from 'react';

import EquipSearch from './EquipSearch';
import EquipList from './EquipList';

export default class EquipSelection extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<div className='row'>
					<div className='col-4 col-offset-4'>
						<EquipSearch />
					</div>
				</div>
				<EquipList equipment={this.props.equipment} selectEquip={this.props.selectEquip} />
			</div>
		);
	}
}
