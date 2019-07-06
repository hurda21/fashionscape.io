import React from 'react';

import EquipSlot from './EquipSlot';

export default class EquipLayout extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>{this.renderEquipSlots()}</div>
		);
	}

	renderEquipSlots() {
		let equipment = Object.entries(this.props.equipment).map((entry) => {
			return <EquipSlot key={entry[0]} equipment={entry[1]} />
		});
		
		return equipment;
	}
}
