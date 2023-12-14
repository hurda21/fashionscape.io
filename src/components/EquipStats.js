import React from 'react';

import '../scss/Equip.scss';
import '../scss/EquipStats.scss';

export default class EquipStats extends React.Component {

	render() {
		let stats = this.props.totalStats;
		return (
			<div className='equip-stats-container'>
				<div className='row'>
					<div className='col-xl-4 col-sm-4'>
						<h6 className='small-header'>Attack:</h6>
						<div>Stab: {this.renderBonus(stats.attack_stab)}</div>
						<div>Slash: {this.renderBonus(stats.attack_slash)}</div>
						<div>Crush: {this.renderBonus(stats.attack_crush)}</div>
						<div>Magic: {this.renderBonus(stats.attack_magic)}</div>
						<div>Range: {this.renderBonus(stats.attack_ranged)}</div>
						<br/>
					</div>
					<div className='col-xl-4 col-sm-4'>
						<h6 className='small-header'>Defence:</h6>
						<div>Stab: {this.renderBonus(stats.defence_stab)}</div>
						<div>Slash: {this.renderBonus(stats.defence_slash)}</div>
						<div>Crush: {this.renderBonus(stats.defence_crush)}</div>
						<div>Magic: {this.renderBonus(stats.defence_magic)}</div>
						<div>Range: {this.renderBonus(stats.defence_ranged)}</div>
						<br/>
					</div>
					<div className='col-xl-4 col-sm-4'>
						<h6 className='small-header'>Other:</h6>
						<div>Melee: {this.renderBonus(stats.melee_strength)}</div>
						<div>Ranged: {this.renderBonus(stats.ranged_strength)}</div>
						<div>Magic: {this.renderBonus(stats.magic_damage)}%</div>
						<div>Prayer: {this.renderBonus(stats.prayer)}</div>
					</div>
				</div>
				<div className='row'>
					<div className='col-12'>
						<div className='text-center'>
							Weight: {Math.round(this.props.totalWeight * 100) / 100}kg
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
