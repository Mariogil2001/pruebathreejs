import * as THREE from 'three';


export function createRenderer(){
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    return renderer;
}

export function createCamera() {
    const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.rotation.set(1.03, 0.01, -0.02);
    camera.position.set(0, -8, 6);
    return camera;
}
