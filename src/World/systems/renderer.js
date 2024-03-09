import { WebGLRenderer } from 'three';
import { VRButton } from 'three/addons/webxr/VRButton.js';

function createRenderer() {
  const renderer = new WebGLRenderer({ antialias: true });

  renderer.physicallyCorrectLights = true;
  document.body.appendChild( VRButton.createButton( renderer ) );
  renderer.xr.enabled = true;
  
  return renderer;
}

export { createRenderer };
