import React from 'react';
import { Canvas } from '@react-three/fiber';

import Model from './Model';

export default class EquipCanvas extends React.Component {

	render() {
		return (
			<Canvas style={{ height: '500px' }} camera={{ position: [0, 0, 200] }}>
				<ambientLight color={0xffffff} />
				{this.renderModels()}
			</Canvas>
		);
	}

	renderModels() {
		let keys = Object.keys(this.props.models);
		let models = keys.map((key, index) => {
			return <Model id={this.props.models[key]} key={key} />
		});

		return models;
	}
}
