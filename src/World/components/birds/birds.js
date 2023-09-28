import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { setupModel } from './setupModel.js';

async function loadBirds() {
  const loader = new GLTFLoader();

  const [parrotData, flamingoData] = await Promise.all([
    loader.loadAsync('Parrot.glb'),
    loader.loadAsync('Flamingo.glb')
  ]);

  console.log('Squaaawk!', parrotData);

  const parrot = setupModel(parrotData);
  parrot.position.set(0, 0, -3);
  parrot.scale.set(0.02, 0.02, 0.02); // set scale to 0.1

  const flamingo = setupModel(flamingoData);
  flamingo.position.set(0, 0, 0);
  flamingo.scale.set(0.02, 0.02, 0.02); // set scale to 0.1

  console.log('Parrot Meshes:', parrotData.scene.children[0]);
  let borrar = flamingoData.scene.getObjectByName(flamingoData.scene.children[0].name);
  console.log('Flamingo Meshes:', borrar);
  return {
    parrot,
    flamingo,
  };
}


export { loadBirds };
