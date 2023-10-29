import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { setupModel } from './setupModel.js';

async function loadBirds() {
  const loader = new GLTFLoader();

  //const [parrotData, flamingoData] = await Promise.all([
  const [flamingoData] = await Promise.all([
    //loader.loadAsync('Parrot.glb'),
    loader.loadAsync('cupula.gltf', (gltf) => { console.log('Cupula cargada'); 
    // Obtener la escena del archivo glTF
     //aca tengo todas las geometruias, tengo que ver cómo acceder
    }),
  ]);

  

  console.log('Squaaawk!', flamingoData);
 /* const parrot = setupModel(parrotData);
  parrot.position.set(0, 0, -3);
  parrot.scale.set(0.02, 0.02, 0.02); // set scale to 0.1*/

  const flamingo = setupModel(flamingoData);
  flamingo.position.set(0, 0, 0);
  flamingo.scale.set(0.2, 0.2, 0.2); // set scale to 0.1

  return {
    //parrot,
    flamingo,
  };
}


export { loadBirds };
