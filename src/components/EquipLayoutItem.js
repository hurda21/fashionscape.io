import React from 'react';

import '../scss/EquipLayoutItem.scss';
import '../scss/Tooltip.scss';

export default class EquipLayoutItem extends React.Component {

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
				{this.renderItem()}
			</div>
		);
	}

	renderItem() {
		if (Object.keys(this.props.equip).length > 0) {
			return (
				<div className='tooltip-container'>
					<img className='layout-img' src={this.renderIcon(this.props.equip)} alt='' />
					<span className='tooltip-text'>{this.props.equip.name}</span>
				</div>
			);
		}
	}

	renderIcon(equip) {
		return `data:image/png;base64,${equip.icon}`;
	}
}
