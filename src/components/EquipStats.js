import React from 'react';

import '../scss/Equip.scss';
import '../scss/EquipStats.scss';

export default class EquipStats extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='row'>
				<div className='col-6'>
					<h6>Attack bonus</h6>
					<div>Stab: {this.renderBonus(this.props.stats.attack_stab)}</div>
					<div>Slash: {this.renderBonus(this.props.stats.attack_slash)}</div>
					<div>Crush: {this.renderBonus(this.props.stats.attack_crush)}</div>
					<div>Magic: {this.renderBonus(this.props.stats.attack_magic)}</div>
					<div>Range: {this.renderBonus(this.props.stats.attack_ranged)}</div>
				</div>
				<div className='col-6'>
					<h6>Defence bonus</h6>
					<div>Stab: {this.renderBonus(this.props.stats.defence_stab)}</div>
					<div>Slash: {this.renderBonus(this.props.stats.defence_slash)}</div>
					<div>Crush: {this.renderBonus(this.props.stats.defence_crush)}</div>
					<div>Magic: {this.renderBonus(this.props.stats.defence_magic)}</div>
					<div>Range: {this.renderBonus(this.props.stats.defence_ranged)}</div>
				</div>
			</div>
		);
	}

	renderBonus(stat) {
		if (stat >= 0) {
			return "+" + stat;
		} else {
			return "-" + stat;
		}
	}
}
