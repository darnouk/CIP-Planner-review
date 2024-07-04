require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/widgets/Search",
  "esri/widgets/Expand",
  "esri/widgets/LayerList",
  "esri/tasks/support/Query"
], function(esriConfig, Map, MapView, FeatureLayer, Search, Expand, LayerList, Query) {

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

//layerList widget
const layerList = new LayerList({
  view: view
});

const layerListExpand = new Expand({
  view: view,
  content: layerList,
  expanded: false
});

view.ui.add(layerListExpand, "top-right");

//query form
const queryForm = document.createElement("div");
queryForm.innerHTML = `
  <form id="query-form" style="padding: 10px;">
    <label for="condition-rating">Condition Rating less than:</label>
    <input type="number" id="condition-rating" name="condition-rating" min="0" max="10" value="5">
    <button type="submit">Apply Query</button>
  </form>
`;

const queryExpand = new Expand({
  view: view,
  content: queryForm,
  expanded: true
});

view.ui.add(queryExpand, "top-right");

//query form submit event
document.getElementById("query-form").addEventListener("submit", function(event) {
  event.preventDefault();
  const rating = document.getElementById("condition-rating").value;
  roadLayer.definitionExpression = `ConditionRating < ${rating}`;
  updateChart(rating);
});

// Function to update the chart
function updateChart(rating) {
  const query = roadLayer.createQuery();
  query.where = `ConditionRating < ${rating}`;
  query.outStatistics = [
    {
      onStatisticField: "Shape__Length",
      outStatisticFieldName: "totalLength",
      statisticType: "sum"
    },
    {
      onStatisticField: "ConditionRating",
      outStatisticFieldName: "ratingCount",
      statisticType: "count"
    }
  ];
  roadLayer.queryFeatures(query).then(function(result) {
    const totalLength = result.features[0].attributes.totalLength;
    const ratingCount = result.features[0].attributes.ratingCount;
    const data = [totalLength, ratingCount];

    // Create the chart
    const ctx = document.getElementById('conditionChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Total Length', 'Count'],
        datasets: [{
          label: 'Road Conditions',
          data: data,
          backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
          borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  });
}

// Initial chart
updateChart(5);

});