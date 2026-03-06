// Array and Objects Notation
// Zichen Zhang
// 3/5/2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


import * as THREE from './three.module.js';

let scene, camera, renderer;
let cubes = [];

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
}

function createCubes() {
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  for (let i = 0; i < 10; i++) {
    const cube = new THREE.Mesh(geometry, material);
    cube.position.x = Math.random() * 10 - 5;
    cube.position.y = Math.random() * 10 - 5;
    cube.position.z = Math.random() * 10 - 5;
    scene.add(cube);
    cubes.push(cube);
  }
}

function animate() {
  requestAnimationFrame(animate);
  cubes.forEach((cube) => {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  });
  renderer.render(scene, camera);
}

init();
createCubes();
animate();