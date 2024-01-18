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
// Ajusta la posición y orientación de la cámara para seguir al objeto 'delivery'
const cameraOffset = new THREE.Vector3(0, -10, 10); // Ajusta según sea necesario

const scene = new THREE.Scene();
// Color de fondo de la escena
scene.background = new THREE.Color(0xffffff); // Puedes cambiar el código de color según tus preferencias

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

// Nueva función para cargar el modelo y luego iniciar la animación
function loadModelAndAnimate() {
  loadModel("delivery", scene)
    .then((loadedObject) => {
      // Acceder al objeto 3D
      delivery = loadedObject.scene;
      console.log("Se ha cargado delivery");

      // Comenzar la animación después de cargar el modelo
      animate();
    })
    .catch((error) => {
      console.error("Error cargando el modelo", error);
    });
}

// Llamar a la función para cargar el modelo y animar
loadModelAndAnimate();

createCity(scene);
createlights(10, scene);

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
const friccionAngular = 0.9; // Ajusta según sea necesario
const aceleracionAngular = 0.002; // Ajusta según sea necesario
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
  velocidadAngular *= friccionAngular;

  if (keyMap.KeyW) {
    // Convertir la velocidad a coordenadas del mundo
    const direccion = new THREE.Vector3(0, 0, -1);
    direccion.applyAxisAngle(new THREE.Vector3(0, 1, 0), delivery.rotation.y);
    velocidadX += direccion.x * 0.01;
    velocidadY += direccion.z * 0.01;
  }
  if (keyMap.KeyS) {
    const direccion = new THREE.Vector3(0, 0, 1);
    direccion.applyAxisAngle(new THREE.Vector3(0, 1, 0), delivery.rotation.y);
    velocidadX += direccion.x * 0.01;
    velocidadY += direccion.z * 0.01;
  }
  if (keyMap.KeyA) {
    velocidadAngular += aceleracionAngular;
  }
  if (keyMap.KeyD) {
    velocidadAngular -= aceleracionAngular;
  }

  // Actualizar posición y rotación
  delivery.position.x += velocidadX;
  delivery.position.y += velocidadY;

  // Simular rotación del coche
  delivery.rotation.y -= velocidadAngular;

  // Actualizar posición de la cámara
  camera.position.copy(delivery.position).add(cameraOffset);
  camera.lookAt(delivery.position);

  // Renderizar escena
  renderer.render(scene, camera);
}

// animate();