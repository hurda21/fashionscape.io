import React from 'react';

import '../scss/Equip.scss';

import EquipLayout from './EquipLayout';
import EquipCanvas from './EquipCanvas';
import EquipSearch from './EquipSearch';
import EquipList from './EquipList';

import { forceCheck } from 'react-lazyload';

import axios from 'axios';
const API_URL = 'https://www.osrsbox.com/osrsbox-db/';

export default class Equip extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			// Player's equipment loadout
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

			// Player's equipment model ids
			models: {},

			// Total stats of the player's loadout
			totalStats: {
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
			totalWeight: 0,

			// Selected equipment item
			selectedEquip: {},

			// Selected equipment type
			selectedType: '',

			// All equipment available of the selected type
			equipment: [],

			// Search input for equipment
			searchInput: ''
			
		};

		this.http = null;
	}

	render() {
		return (
			<div className='container equip-card'>
				<div className='row'>
					<div className='col-lg-5 col-md-6'>
						<EquipLayout loadout={this.state.loadout} 
												 totalStats={this.state.totalStats}
												 totalWeight={this.state.totalWeight}
												 selectedType={this.state.selectedType} 
												 selectType={this.selectType} />
					</div>
					<div className='col-lg-7 col-md-6'>
						{this.renderEquipList()}
					</div>
				</div>
				<div className='row'>
					<div className='col-12'>
						<EquipCanvas models={this.state.models} />
					</div>
				</div>
			</div>
		);
	}

	renderEquipList() {
		// Filters the equipment list based on search parameters
		let equipment = this.state.equipment;
		let searchInput = this.state.searchInput.replace(/\\/g, '').trim().toLowerCase();

		if (searchInput.length > 0 && equipment.length > 0) {
			equipment = this.state.equipment.filter(equip => {
				if (equip && equip.name) return equip.name.toLowerCase().match(searchInput);
			});
		}

		if (this.state.selectedType !== '') {
			return (
				<div>
					<EquipSearch searchInput={this.state.searchInput}
											 setSearchInput={this.setSearchInput} />
					<EquipList equipment={equipment}
										 searchInput={this.state.searchInput}
										 selectedEquip={this.state.selectedEquip}
										 selectEquip={this.selectEquip} />
				</div>
			);
		}
	}

	// Creates the http connection to the external API
	componentDidMount() {
		this.http = axios.create({
		  baseURL: API_URL,
		  timeout: 1000
		});
	}

	selectType = (selectedType) => {
		if (this.state.selectedType !== selectedType) this.getEquipment(selectedType);
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
			}, () => {
				this.setEquipStats();
				this.getModel(this.state.selectedEquip);
			});
		} else {
			loadout[this.state.selectedType] = {};

			this.setState({
				loadout: loadout,
				selectedEquip: {}
			}, () => {
				this.setEquipStats();
				this.getModel(this.state.selectedEquip);
			});
		}
	};

	// Sets the search string on input change, then renders the lazy loaded components
	// (new search results outside the original offset range otherwise do not get rendered)
	setSearchInput = (e) => {
		this.setState({ searchInput: e.target.value }, () => forceCheck());
	}

	// Retrieves all equipment through the osrsbox API
	getEquipment(selectedType) {
		let data = {};
		if (selectedType !== 'weapon') {
			this.http.get('items-json-slot/items-' + selectedType + '.json').then(response => {
				data = Object.values(response.data);
				this.setState({ 
					equipment: data,
					selectedType: selectedType,
					selectedEquip: this.state.loadout[selectedType],
					searchInput: ''
				});
			});
		} else {
			Promise.all([
				this.http.get('items-json-slot/items-weapon.json'),
				this.http.get('items-json-slot/items-2h.json')
			]).then(response => {
				data = Object.values(response[0].data).concat(Object.values(response[1].data));
				this.setState({ 
					equipment: data,
					selectedType: selectedType,
					selectedEquip: this.state.loadout[selectedType],
					searchInput: ''
				});
			});
		}
	}

	// Retrieves the model ID for the selected equipment
	getModel(selectedEquip) {
		let id = selectedEquip.id;
		if (id !== undefined) {
			this.http.get('models-summary.json').then(response => {
				let modelInfo = Object.values(response.data).find(value => id === value.type_id);
				let models = this.state.models;
				if (modelInfo) {
					models[this.state.selectedType] = modelInfo.model_id;
					this.setState({ models: models });
				}
			});
		}
	}

	setEquipStats() {
		let stats = {};
		let weight = 0;

		Object.values(this.state.loadout).forEach(equip => {
			if (equip && equip.weight) weight += equip.weight;

			Object.keys(this.state.totalStats).forEach(key => {
				if (stats[key] === undefined) stats[key] = 0;
				if (equip && equip.equipment) stats[key] += equip.equipment[key];
			});
		});

		this.setState({ 
			totalStats: stats, 
			totalWeight: weight
		});
	}
}
