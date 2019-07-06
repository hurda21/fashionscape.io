import React from 'react';

import '../scss/EquipLayout.scss';
import EquipSlot from './EquipSlot';

export default class EquipLayout extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		let borderStyle = { borderImage: 'url(./images/osrs-border.png) 30 round' };
		let verticalStyle = { backgroundImage: 'url(./images/vertical-connector.png' };
		let horizontalStyle = { backgroundImage: 'url(./images/horizontal-connector.png' };

		return (
			<div className='osrs-background' style={borderStyle}>
				<span className='osrs-connector vertical left' style={verticalStyle}></span>
				<span className='osrs-connector vertical middle' style={verticalStyle}></span>
				<span className='osrs-connector vertical right' style={verticalStyle}></span>

				<span className='osrs-connector horizontal top' style={horizontalStyle}></span>
				<span className='osrs-connector horizontal bottom' style={horizontalStyle}></span>

				{this.renderEquipSlots()}
			</div>
		);
	}

	renderEquipSlots() {
		let keys = Object.keys(this.props.selectedEquipment);
		
		let equipSlots = keys.map((key, index) => {
			if (/head|legs/.test(key)) {
				return (
					<div className='row'>
						<div className='col-4 offset-4'>
							<EquipSlot key={key} type={key} />
						</div>
					</div>
				);
			}
			else if (/cape|weapon|hands/.test(key)) {
				return (
					<div className='row'>
						<div className='col-4'>
							<EquipSlot key={key} type={key} />
						</div>
						<div className='col-4'>
							<EquipSlot key={keys[index + 1]} type={keys[index + 1]} />
						</div>
						<div className='col-4'>
							<EquipSlot key={keys[index + 2]} type={keys[index + 2]} />
						</div>
					</div>
				);
			}
		});

		return equipSlots;
	}
}
