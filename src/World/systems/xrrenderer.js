/*import * as THREE from 'three'; // Asegúrate de tener esta línea al inicio de tu archivo
import { XRButton } from 'three/addons/webxr/XRButton.js';
import { XRControllerModelFactory } from 'three/addons/webxr/XRControllerModelFactory.js';

class XRRenderer {
    constructor(scene, renderer, worldInstance) {
        this.scene = scene;
        this.renderer = renderer;
        this.world = worldInstance; // Guarda la referencia a la instancia de World
        this.controller1 = null;
        this.controllerGrip1 = null;
        this.controller2 = null;
        this.controllerGrip2 = null;
    }

    create() {
        document.body.appendChild(XRButton.createButton(this.renderer, { 'optionalFeatures': ['depth-sensing'] }));
        window.addEventListener('load', (event) => {
            // Verifica la compatibilidad de VR
            if (navigator.xr) {
                navigator.xr.isSessionSupported('immersive-vr').then((supported) => {
                    if (supported) {
                        // VR es compatible, puedes intentar activar VR aquÃ­
                        console.log('VR es compatible, puedes intentar activar VR aquÃ­');
                        //Ver esta parte porque acÃ¡ es donde no deja deployar
                        renderer.xr.enabled = true;
                        this.controller1 = this.renderer.xr.getController(0);
                        this.controller1.addEventListener('selectstart', this.onSelectStart.bind(this));
                        this.controller1.addEventListener('selectend', this.onSelectEnd.bind(this));
                        this.controller1.addEventListener('connected', (event) => {
                            this.controller1.add(this.buildController(event.data));
                        });
                        this.controller1.addEventListener('disconnected', () => {
                            this.controller1.remove(this.controller1.children[0]);
                        });
                        this.scene.add(this.controller1);
                    } else {
                        // VR no es compatible
                        console.log('VR no es compatible');
                    }
                });
            } else {
                console.log('WebXR no estÃ¡ disponible en este navegador');
            }
          });

    }

    onSelectStart() {
        this.controller1.userData.isSelecting = true;
        this.world.move(); // Ahora puedes llamar a start() en la instancia de World

    }

    onSelectEnd() {
        this.controller1.userData.isSelecting = false;
        this.world.pause();
    }

    buildController(data) {
        let geometry, material;

        switch (data.targetRayMode) {
            case 'tracked-pointer':
                geometry = new THREE.BufferGeometry();
                geometry.setAttribute('position', new THREE.Float32BufferAttribute([0.00, 1.22, 0.87, 0.00, 0.00, 0.00], 3));
                geometry.setAttribute('color', new THREE.Float32BufferAttribute([0.5, 0.5, 0.5, 0, 0, 0], 3));
                material = new THREE.LineBasicMaterial({ vertexColors: true, blending: THREE.AdditiveBlending });
                return new THREE.Line(geometry, material);

            case 'gaze':
                geometry = new THREE.RingGeometry(0.02, 0.04, 32).translate(0, 0, -1);
                material = new THREE.MeshBasicMaterial({ opacity: 0.5, transparent: true });
                return new THREE.Mesh(geometry, material);
        }
    }
}

export { XRRenderer }*/

import * as THREE from 'three';
import { XRButton } from 'three/addons/webxr/XRButton.js';
import { XRControllerModelFactory } from 'three/addons/webxr/XRControllerModelFactory.js';

class XRRenderer {
    constructor(scene, renderer, worldInstance) {
        this.scene = scene;
        this.renderer = renderer;
        this.world = worldInstance;
        this.controller1 = null;
        this.controllerGrip1 = null;
        this.controller2 = null;
        this.controllerGrip2 = null;

        // Añade las fábricas de modelos de controlador para Oculus 2
        this.controllerModelFactory = new XRControllerModelFactory();
    }

    create() {
        document.body.appendChild(XRButton.createButton(this.renderer, { 'optionalFeatures': ['depth-sensing'] }));
        this.controller1 = this.renderer.xr.getController(0);
        this.controller1.addEventListener('selectstart', this.onSelectStart.bind(this));
        this.controller1.addEventListener('selectend', this.onSelectEnd.bind(this));
        this.controller1.addEventListener('connected', (event) => {
             this.controller1.add(this.buildController(event.data));
             this.adjustControllerPosition(this.controller1);
        });
        this.controller1.addEventListener('disconnected', () => {
            this.controller1.remove(this.controller1.children[0]);
        });
        this.scene.add(this.controller1);
    }

    onSelectStart() {
        this.controller1.userData.isSelecting = true;
        this.world.move();
    }

    onSelectEnd() {
        this.controller1.userData.isSelecting = false;
        this.world.pause();
    }

    buildController(data) {
        let geometry, material;

        switch (data.targetRayMode) {
            case 'tracked-pointer':
                geometry = new THREE.BufferGeometry();
                geometry.setAttribute('position', new THREE.Float32BufferAttribute([0.00, 1.22, 0.87, 0.00, 0.00, 0.00], 3));
                geometry.setAttribute('color', new THREE.Float32BufferAttribute([0.5, 0.5, 0.5, 0, 0, 0], 3));
                material = new THREE.LineBasicMaterial({ vertexColors: true, blending: THREE.AdditiveBlending });
                return new THREE.Line(geometry, material);

            case 'gaze':
                geometry = new THREE.RingGeometry(0.02, 0.04, 32).translate(0, 0, -1);
                material = new THREE.MeshBasicMaterial({ opacity: 0.5, transparent: true });
                return new THREE.Mesh(geometry, material);
        }
    }

    adjustControllerPosition(controller) {
        // Ajusta la posición y el tamaño del controlador aquí
        controller.position.set(0, 0, 0); // Centra el controlador
        controller.scale.set(1, 1, 1); // Ajusta el tamaño del controlador
    }
}

export { XRRenderer }



