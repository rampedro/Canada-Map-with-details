// Initial coordinates for Toronto
var coords = [43.65107, -79.347015];

var world = VIZI.world('world', {
  skybox: false,
  postProcessing: false
}).setView(coords);

// Add controls
var controls = VIZI.Controls.orbit().addTo(world);

// CartoDB basemap
VIZI.imageTileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
}).addTo(world);

// Load GeoJSON data using d3
d3.json('https://raw.githubusercontent.com/rampedro/ShinyR-d3/main/DM11.geojson')
  .then(function(data) {
    // Create a VIZI.geoJSONLayer and add it to the world
    var geoJSONLayer = VIZI.geoJSONLayer(data, {
      output: true,
      style: function(feature) {
        var colour = Math.random() * 0xffffff;

        return {
          color: colour,
          transparent: true,
          opacity: 0.4
        };
      },
      interactive: true, // Enable interactivity for the GeoJSON features
      onEachFeature: function(feature, layer) {
        // Set up click event for each GeoJSON feature
        layer.on('click', function(event) {
          console.log('Feature clicked:', feature.properties); // Display feature properties when clicked
          // You can perform additional actions here based on the clicked feature properties
        });
      }
    }).addTo(world);
  })
  .catch(function(error) {
    console.log('Error loading GeoJSON:', error);
  });

// Define and set up your Three.js scene and camera

// Define and set up your Three.js scene and camera
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5);

// Define raycaster and mouse outside of the click function
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

// Function to handle the click event
function onClick(event) {
  // Calculate normalized device coordinates (-1 to 1) for the mouse click
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Perform raycasting to detect objects intersected by the mouse click
  raycaster.setFromCamera(mouse, camera);
  let intersects = raycaster.intersectObjects(scene.children, true);

  if (intersects.length > 0) {
    // If an object is clicked
    console.log('Hello, World!'); // Print "Hello, World!" to the console
    // You can perform additional actions here based on the clicked object
  }
}

// Event listener for mouse click
window.addEventListener('click', onClick, false);

// Function to handle window resizing
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Event listener for window resizing
window.addEventListener('resize', onWindowResize, false);