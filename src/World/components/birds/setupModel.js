import { AnimationMixer } from "three";
 
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
      this.actions.forEach(action => {
        action.setEffectiveTimeScale(1);
        action.paused = false;
        action.play();
      });
    }
  
    pause() {
      this.actions.forEach(action => action.paused = true);
    }

    playReverse() {
      this.actions.forEach(action => {
        action.setEffectiveTimeScale(-1);
        action.paused = false;
        action.play();
      });
    }

    erase(){
      let object = this.model.getObjectByName('Sphere');
         if (object) {
                   // Elimina el objeto de la escena
                   this.model.remove(object);
        }
   }
    
  }
  
  export { AnimationModel };
 

  
  