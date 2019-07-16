import React from 'react';

import LazyLoad from 'react-lazyload';

import '../scss/Equip.scss';
import '../scss/EquipList.scss';
import '../scss/EquipListItem.scss';
import EquipListItem from './EquipListItem';

export default class EquipList extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='row equip-list'>
				{this.renderEquipListItems()}
			</div>
		);
	}

	renderEquipListItems() {
		if (this.props.equipment.length === 0) {
			return (
				<div className='col-12'>
					<div className='text-center padded'>
						<h6 className='small-header'>No equipment found for: "{this.props.searchInput}"</h6>
					</div>
				</div>
			);
		}

		let equipListItems = this.props.equipment.map(value => {
			return (
				<div className='col-lg-6' key={value.id}>
					<LazyLoad height={75} offset={1000} once overflow resize>
						<EquipListItem equip={value}
													 selectedEquip={this.props.selectedEquip}
													 selectEquip={this.props.selectEquip} />
					</LazyLoad>
				</div>
			);
		});

		return equipListItems;
	}
}
