import { loadModel } from "./loadglb";
import * as THREE from "three";

 export function createCity(scene){
    // let lights = [];
    for (let i = 0; i < 20; i++) {
        loadModel("road_drivewayDouble",scene, [-4, 5 * i + 2, 0], [-Math.PI / 2, Math.PI / 2, Math.PI], [5, 5, 5]);
        if (i % 2 === 0) {
             loadModel("construction_pylon",scene ,[-4, 5 * i + 2, 0], [-Math.PI / 2, Math.PI / 2, Math.PI], [5, 5, 5]);
            //  lights[i] = new THREE.SpotLight(0xffffff, 1000, 50, Math.PI / 2, 0, 2);
            //  lights[i].position.set(0, 5 * i + 2, 20);
            //  scene.add(lights[i]);
        }
      }
    loadModel( "road_endRound",scene, [3.5, -3, 0], [-Math.PI / 2, -Math.PI / 2, Math.PI], [5, 5, 5] );
    const ambient = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambient);
};