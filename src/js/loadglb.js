import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// Función para cargar modelos GLB en la escena y devolver el objeto cargado. Utilizando promesas
export function loadModel(asset, scene, pos = [0, 0, 0], rot = [-Math.PI / 2, Math.PI, Math.PI], scale = [1, 1, 1], appendTo) {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();

    loader.load(`src/Assets/${asset}.glb`, function (object) {
      object.scene.position.set(pos[0], pos[1], pos[2]);
      object.scene.rotation.set(rot[0], rot[1], rot[2]);
      object.scene.scale.set(scale[0], scale[1], scale[2]);
      object.scene.name = asset;

      if (appendTo !== undefined) {
        appendTo.push(object.scene);
      }

      scene.add(object.scene);
      resolve(object);
    }, undefined, function (error) {
      console.error("Error loading GLTF model", error);
      reject(error);
    });
  });
}
