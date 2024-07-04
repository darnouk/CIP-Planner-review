require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  "esri/widgets/Search"
], function(esriConfig, Map, MapView, Search) {

  esriConfig.apiKey = "AAPKba612eedccd74bbabe0e040dec19190bkMVVICJGBITVVx-yRWPSKUO0HiwM3rEFvcZUZ52GBZfyakj41U9ixXAI3lslJLyo";

  const map = new Map({
      basemap: "arcgis-topographic"
  });

const view = new MapView({
  container: "viewDiv", //reference to the map container
  map: map,
  center: [-87.9065, 43.0389],
  zoom: 12
});

const sources = [{
  url: "https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer"
}];

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

});