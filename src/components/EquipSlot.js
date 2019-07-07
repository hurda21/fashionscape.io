import React from 'react';

import '../scss/EquipSlot.scss';

export default class EquipSlot extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		let equipImage = { backgroundImage: 'url(./images/' + this.props.type + '.png)' };

		let className = 'equip-slot ' + this.props.type;
		if (this.props.selectedType === this.props.type) className += ' selected';

		return (
			<div className={className} style={equipImage} onClick={() => this.props.selectType(this.props.type)}></div>
		);
	}
}
