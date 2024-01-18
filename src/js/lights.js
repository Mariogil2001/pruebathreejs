import * as THREE from 'three';


/**
 * 
 * @param {*} numLights Quantity of lights in the scene
 * @param {*} scene The scene you are using
 */
export function createlights(numLights = 1, scene){
let lights = [];
// Añade luces a la escena (spotlight y ambient light)
for (let i = 0; i < numLights; i++) {
  lights[i] = new THREE.SpotLight(0xffffff, 1500, 50, Math.PI / 2, 0, 2);
  lights[i].position.set(0, 10 * (2 * i) + 5, 20);
  scene.add(lights[i]);
}

const ambient = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambient);
}