import React from 'react';

import axios from 'axios';
const API_URL = 'https://www.osrsbox.com/osrsbox-db/';

export default class EquipForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			headEquips: {},
			capeEquips: {},
			neckEquips: {},
			ammoEquips: {},
			weaponEquips: {},
			bodyEquips: {},
			shieldEquips: {},
			legsEquips: {},
			handsEquips: {},
			feetEquips: {},
			ringEquips: {}
		};
	}

	componentDidMount() {
		const instance = axios.create({
		  baseURL: API_URL,
		  timeout: 1000
		});

		instance.get('items-json-slot/items-head.json').then(response => {
			this.setState({ headEquips: response.data });
			console.log(this.state.headEquips);
		});
	}

	render() {
		return (
			<div></div>
		);
	}
}
