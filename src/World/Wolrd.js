import { loadSpheres } from './components/birds/birds.js';
import { createCamera} from './components/camera.js';
import { createLights } from './components/lights.js';
import { createScene } from './components/scene.js';
import { createControls } from './systems/controls.js';
import { createRenderer } from './systems/renderer.js';
import { XRRenderer } from './systems/xrrenderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';


//test
let camera;
let controls;
let renderer;
let scene;
let loop;

class World {
  constructor(container,xrRenderer) {
    this.xrSession = null; // Agrega esta línea
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
    this.xrrender = new XRRenderer(scene, renderer, this); // Pasa 'this' como un argumento al constructor de XRRenderer
  }

  async init() {
          renderer.xr.enabled = true;
          this.xrSession = null; // Agrega esta línea
          this.xrSession =  navigator.xr.requestSession('immersive-vr');
          //const { parrot, flamingo } = await loadBirds();
          const { sphere } = await loadSpheres()
          this.sphere = sphere; // Almacenar sphere como una propiedad de la clase
          loop.updatables.push(sphere);
          scene.add( sphere.model)
          // Establecer el target de los controles Orbit a la posición del objeto
          controls.target.copy(this.sphere.model.position);
  }

  render() {
    renderer.render(scene, camera);
    this.sphere = sphere; // Almacenar sphere como una propiedad de la clase
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

  starXR (){
    if (navigator.xr) {
      navigator.xr.isSessionSupported("immersive-vr").then((isSupported) => {
        if (isSupported) {
          // Your code here
          this.xrSession = null; // Agrega esta línea
          this.xrrender.create();
        }
      });
    }
  }

  setupController() {
          // Asume que tienes una referencia a tu XRSession llamada xrSession
          const controller = xrSession.inputSources[0]; // Obtiene el primer controlador
          if (controller) {
            // Escucha el evento 'selectstart' del controlador
            controller.addEventListener('selectstart', () => {
              this.xrrender.onSelectStart();
            });

            controller.addEventListener('selectend', () => {
              this.xrrender.onSelectEnd();
            });
          }
        }

}

export { World };