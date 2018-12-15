
// transform a geojson file into an array of polygons

exports.geojson2polygons = (str, flag) => {
  let json = JSON.parse(str);

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
