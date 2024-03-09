import { WebGLRenderer } from 'three';
import { VRButton } from 'three/addons/webxr/VRButton.js';	

function createRenderer() {

  const renderer = new WebGLRenderer({ antialias: true });
  renderer.physicallyCorrectLights = true;
  document.body.appendChild( VRButton.createButton( renderer ) );
  
    // Espera a que el navegador esté listo
    window.addEventListener('load', (event) => {
        // Verifica la compatibilidad de VR
        if (navigator.xr) {
            navigator.xr.isSessionSupported('immersive-vr').then((supported) => {
                if (supported) {
                    // VR es compatible, puedes intentar activar VR aquí
                    console.log('VR es compatible, puedes intentar activar VR aquí');
                    //Ver esta parte porque acá es donde no deja deployar
                    renderer.xr.enabled = true;
                } else {
                    // VR no es compatible
                    console.log('VR no es compatible');
                }
            });
        } else {
            console.log('WebXR no está disponible en este navegador');
        }
      });

  return renderer;
}

export { createRenderer };
