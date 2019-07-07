import React from 'react';

import '../scss/EquipList.scss';
import EquipListItem from './EquipListItem';

export default class EquipList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			viewedEquip: null
		}
	}

	render() {
		return (
			<div className='equip-list'>
				<div className='row'>
					{this.renderEquipListItems()}
				</div>
			</div>
		);
	}

	renderEquipListItems() {
		let values = Object.values(this.props.equipment);

		let equipListItems = values.map(value => {
			return (
				<div className='col-xl-3 col-lg-4 col-sm-6' key={value.id}>
					<EquipListItem equipItem={value} 
												 viewedEquip={this.state.viewedEquip} 
												 selectEquip={this.props.selectEquip} 
												 viewEquip={this.viewEquip} />
				</div>
			);
		});

		return equipListItems;
	}

	viewEquip = (id) => {
		this.setState({ viewedEquip: id });
	}
}
