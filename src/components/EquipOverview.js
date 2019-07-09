import React from 'react';

import EquipLayout from './EquipLayout';
import EquipStats from './EquipStats';
import EquipSearch from './EquipSearch';
import EquipList from './EquipList';

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
						<div className='col-lg-6 col-md-8'>
							<EquipLayout loadout={this.state.loadout} 
													 selectedType={this.state.selectedType} 
													 selectType={this.selectType} />
						</div>
						<div className='col-lg-6 col-md-4'>
							<EquipStats loadout={this.state.loadout} 
													selectedEquip={this.state.selectedEquip} />
						</div>
					</div>
				</div>
				<div className='container'>
					<div className='row'>
						<div className='col-4 col-offset-4'>
							<EquipSearch />
						</div>
					</div>
					<EquipList equipment={this.state.equipment}
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
			if (selectedType === 'weapon') this.getWeapons();
			else this.getEquipment(selectedType);
		} 
		else {
			this.setState({
				equipment: {},
				selectedType: '',
				selectedEquip: {}
			});
		}
	};

	selectEquip = (selectedEquip) => {
		if (this.state.selectedEquip !== selectedEquip) {
			let loadout = this.state.loadout;
			loadout[this.state.selectedType] = selectedEquip;

			// Removes shield if 2h weapon is selected
			if (selectedEquip.equipment.slot === '2h') {
				loadout['shield'] = {};
			}

			// Removes 2h weapon if shield is selected
			if (selectedEquip.equipment.slot === 'shield' && loadout['weapon'].equipment.slot === '2h') {
				loadout['weapon'] = {};
			}

			this.setState({
				loadout: loadout,
				selectedEquip: selectedEquip
			});
		}
	};

	// Retrieves all non-weapon equipment
	getEquipment(selectedType) {
		this.http.get('items-json-slot/items-' + selectedType + '.json').then(response => {
			this.setState({ 
				equipment: response.data,
				selectedType: selectedType,
				selectedEquip: this.state.loadout[selectedType]
			});
		});
	}

	// Retrieves both one-handed and two-handed weapons when selecting the 'weapon' equipment type
	getWeapons() {
		Promise.all([
			this.http.get('items-json-slot/items-weapon.json'),
			this.http.get('items-json-slot/items-2h.json')
		]).then(response => {
			let data = { ...response[0].data, ...response[1].data };
			this.setState({ 
				equipment: data,
				selectedType: 'weapon',
				selectedEquip: this.state.loadout['weapon']
			});
		});
	}
}
