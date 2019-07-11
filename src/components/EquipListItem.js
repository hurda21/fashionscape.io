import React from 'react';

import '../scss/Equip.scss';
import '../scss/EquipListItem.scss';

const API_URL = 'https://www.osrsbox.com/osrsbox-db/';

export default class EquipListItem extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		let equip = this.props.equip;
		let className = 'equip-list-item';
		if (this.props.selectedEquip.id === equip.id) className += ' selected';
		
		return (
			<div className={className} 
					 onClick={() => this.props.selectEquip(equip)}>
				<img src={API_URL + 'items-icons/' + equip.id + '.png'} />
				<span>{this.props.equip.name}</span>
				<div className='equip-details'>
					<hr/>
					<div className='row'>
						<div className='col-4'>
							<h6 className='tiny-header'>Attack:</h6>
							<div>Stab: {this.renderBonus(equip.equipment.attack_stab)}</div>
							<div>Slash: {this.renderBonus(equip.equipment.attack_slash)}</div>
							<div>Crush: {this.renderBonus(equip.equipment.attack_crush)}</div>
							<div>Magic: {this.renderBonus(equip.equipment.attack_magic)}</div>
							<div>Range: {this.renderBonus(equip.equipment.attack_ranged)}</div>
						</div>
						<div className='col-4'>
							<h6 className='tiny-header'>Defence:</h6>
							<div>Stab: {this.renderBonus(equip.equipment.defence_stab)}</div>
							<div>Slash: {this.renderBonus(equip.equipment.defence_slash)}</div>
							<div>Crush: {this.renderBonus(equip.equipment.defence_crush)}</div>
							<div>Magic: {this.renderBonus(equip.equipment.defence_magic)}</div>
							<div>Range: {this.renderBonus(equip.equipment.defence_ranged)}</div>
						</div>
						<div className='col-4'>
							<h6 className='tiny-header'>Other:</h6>
							<div>Melee: {this.renderBonus(equip.equipment.melee_strength)}</div>
							<div>Ranged: {this.renderBonus(equip.equipment.ranged_strength)}</div>
							<div>Magic: {this.renderBonus(equip.equipment.magic_damage)}%</div>
							<div>Prayer: {this.renderBonus(equip.equipment.prayer)}</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	renderBonus(equipStat) {
		if (equipStat >= 0) {
			return "+" + equipStat;
		} else {
			return equipStat;
		}
	}
}
