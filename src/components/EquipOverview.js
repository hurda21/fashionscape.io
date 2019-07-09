import React from 'react';

import EquipLayout from './EquipLayout';
import EquipSelection from './EquipSelection';

import axios from 'axios';
const API_URL = 'https://www.osrsbox.com/osrsbox-db/';

export default class EquipOverview extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			loadout: {
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
			},
			equipment: {},
			selectedType: '',
			selectedEquip: {}
		};

		this.http = null;
	}

	render() {
		return (
			<div>
				<div className='container'>
					<div className='row'>
						<div className='col-md-4'>
							<EquipLayout loadout={this.state.loadout} 
													 selectedType={this.state.selectedType} 
													 selectType={this.selectType} />
						</div>
					</div>
				</div>
				<div className='container'>
					<EquipSelection equipment={this.state.equipment} 
													selectedEquip={this.state.selectedEquip} 
													selectEquip={this.selectEquip} />
				</div>
			</div>
		);
	}

	componentDidMount() {
		this.http = axios.create({
		  baseURL: API_URL,
		  timeout: 1000
		});
	}

	selectType = (selectedType) => {
		if (this.state.selectedType !== selectedType) {
			this.http.get('items-json-slot/items-' + selectedType + '.json').then(response => {
				let selectedEquip = this.state.loadout[selectedType];
				this.setState({ equipment: response.data, selectedType: selectedType, selectedEquip: selectedEquip });
			});
		} else {
			this.setState({ equipment: {}, selectedType: '', selectedEquip: {} })
		}
	};

	selectEquip = (selectedEquip) => {
		if (this.state.selectedEquip !== selectedEquip) {
			let loadout = this.state.loadout;
			loadout[this.state.selectedType] = selectedEquip;
			this.setState({ loadout: loadout, selectedEquip: selectedEquip });
		}
	};
}
