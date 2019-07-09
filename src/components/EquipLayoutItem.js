import React from 'react';

import '../scss/EquipLayoutItem.scss';

const API_URL = 'https://www.osrsbox.com/osrsbox-db/';

export default class EquipLayoutItem extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		let equipImage = { backgroundImage: 'url(./images/' + this.props.type + '.png)' };
		if (this.props.equip.id !== undefined) equipImage = { backgroundImage: 'url(./images/blank.png)' };
		

		let className = 'layout-item ' + this.props.type;
		if (this.props.selectedType === this.props.type) className += ' selected';

		return (
			<div className={className} 
					 style={equipImage} 
					 onClick={() => this.props.selectType(this.props.type)}>
				{this.showItem()}
			</div>
		);
	}

	showItem() {
		if (this.props.equip.id !== undefined) {
			return <img className='layout-img' src={API_URL + 'items-icons/' + this.props.equip.id + '.png'} />
		}
	}
}
