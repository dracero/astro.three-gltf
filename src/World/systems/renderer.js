import { WebGLRenderer } from 'three';
import { VRButton } from 'three/addons/webxr/VRButton.js';

function createRenderer() {
  const renderer = new WebGLRenderer({ antialias: true });
   
  renderer.physicallyCorrectLights = true;
  
  document.body.appendChild( VRButton.createButton( renderer ) );
  if ('xr' in navigator) {
    navigator.xr.enabled = true;
} else {
    console.log('WebXR no está disponible en este navegador.');
}

  
  return renderer;
}

export { createRenderer };
