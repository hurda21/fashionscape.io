import React from 'react';

import '../scss/EquipListItem.scss';

const API_URL = 'https://www.osrsbox.com/osrsbox-db/';

export default class EquipListItem extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		let className = 'equip-list-item';
		if (this.props.selectedEquip.id === this.props.equip.id) className += ' selected';

		return (
			<div className={className} 
					 onClick={() => this.props.selectEquip(this.props.equip)}>
				<img src={API_URL + 'items-icons/' + this.props.equip.id + '.png'} />
				<span className='overflow-hidden'>{this.props.equip.name}</span>
			</div>
		);
	}
}
