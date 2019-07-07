import React from 'react';

import EquipListItem from './EquipListItem';

export default class EquipList extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='row'>
				{this.renderEquipListItems()}
			</div>
		);
	}

	renderEquipListItems() {
		let values = Object.values(this.props.equipment);

		let equipListItems = values.map(value => {
			return (
				<div className='col-md-3 col-sm-4' key={value.id}>
					<EquipListItem equipItem={value} selectEquip={this.props.selectEquip} />
				</div>
			);
		});

		return equipListItems;
	}
}
