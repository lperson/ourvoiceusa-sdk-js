
var pip = require('point-in-polygon');

var ingeojson = function (json, lng, lat) {
  switch (json.type) {
    case "Polygon":
      if (pip([lng, lat], json.coordinates[0])) {
        return true;
      }
      break;
    case "MultiPolygon":
      for (let p in json.coordinates) {
        if (pip([lng, lat], json.coordinates[p][0])) {
          return true;
        }
      }
      break;
    default: return false; break;
  }
  return false;
}

// transform a geojson file into an array of polygons

var geojson2polygons = function (json, flag) {

  // default lng/lat to short names
  let lng = "lng";
  let lat = "lat";

  // flag switches lng/lat to long names
  if (flag) {
    lng = "longitude";
    lat = "latitude";
  }

  let polygons = [];

  switch (json.type) {
    case "Polygon":
      let polygon = json.coordinates[0];
      polygons[0] = [];
      for (let g in polygon) {
        polygons[0].push({
          [lng]: polygon[g][0],
          [lat]: polygon[g][1],
        });
      }
    break;
  case "MultiPolygon":
    for (let c in json.coordinates) {
      let polygon = json.coordinates[c][0];
      polygons[c] = [];
      for (let g in polygon) {
        polygons[c].push({
          [lng]: polygon[g][0],
          [lat]: polygon[g][1],
        });
      }
    }
    break;
  }

  return polygons;
}

exports.ingeojson = ingeojson;
exports.geojson2polygons = geojson2polygons;

