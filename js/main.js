import Map from "https://js.arcgis.com/4.21/esri/Map.js";
import MapView from "https://js.arcgis.com/4.21/esri/views/MapView.js";

const map = new Map({
  basemap: "topo"  // Use the topographic basemap
});

const view = new MapView({
  container: "viewDiv",   // Reference to the map container
  map: map,
  center: [-87.9065, 43.0389],  // Longitude, latitude of Milwaukee, WI
  zoom: 12  // Zoom level
});