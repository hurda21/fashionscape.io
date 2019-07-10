import React from 'react';

import '../scss/EquipSearch.scss';

export default class EquipSearch extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='row'>
				<div className='offset-lg-4 col-lg-4 offset-md-3 col-md-6 offset-sm-2 col-sm-8'>
					<input className='form-control equip-search' 
								 type='text' 
								 placeholder='Search' 
								 aria-label='Search' />
				</div>
			</div>
		);
	}
}
