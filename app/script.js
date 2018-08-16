// ------------------------------------------------
// BASIC SETUP
// ------------------------------------------------

// Create an empty scene
var scene = new THREE.Scene();

// Create a basic perspective camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 4;

// Create a renderer with Antialiasing
var renderer = new THREE.WebGLRenderer({ antialias: true });

// Configure renderer clear color
renderer.setClearColor("#000000");

// Configure renderer size
renderer.setSize(window.innerWidth, window.innerHeight);

// Append Renderer to DOM
document.body.appendChild(renderer.domElement);

// ------------------------------------------------
// FUN STARTS HERE
// ------------------------------------------------

// Create a Cube Mesh with basic material
var geometry = new THREE.SphereGeometry(1, 100, 100);
var loader = new THREE.TextureLoader()
loader.crossOrigin = '';
var texture = loader.load("earth.jpg");
var material = new THREE.MeshPhongMaterial({ map: texture });
var globe = new THREE.Mesh(geometry, material);

var bgTexture = loader.load("space-background.jpg",
    function(texture) {
        var img = texture.image;
        bgWidth = "1600px"
        bgHeight = "100%"
        resize();
    });
scene.background = bgTexture;
bgTexture.wrapS = THREE.MirroredRepeatWrapping;
bgTexture.wrapT = THREE.MirroredRepeatWrapping;

var light = new THREE.HemisphereLight(0xffffbb, 0x080820, .1);
scene.add(light);

// White directional light at half intensity shining from the top.
var directionalLight = new THREE
    .DirectionalLight(0xffffff, .8)
directionalLight.position.set(1, 1, 0).normalize();
scene.add(directionalLight);

// Add globe to Scene
scene.add(globe);

// Rendering function
var render = function() {
    requestAnimationFrame(render);

    // Update the color to set
    if (color < 0xdddddd) color += 0x0000ff;

    // Update the cube color
    cube.material.color.setHex(color);

    // Update the cube rotations
    cube.rotation.x += 0.05;
    cube.rotation.y += 0.02;

    renderer.autoClear = false;
    renderer.clear();
    renderer.render(backgroundScene, backgroundCamera);
    renderer.render(scene, camera);
};

// Render Loop
var render = function() {
    requestAnimationFrame(render);

    globe.rotation.x += 0.00;
    globe.rotation.y += 0.01;

    // Render the scene
    renderer.render(scene, camera);
};

render();