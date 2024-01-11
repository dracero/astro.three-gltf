import { loadSpheres } from './components/birds/birds.js';
import { createCamera } from './components/camera.js';
import { createLights } from './components/lights.js';
import { createScene } from './components/scene.js';
import { createControls } from './systems/controls.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';

let camera;
let controls;
let renderer;
let scene;
let loop;

class World {
  constructor(container) {
    camera = createCamera();
    renderer = createRenderer();
    scene = createScene();
    loop = new Loop(camera, scene, renderer);
    container.append(renderer.domElement);
    controls = createControls(camera, renderer.domElement);

    const { ambientLight, mainLight } = createLights();

    loop.updatables.push(controls);
    scene.add(ambientLight, mainLight);

   
    const resizer = new Resizer(container, camera, renderer);
  }

  async init() {
    //const { parrot, flamingo } = await loadBirds();
    const { sphere } = await loadSpheres()
    this.sphere = sphere; // Almacenar sphere como una propiedad de la clase
    // move the target to the center of the front bird
    //controls.target.copy(parrot.position);
  
    //loop.updatables.push(parrot, flamingo);
    //scene.add(parrot, flamingo);
    loop.updatables.push(sphere);
    //console.log('Flamingo', flamingo.children[0].children[0].children[0]);
    scene.add( sphere.model)
    
    /*setTimeout(() => {
      const partToRemove = flamingo.getObjectByName('Sphere001_1'); // Reemplaza 'nombre_de_la_parte' con el nombre de la parte que deseas eliminar
      flamingo.remove(partToRemove);
      loop.updatables.splice(loop.updatables.indexOf(flamingo), 1);
    }, 10000); // Eliminar después de 10 segundos (10000 milisegundos)*/
    
  }

  render() {
    renderer.render(scene, camera);
  }

  start() {
    loop.start();
  }

  stop() {
    loop.stop();
  }

  move(){
    this.sphere.play()
  }
 
  pause(){
    this.sphere.pause()
  }

  playBack(){
    this.sphere.playReverse()
  }

}

export { World };