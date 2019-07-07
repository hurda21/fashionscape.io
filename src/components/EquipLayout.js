import React from 'react';

import '../scss/EquipLayout.scss';
import EquipSlot from './EquipSlot';

export default class EquipLayout extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		let borderImage = { borderImage: 'url(./images/osrs-border.png) 30 round' };
		let verticalImage = { backgroundImage: 'url(./images/vertical-connector.png' };
		let horizontalImage = { backgroundImage: 'url(./images/horizontal-connector.png' };

		return (
			<div className='osrs-background' style={borderImage}>
				<span className='osrs-connector vertical left' style={verticalImage}></span>
				<span className='osrs-connector vertical middle' style={verticalImage}></span>
				<span className='osrs-connector vertical right' style={verticalImage}></span>

				<span className='osrs-connector horizontal top' style={horizontalImage}></span>
				<span className='osrs-connector horizontal bottom' style={horizontalImage}></span>

				{this.renderEquipSlots()}
			</div>
		);
	}

	renderEquipSlots() {
		let keys = Object.keys(this.props.loadout);
		
		let equipSlots = keys.map((key, index) => {
			let row = '';
			if (/head|legs/.test(key)) {
				row = (
					<div className='row' key={key}>
						<div className='col-4 offset-4'>
							<EquipSlot type={keys[index]} selectedType={this.props.selectedType} selectType={this.props.selectType} />
						</div>
					</div>
				);
			}
			if (/cape|weapon|hands/.test(key)) {
				row = (
					<div className='row' key={key}>
						<div className='col-4'>
							<EquipSlot type={keys[index]} selectedType={this.props.selectedType} selectType={this.props.selectType} />
						</div>
						<div className='col-4'>
							<EquipSlot type={keys[index + 1]} selectedType={this.props.selectedType} selectType={this.props.selectType} />
						</div>
						<div className='col-4'>
							<EquipSlot type={keys[index + 2]} selectedType={this.props.selectedType} selectType={this.props.selectType} />
						</div>
					</div>
				);
			}

			return row;
		});

		return equipSlots;
	}
}
