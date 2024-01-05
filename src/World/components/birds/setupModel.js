import { AnimationMixer } from "three";

//Esta function es solo para seleccionar un hijo del modelo
/*function setupModel(data) {
    const model = data.scene.children[0];
    const clip = data.animations[0];
    const mixer = new AnimationMixer(model);
    const action = mixer.clipAction(clip);
    action.play();  

    model.tick = (delta) => mixer.update(delta);
  
    return model;
  }
  
  export { setupModel };*/
  
  //Esta function es para seleccionar el modelo completo y sus animaciones
  class AnimationModel {
    constructor(data) {
      this.model = data.scene;
      this.mixer = new AnimationMixer(this.model);
      this.clips = data.animations;
      this.actions = this.clips.map(clip => this.mixer.clipAction(clip));
      this.model.tick = (delta) => this.mixer.update(delta);
    }

    tick(delta) {
      if (this.model.tick) {
        this.model.tick(delta);
      }
    }
  
    setupModel() {
      return this.model;
    }
  
    play() {
      this.actions.forEach(action => action.paused = false);
      this.actions.forEach(action => action.play());
    }
  
    pause() {
      this.actions.forEach(action => action.paused = true);
    }
    
  }
  
  export { AnimationModel };
 

  
  