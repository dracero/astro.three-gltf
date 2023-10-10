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
  function setupModel(data) {
    const model = data.scene;
    const mixer = new AnimationMixer(model);
  
    const clips = data.animations;
    const actions = clips.map(clip => mixer.clipAction(clip));
  
    actions.forEach(action => action.play());
  
    model.tick = (delta) => mixer.update(delta);
  
    return model;
  }
  
  export { setupModel };
  
  
  
  