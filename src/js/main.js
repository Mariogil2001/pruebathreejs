import * as THREE from "three"; //npx vite para empezar server local
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import CannonDebugRenderer from 'cannon-es-debug-renderer';
import { World, NaiveBroadphase, Sphere } from 'cannon-es'; // npm install cannon-es

import { createCamera, createRenderer } from "./camera";
import { createlights } from "./lights";
import { loadModel } from "./loadglb";
import { createCity } from "./city"; 

let delivery;

const renderer = createRenderer();
const camera = createCamera();
const scene = new THREE.Scene();


/* Function to automatize the resize of the nav page */
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.1;

// Cargar el coche
loadModel("delivery", scene).then((loadedObject) => {
// Acceder al objeto 3D
  delivery = loadedObject.scene;
}).catch((error) => {
  console.error("Error cargando el modelo", error);
});

createCity(scene);
createlights(undefined, scene);

// Manejo de teclado
let keyMap = {
  ArrowLeft: false,
  ArrowUp: false,
  ArrowRight: false,
  ArrowDown: false,
  KeyW: false,
  KeyS: false,
  KeyA: false,
  KeyD: false,
};

let velocidadX = 0;
let velocidadY = 0;
let velocidadAngular = 0;
const friccion = 0.95; // Ajusta según sea necesario
const velocidadAngularMax = 0.03; // Ajusta según sea necesario

document.addEventListener("keydown", (e) => {
  keyMap[e.code] = true;
});

document.addEventListener("keyup", (e) => {
  keyMap[e.code] = false;
});

function animate() {
  requestAnimationFrame(animate);

  // Control de velocidad y rotación
  velocidadX *= friccion;
  velocidadY *= friccion;
  velocidadAngular *= friccion;

  if (keyMap.KeyW) {
    velocidadY += 0.01;
  }
  if (keyMap.KeyS) {
    velocidadY -= 0.01;
  }
  if (keyMap.KeyA) {
    velocidadX -= 0.01;
    velocidadAngular = Math.min(velocidadAngular + 0.001, velocidadAngularMax);
  }
  if (keyMap.KeyD) {
    velocidadX += 0.01;
    velocidadAngular = Math.max(velocidadAngular - 0.001, -velocidadAngularMax);
  }

  // Actualizar posición y rotación
  delivery.position.x += velocidadX;
  delivery.position.y += velocidadY;
  delivery.rotation.z += velocidadAngular;

  // Renderizar escena
  renderer.render(scene, camera);
}

animate();
