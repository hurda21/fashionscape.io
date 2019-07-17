import React, { useState, useMemo } from 'react';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

function Model({ src }) {
  const [obj, set] = useState();
  useMemo(() => new OBJLoader().load(src, set), [src]);

  return obj ? <primitive object={obj} 
  												rotation-y={3 * Math.PI / 2} 
  												rotation-z={3 * Math.PI / 2} /> : null
}

export default Model;