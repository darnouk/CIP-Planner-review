// Add all scripts to the JS folder
import Map from "https://js.arcgis.com/4.21/esri/Map.js";
import MapView from "https://js.arcgis.com/4.21/esri/views/MapView.js";

const map = new Map({
  basemap: "topo"
});

const view = new MapView({
  container: "viewDiv",
  map: map,
  center: [-87.9065, 43.0389],
  zoom: 12
});
