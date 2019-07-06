import React from 'react';

import EquipLayout from './EquipLayout';

export default class EquipOverview extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			equipment: {
				head: {},
				cape: {},
				neck: {},
				ammo: {},
				weapon: {},
				body: {},
				shield: {},
				legs: {},
				hands: {},
				feet: {},
				ring: {},
			}
		}
	}

	render() {
		return (
			<div>
				<EquipLayout equipment={this.state.equipment} />
			</div>
		);
	}
}
