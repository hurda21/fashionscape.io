import React, { useState, useMemo } from 'react';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

const AWS_URL = 'https://osrs-models.s3.us-east-2.amazonaws.com/'

function Model({ id }) {
	const src = AWS_URL + id;
  const [obj, setState] = useState();

  useMemo(() => {
  	new MTLLoader().load(src + '.mtl', materials => {
  		materials.preload();

  		let objLoader = new OBJLoader();
  		objLoader.setMaterials(materials);
  		objLoader.load(src + '.obj', setState);
  	});
  }, [id]);
  
  return obj ? <primitive object={obj} /> : null;
}
export default Model