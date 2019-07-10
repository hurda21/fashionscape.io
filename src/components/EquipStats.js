import React from 'react';

import '../scss/Equip.scss';
import '../scss/EquipStats.scss';

export default class EquipStats extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		let stats = this.props.stats;
		return (
			<div className='row margin-top'>
				<div className='col-md-12 col-sm-4'>
					<h6 className='small-header'>Attack bonus</h6>
					<div>Stab: {this.renderBonus(stats.attack_stab)}</div>
					<div>Slash: {this.renderBonus(stats.attack_slash)}</div>
					<div>Crush: {this.renderBonus(stats.attack_crush)}</div>
					<div>Magic: {this.renderBonus(stats.attack_magic)}</div>
					<div>Range: {this.renderBonus(stats.attack_ranged)}</div>
					<br/>
				</div>
				<div className='col-md-12 col-sm-4'>
					<h6 className='small-header'>Defence bonus</h6>
					<div>Stab: {this.renderBonus(stats.defence_stab)}</div>
					<div>Slash: {this.renderBonus(stats.defence_slash)}</div>
					<div>Crush: {this.renderBonus(stats.defence_crush)}</div>
					<div>Magic: {this.renderBonus(stats.defence_magic)}</div>
					<div>Range: {this.renderBonus(stats.defence_ranged)}</div>
					<br/>
				</div>
				<div className='col-md-12 col-sm-4'>
					<h6 className='small-header'>Other bonuses</h6>
					<div>Melee strength: {this.renderBonus(stats.melee_strength)}</div>
					<div>Ranged strength: {this.renderBonus(stats.ranged_strength)}</div>
					<div>Magic damage: {this.renderBonus(stats.magic_damage)}%</div>
					<div>Prayer: {this.renderBonus(stats.prayer)}</div>
					<br/>
					<div>Weight: {Math.round(this.props.weight * 100) / 100}kg</div>
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
