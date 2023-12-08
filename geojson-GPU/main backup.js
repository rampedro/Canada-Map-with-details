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

// Mapzen GeoJSON tile including points, linestrings, and polygons
var geoJSONLayer = VIZI.geoJSONLayer('https://raw.githubusercontent.com/rampedro/ShinyR-d3/main/canada_divisions.geojson', {
  output: true,

  
  style: {
    color: '#ff0000',
    lineColor: '#0000ff',
    lineRenderOrder: 1,
    pointColor: '#00cc00'
  },
  pointGeometry: function(feature) {
    var geometry = new THREE.SphereGeometry(2, 16, 16);
    return geometry;
  }
}).addTo(world);



