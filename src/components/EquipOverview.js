import React from 'react';

import EquipForm from './EquipForm';
import EquipLayout from './EquipLayout';

export default class EquipOverview extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedEquipment: {
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
				ring: {}
			}
		};
	}

	render() {
		return (
			<div className='container'>
				<div className='row'>
					<div className='col-md-4'>
						<EquipForm selectedEquipment={this.state.selectedEquipment} />
					</div>
					<div className='col-md-8'>
						<EquipLayout selectedEquipment={this.state.selectedEquipment} />
					</div>
				</div>
			</div>
		);
	}
}
