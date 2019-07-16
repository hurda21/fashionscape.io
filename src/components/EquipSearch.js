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
				<div className='offset-xl-3 col-xl-6 offset-lg-2 col-lg-8 offset-sm-1 col-sm-10'>
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
