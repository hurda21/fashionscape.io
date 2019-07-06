import React from 'react';

import '../scss/EquipSlot.scss';

export default class EquipSlot extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		let equipStyle = {
			height: '4.5rem',
			width: '4.5rem',
			backgroundSize: '4.5rem',
			backgroundImage: 'url(./images/' + this.props.type + '.png)',
		}

		let className = 'equip-slot';
		if (/cape|neck|ammo/.test(this.props.type)) {
			className += ' ' + this.props.type;
		}

		return (
			<div className={className} style={equipStyle}></div>
		);
	}
}
