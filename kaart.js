var map;
var fixedMarkerLatLng = [53.22174747304968, 6.553838253021241]; // Fixed marker coordinates in Groningen
var fixedMarker;
var placedMarker;
var lock;
var latlng;
var line;

function setFixedMarker(latlng) {
  fixedMarkerLatLng = latlng;
}
function icon() {
  let customIcon = {
    iconUrl: "	https://cdn-icons-png.flaticon.com/512/7584/7584620.png",
    iconSize: [10, 10]
  }
  let myIcon = L.icon(customIcon);

  let iconOptions = {
    title: "company name",
    draggable: true,
    icon: myIcon,
    opacity: 0
  }
  return iconOptions
}
function addMarker() {

  if (placedMarker) {
    map.removeLayer(placedMarker);
    if (line) {
      map.removeLayer(line);
    }
  }
  placedMarker = L.marker(latlng, icon()).addTo(map);
  placedMarker.setOpacity(1);
}
function Klaar() {
  lock = true
  console.log(Bereken());
  MaakLijn()
  fixedMarker.setOpacity(1);

}
function MaakLijn() {
  var latlngs = [fixedMarkerLatLng, latlng];
  line = L.polyline(latlngs, {
    color: 'black',
    dashArray: '5, 10' // Set dashArray for dotted line
  }).addTo(map);
}
function Bereken() {
  // Calculate distance in meters
  var distance = map.distance(fixedMarkerLatLng, latlng);
  return distance
}
function maak_kaart() {
  map = L.map("map").setView([53.2194, 6.5665], 13); // Centering map on Groningen


  var nlmaps_standaard = L.tileLayer('https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0/standaard/EPSG:3857/{z}/{x}/{y}.png', {
    minZoom: 6,
    maxZoom: 19,
    bounds: [[50.5, 3.25], [54, 7.6]],
    attribution: 'Kaartgegevens &copy; <a href="https://www.kadaster.nl">Kadaster</a>'
  }).addTo(map);

  fixedMarker = L.marker(fixedMarkerLatLng, icon()).addTo(map);
  lock = false;



  map.on('click', function (e) {
    if (!lock) {
      latlng = e.latlng;
      console.log(latlng);
      addMarker();
    }
  });

}