import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import "./style.css";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const cameraDirection = new THREE.Vector3;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.style.width = '100%';
renderer.domElement.style.height = '100%';
document.body.appendChild(renderer.domElement);

// const helper = new THREE.CameraHelper(camera);
// scene.add(helper);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// var gridXZ = new THREE.GridHelper(100, 10);
// scene.add(gridXZ);



const light = new THREE.DirectionalLight(0xFFFFFF, 1);
light.position.set(0, 10, 5);
light.target.position.set(-5, 0, 0);
scene.add(light);
scene.add(light.target);

const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
scene.add(ambientLight);

const geometry = new THREE.PlaneGeometry(200, 200);
const material = new THREE.MeshBasicMaterial({ color: 0x2d373d, side: THREE.DoubleSide });
const plane = new THREE.Mesh(geometry, material);
plane.rotateZ(90)
// plane.rotateX(90)
// scene.add(plane);

const playerGeometry = new THREE.OctahedronGeometry();
const playerMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff })
const player = new THREE.Mesh(playerGeometry, playerMaterial);
scene.add(player);

// 
let speed = 0;
let maxCubes = 100;
let cubes = [];

const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 0, 0);
controls.target = player.position;
// controls.maxDistance = 5;
controls.update();

camera.position.y = 4;
camera.position.x = 10;
// camera.position.z = 5;

function animate() {
    while (cubes.length < maxCubes) {
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshPhongMaterial({ color: 0xc10037 });
        const cube = new THREE.Mesh(geometry, material);

        let size = 100;
        let offset = 50;
        cube.position.x += (Math.random() * size) - size - offset;
        // cube.position.y += (Math.random() * 10) - 5;
        cube.position.z += (Math.random() * size) - (size / 2);
        scene.add(cube);
        cubes.push(cube);
    }
    cubes.forEach((cube, i) => {
        // camera.position.z -= 0.01;
        // cube.rotation.x += 0.01;
        // cube.rotation.y += 0.01;
        // cube.position.z += 0.05;
        cube.position.x += 0.05;
        // cube.position.y += 0.001;
        if (cube.position.x > 20) {
            scene.remove(cube);
            cubes.splice(i, 1);
        }
    })
    controls.update();
    // light.position.set(cubes[0].position.x - 1, cubes[0].position.y - 1, cubes[0].position.z - 1);
    // light.target = cubes[0];

    // camera.getWorldDirection(cameraDirection);
    // camera.position.addScaledVector(cameraDirection, speed);

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

let mouse = { x: 0, y: 0 }
document.addEventListener("mousemove", (e) => {
    e.preventDefault();
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
});

document.addEventListener("keydown", (e) => {
    console.log('key', e)
    switch (e.key) {
        case 'w':
        case 'ArrowUp':
            player.position.x += 1;
            break;
        case 'a':
            player.position.z += 1;
            break;
        case 's':
        case 'ArrowDown':
            player.position.x -= 1;
            break;
        case 'd':
            player.position.z -= 1;
            break;
    }
    console.log(speed);
}, false);
