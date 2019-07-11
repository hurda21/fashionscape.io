import React from 'react';

import '../scss/Equip.scss';

import EquipLayout from './EquipLayout';
import EquipModel from './EquipModel';
import EquipStats from './EquipStats';
import EquipSearch from './EquipSearch';
import EquipList from './EquipList';

import axios from 'axios';
const API_URL = 'https://www.osrsbox.com/osrsbox-db/';

export default class Equip extends React.Component {

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
			stats: {
				attack_crush: 0,
				attack_magic: 0,
				attack_ranged: 0,
				attack_slash: 0,
				attack_stab: 0,
				defence_crush: 0,
				defence_magic: 0,
				defence_ranged: 0,
				defence_slash: 0,
				defence_stab: 0,
				magic_damage: 0,
				melee_strength: 0,
				ranged_strength: 0,
				magic_damage: 0,
				prayer: 0
			},
			weight: 0,

			selectedEquip: {},
			selectedType: '',

			equipment: {},
			searchInput: ''
			
		};

		this.http = null;
	}

	render() {
		return (
			<div className='container equip-card'>
				<div className='row'>
					<div className='col-lg-5 col-md-8'>
						<EquipLayout loadout={this.state.loadout} 
												 selectedType={this.state.selectedType} 
												 selectType={this.selectType} />
					</div>
					<div className='col-lg-4 d-none d-lg-block d-xl-block'>
						<EquipModel />
					</div>
					<div className='col-lg-3 col-md-4'>
						<EquipStats stats={this.state.stats}
												weight={this.state.weight} />
					</div>
				</div>
				{this.renderEquipList()}
			</div>
		);
	}

	renderEquipList() {
		// Filters the equipment list based on search parameters
		let equipment = this.state.equipment;
		let searchInput = this.state.searchInput.replace(/\\/g, '').trim().toLowerCase();

		if (searchInput.length > 0 && Object.keys(equipment).length > 0) {
			equipment = {};

			let filteredValues = Object.values(this.state.equipment).forEach(equip => {
				if (equip.name.toLowerCase().match(searchInput)) {
					equipment[equip.id] = equip;
				}
			});
		}

		if (this.state.selectedType !== '') {
			return (
				<div>
					<hr className='underlined' />
					<EquipSearch equipment={this.state.equipment} 
											 searchInput={this.state.searchInput}
											 setSearchInput={this.setSearchInput} />
					<EquipList equipment={equipment}
										 searchInput={this.state.searchInput}
										 selectedEquip={this.state.selectedEquip}
										 selectEquip={this.selectEquip} />
				</div>
			);
		}
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
	};

	selectEquip = (selectedEquip) => {
		let loadout = this.state.loadout;

		if (this.state.selectedEquip.id !== selectedEquip.id) {
			loadout[this.state.selectedType] = selectedEquip;

			// Removes shield if 2h weapon is selected
			if (selectedEquip.equipment !== undefined && selectedEquip.equipment.slot === '2h') {
				loadout['shield'] = {};
			}

			// Removes 2h weapon if shield is selected
			if (selectedEquip.equipment !== undefined 
					&& selectedEquip.equipment.slot === 'shield' 
					&& loadout['weapon'].equipment !== undefined 
					&& loadout['weapon'].equipment.slot === '2h') {
				loadout['weapon'] = {};
			}

			this.setState({
				loadout: loadout,
				selectedEquip: selectedEquip
			});
		} else {
			loadout[this.state.selectedType] = {};

			this.setState({
				loadout: loadout,
				selectedEquip: {}
			});
		}

		// Sets the equipment stats after equipping an item
		this.setEquipStats();
	};

	setSearchInput = (e) => {
		this.setState({ searchInput: e.target.value });
	}

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

	setEquipStats() {
		let stats = {};
		let weight = 0;

		Object.values(this.state.loadout).forEach(equip => {
			if (equip && equip.weight) weight += equip.weight;

			Object.keys(this.state.stats).forEach(key => {
				if (stats[key] === undefined) stats[key] = 0;
				if (equip && equip.equipment) stats[key] += equip.equipment[key];
			});
		});

		this.setState({ 
			stats: stats, 
			weight: weight 
		});
	}
}
