import React from 'react';

import '../scss/EquipLayoutItem.scss';
import '../scss/Tooltip.scss';

const API_URL = 'https://www.osrsbox.com/osrsbox-db/';

export default class EquipLayoutItem extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		let backgroundUrl = 'url(./images/' + this.props.type + '.png)';
		if (Object.keys(this.props.equip).length > 0) backgroundUrl = 'url(./images/blank.png)';
		let equipImage = { backgroundImage: backgroundUrl };

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
		if (Object.keys(this.props.equip).length > 0) {
			return (
				<div className='tooltip-container'>
					<img className='layout-img' src={API_URL + 'items-icons/' + this.props.equip.id + '.png'} />
					<span className='tooltip-text'>{this.props.equip.name}</span>
				</div>
			);
		}
	}
}
