require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/widgets/Search"
], function(esriConfig, Map, MapView, FeatureLayer, Search) {

  esriConfig.apiKey = "AAPKba612eedccd74bbabe0e040dec19190bkMVVICJGBITVVx-yRWPSKUO0HiwM3rEFvcZUZ52GBZfyakj41U9ixXAI3lslJLyo";

  const map = new Map({
      basemap: "arcgis-topographic"
  });

const view = new MapView({
  container: "viewDiv", //reference to the map container
  map: map,
  center: [-87.0870, 42.0919],
  zoom: 13
});

//add feature layers
const watermainLayer = new FeatureLayer({
  url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Watermain/FeatureServer/1",
  outFields: ["*"],
  popupTemplate: {
      title: "Watermain",
      content: `
          <b>Pipe ID:</b> {PipeID}<br>
          <b>Material:</b> {Material}<br>
          <b>Diameter (in):</b> {Diamter}<br>
          <b>Install Year:</b> {InstallYear}<br>
          <b>Segment Length:</b> {Shape__Length}<br>
          <b>Number of Breaks on Segment:</b> {NumBreaks}<br>
          <b>Road ID:</b> {RoadID}
      `
  }
});

const watermainBreakLayer = new FeatureLayer({
  url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Watermain/FeatureServer/0",
  outFields: ["*"],
      popupTemplate: {
          title: "Watermain Break",
          content: `
              <b>Break ID:</b> {BreakID}<br>
              <b>Break Year:</b> {BreakYear}<br>
              <b>Watermain Pipe ID:</b> {PipeID}
            `
      }
});

const roadLayer = new FeatureLayer({
  url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Roadway/FeatureServer",
  outFields: ["*"],
      popupTemplate: {
          title: "Roadway",
          content: `
              <b>Road ID:</b> {RoadID}<br>
              <b>Road Type:</b> {RoadType}<br>
              <b>Condition Rating:</b> {ConditionRating}<br>
              <b>Segment Length:</b> {Shape__Length}
          `
  }
});

map.addMany([roadLayer, watermainLayer, watermainBreakLayer]);

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