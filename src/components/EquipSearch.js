import React from 'react';

import '../scss/EquipSearch.scss';

import { DebounceInput } from 'react-debounce-input';

export default class EquipSearch extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='row'>
				<div className='offset-lg-1 col-lg-10 offset-2 col-8'>
					<DebounceInput className='form-control equip-search'
												 type='search'
												 value={this.props.searchInput}
												 placeholder='Search'
												 aria-label='Search'
												 debounceTimeout={50}
												 onChange={this.props.setSearchInput} />
				</div>
			</div>
		);
	}
}
