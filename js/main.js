// Add all scripts to the JS folder
var map;

function createMap(){
  map = L.map('mapid', {
      center: [44.5, -85.0],
      zoom: 6
  });

  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri',
      maxZoom: 13
  }).addTo(map);

  getData(map);
};

const view = new MapView({
  container: "viewDiv",
  map: map,
  center: [-87.9065, 43.0389],
  zoom: 12
});
