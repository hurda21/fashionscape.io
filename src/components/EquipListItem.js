import React from 'react';

import '../scss/EquipListItem.scss';

const API_URL = 'https://www.osrsbox.com/osrsbox-db/';

export default class EquipListItem extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		let className = 'equip-list-item';
		if (this.props.viewedEquip === this.props.equipItem.id) className += ' selected';

		return (
			<div className={className} 
					 onClick={this.viewAndSelect}>
				<img src={API_URL + 'items-icons/' + this.props.equipItem.id + '.png'} />
				<span className='overflow-hidden'>{this.props.equipItem.name}</span>
			</div>
		);
	}

	viewAndSelect = () => {
		this.props.viewEquip(this.props.equipItem.id);
		this.props.selectEquip(this.props.equipItem);
	}
}
