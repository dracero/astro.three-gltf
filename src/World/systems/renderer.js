import { WebGLRenderer } from 'three';

function createRenderer() {

  const renderer = new WebGLRenderer({ antialias: true });
  renderer.physicallyCorrectLights = true;
    
    // Espera a que el navegador estÃ© listo
    window.addEventListener('load', (event) => {
        // Verifica la compatibilidad de VR
        if (navigator.xr) {
            navigator.xr.isSessionSupported('immersive-vr').then((supported) => {
                if (supported) {
                    // VR es compatible, puedes intentar activar VR aquÃ­
                    console.log('VR es compatible, puedes intentar activar VR aquÃ­');
                    //Ver esta parte porque acÃ¡ es donde no deja deployar
                    renderer.xr.enabled = true;
                } else {
                    // VR no es compatible
                    console.log('VR no es compatible');
                }
            });
        } else {
            console.log('WebXR no estÃ¡ disponible en este navegador');
        }
      });

  return renderer;
}

export { createRenderer };

