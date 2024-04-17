import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { AnimationModel } from './setupModel.js';

async function loadSpheres() {
  let configuracionInicial 
  const loader = new GLTFLoader();
  const [sphereData] = await Promise.all([
    loader.loadAsync('esfera.gltf', (gltf) => { console.log('Cupula cargada'); 
    }),
  ]);

  console.log('Squaaawk!', sphereData);

  const sphere = new AnimationModel(sphereData);
  sphere.setupModel();
  sphere.model.position.set(0, 0, 0); // Centra el objeto
  sphere.model.scale.set(0.6, 0.6, 0.6); // Ajusta el tamaño del objeto
  
  return {
    sphere,
    sphereData
  };
}

export { loadSpheres };

