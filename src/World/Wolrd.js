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
    loop.updatables.push(sphere);
    scene.add( sphere.model)
  }

  render() {
    renderer.render(scene, camera);

    // Espera a que el navegador esté listo
window.addEventListener('load', (event) => {
  // Verifica la compatibilidad de VR
  if (navigator.xr) {
      navigator.xr.isSessionSupported('immersive-vr').then((supported) => {
          if (supported) {
              // VR es compatible, puedes intentar activar VR aquí
              console.log('VR es compatible, puedes intentar activar VR aquí');
              renderer.xr.enasble = true
          } else {
              // VR no es compatible
              console.log('VR no es compatible');
          }
      });
  } else {
      console.log('WebXR no está disponible en este navegador');
  }
});

  
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

  eraseSphere() {
    this.sphere.erase()
  }

}

export { World };