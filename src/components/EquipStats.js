import React from 'react';

export default class EquipStats extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		console.log(this.props.stats);
		return (
			<div>{this.props.selectedEquip.name}</div>
		);
	}
}
