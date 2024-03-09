import { World } from '../World/Wolrd.js';
	
  
  async function Main() {
		// Get a reference to the container element
		const container = document.querySelector('#scene-container');
		// create a new world
		const world = new World(container);
        // complete async tasks
        await world.init();
        // start the animation loop
        world.start();
        document.getElementById('hud').addEventListener('click', function() {
        world.move()});
        document.getElementById('hud2').addEventListener('click', function() {
        world.pause()});
        document.getElementById('hud3').addEventListener('click', function() {
        world.playBack()});
        document.getElementById('hud4').addEventListener('click', function() {
        world.eraseSphere()});
    } 

    Main().catch((err) => {
      console.error(err);
    });

export default Main