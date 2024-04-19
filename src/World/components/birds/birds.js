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
  sphere.model.position.set(2, 0, -6); // Centra el objeto
  sphere.model.scale.set(0.5, 0.5, 0.5); // Ajusta el tamaño del objeto
  
  return {
    sphere,
    sphereData
  };
}

export { loadSpheres };

