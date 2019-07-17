import React from 'react';

import * as THREE from 'three';
import { Canvas } from 'react-three-fiber';

import Model from './Model';

export default class EquipCanvas extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Canvas style={{ height: '500px' }} camera={{ position: [0, 0, 200] }}>
				<Model src='/28075.obj' />
			</Canvas>
		);
	}
}
