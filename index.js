
const us_states = {
    "AL": "Alabama",
    "AK": "Alaska",
    "AS": "American Samoa",
    "AZ": "Arizona",
    "AR": "Arkansas",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware",
    "DC": "District Of Columbia",
    "FM": "Federated States Of Micronesia",
    "FL": "Florida",
    "GA": "Georgia",
    "GU": "Guam",
    "HI": "Hawaii",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "IA": "Iowa",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "ME": "Maine",
    "MH": "Marshall Islands",
    "MD": "Maryland",
    "MA": "Massachusetts",
    "MI": "Michigan",
    "MN": "Minnesota",
    "MS": "Mississippi",
    "MO": "Missouri",
    "MT": "Montana",
    "NE": "Nebraska",
    "NV": "Nevada",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico",
    "NY": "New York",
    "NC": "North Carolina",
    "ND": "North Dakota",
    "MP": "Northern Mariana Islands",
    "OH": "Ohio",
    "OK": "Oklahoma",
    "OR": "Oregon",
    "PW": "Palau",
    "PA": "Pennsylvania",
    "PR": "Puerto Rico",
    "RI": "Rhode Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TN": "Tennessee",
    "TX": "Texas",
    "UT": "Utah",
    "VT": "Vermont",
    "VI": "Virgin Islands",
    "VA": "Virginia",
    "WA": "Washington",
    "WV": "West Virginia",
    "WI": "Wisconsin",
    "WY": "Wyoming"
};

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

exports.us_states = us_states;
exports.ingeojson = ingeojson;
exports.geojson2polygons = geojson2polygons;

