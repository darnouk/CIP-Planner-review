import esriConfig from "https://js.arcgis.com/4.25/esri/config.js";
import Map from "https://js.arcgis.com/4.25/esri/Map.js";
import MapView from "https://js.arcgis.com/4.25/esri/views/MapView.js";
import Search from "https://js.arcgis.com/4.25/esri/widgets/Search.js";

esriConfig.apiKey = "AAPKba612eedccd74bbabe0e040dec19190bkMVVICJGBITVVx-yRWPSKUO0HiwM3rEFvcZUZ52GBZfyakj41U9ixXAI3lslJLyo";

const map = new Map({
    basemap: "topographic"
});

const view = new MapView({
  container: "viewDiv", //reference to the map container
  map: map,
  center: [-87.9065, 43.0389],
  zoom: 12 // Zoom level
});

const searchWidget = new Search({
  view: view,
  sources: [{
      url: "https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer"
  }]
});

view.ui.add(searchWidget, {
  position: "top-left",
  index: 2
});