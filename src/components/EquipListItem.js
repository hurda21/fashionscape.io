import React from 'react';

export default class EquipListItem extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div onClick={() => this.props.selectEquip(this.props.equipItem)}>{this.props.equipItem.name}</div>
		);
	}
}
