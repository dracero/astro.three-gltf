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
        navigator.xr.isSessionSupported('immersive-vr').then((supported) => {
            if (supported) {
                document.body.appendChild(XRButton.createButton(this.renderer, { 'optionalFeatures': ['depth-sensing'] }));
                this.renderer.xr.enabled = true;	
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

                // Añade los modelos de controlador para Oculus 2
                this.controllerGrip1 = this.renderer.xr.getControllerGrip(0);
                this.controllerGrip1.add(this.controllerModelFactory.createControllerModel(this.controllerGrip1));
                this.scene.add(this.controllerGrip1);
            } else {
                console.log('El dispositivo no soporta sesiones inmersivas de VR');
            }
        }).catch((err) => {
            console.error('Error al verificar el soporte de sesiones inmersivas de VR:', err);
        });
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
}

export { XRRenderer }


