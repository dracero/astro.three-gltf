import { WebGLRenderer } from 'three';

function createRenderer() {

  const renderer = new WebGLRenderer({ antialias: true });
  renderer.physicallyCorrectLights = true;
  if (navigator.xr) {
      navigator.xr.isSessionSupported('immersive-vr').then((supported) => {
          if (supported) {
              renderer.xr.enable = true
          } else {
              // VR no es compatible
          }
      });
  }
  return renderer;
}

export { createRenderer };
