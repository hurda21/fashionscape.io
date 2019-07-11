import React from 'react';

import '../scss/EquipSearch.scss';

export default class EquipSearch extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='row'>
				<div className='offset-xl-3 col-xl-6 offset-lg-2 col-lg-8 offset-sm-1 col-sm-10'>
					<input className='form-control equip-search'
								 type='text'
								 value={this.props.searchInput}
								 placeholder='Search'
								 aria-label='Search'
								 onChange={this.props.setSearchInput} />
				</div>
			</div>
		);
	}
}
