let scene = new THREE.Scene();
/* The Scene() constructor creates a new scene, 
which represents the whole 3D world we are trying to display. */

/* The PerspectiveCamera() constructor to create a camera */
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

/* The field of view: 75 deg,
   The aspect ratio: scene's width/ scene's height,
   The near plane: 0.1,
   The far plane: 1000 */


// WebGLRenderer() constructor
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create the cube
let cube;

let loader = new THREE.TextureLoader();

loader.load( 'metal003.png', function (texture) {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2, 2);

    let geometry = new THREE.BoxGeometry(2.4, 2.4, 2.4);
    let material = new THREE.MeshLambertMaterial( { map: texture, shading: THREE.FlatShading } );
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    draw();
});

// Add lights to the scene 
// soft white light - AmbientLight object
let light = new THREE.AmbientLight('rgb(255, 255, 255)');
scene.add(light);
// SpotLight object
let spotLight = new THREE.SpotLight('rgb(255, 255, 255)');
spotLight.position.set(100, 1000, 1000);
spotLight.castShadow = true;
scene.add(spotLight);

// draw() function
function draw() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);

    requestAnimationFrame(draw);
}