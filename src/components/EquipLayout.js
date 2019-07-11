import React from 'react';

import '../scss/EquipLayout.scss';
import EquipLayoutItem from './EquipLayoutItem';
import EquipStats from './EquipStats';

export default class EquipLayout extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		let borderImage = { borderImage: 'url(./images/osrs-border.png) 30 round' };
		let verticalImage = { backgroundImage: 'url(./images/vertical-connector.png' };
		let horizontalImage = { backgroundImage: 'url(./images/horizontal-connector.png' };

		return (
			<div className='layout-container'>
				<div className='osrs-background' 
						 style={borderImage}>
					<span className='osrs-connector vertical left' 
								style={verticalImage}></span>
					<span className='osrs-connector vertical middle' 
								style={verticalImage}></span>
					<span className='osrs-connector vertical right' 
								style={verticalImage}></span>
					<span className='osrs-connector horizontal top' 
								style={horizontalImage}></span>
					<span className='osrs-connector horizontal bottom' 
								style={horizontalImage}></span>

					{this.renderEquipSlots()}
				</div>
				<EquipStats stats={this.props.stats}
										weight={this.props.weight} />
				<hr className='underlined d-block d-md-none d-lg-none d-xl-none' />
			</div>
		);
	}

	renderEquipSlots() {
		let keys = Object.keys(this.props.loadout);
		
		let equipSlots = keys.map((key, index) => {
			let row = '';
			if (/head|legs/.test(key)) {
				row = (
					<div className='row' 
							 key={key}>
						<div className='col-4 offset-4'>
							<EquipLayoutItem equip={this.props.loadout[key]} 
															 type={key} 
															 selectedType={this.props.selectedType} 
															 selectType={this.props.selectType} />
						</div>
					</div>
				);
			}
			if (/cape|weapon|hands/.test(key)) {
				row = (
					<div className='row' key={key}>
						<div className='col-4'>
							<EquipLayoutItem equip={this.props.loadout[key]} 
															 type={key} 
															 selectedType={this.props.selectedType} 
															 selectType={this.props.selectType} />
						</div>
						<div className='col-4'>
							<EquipLayoutItem equip={this.props.loadout[keys[index + 1]]} 
															 type={keys[index + 1]} 
															 selectedType={this.props.selectedType} 
															 selectType={this.props.selectType} />
						</div>
						<div className='col-4'>
							<EquipLayoutItem equip={this.props.loadout[keys[index + 2]]} 
															 type={keys[index + 2]} 
															 selectedType={this.props.selectedType} 
															 selectType={this.props.selectType} />
						</div>
					</div>
				);
			}

			return row;
		});

		return equipSlots;
	}
}
