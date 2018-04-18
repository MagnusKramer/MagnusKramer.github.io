

let myMap = L.map("mapdiv");
let myLayer = L.tileLayer ("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");

let url = "https://maps.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{x}/{y}.png"

myMap.addLayer (myLayer);
myMap.setView([47.267,11.383], 11);

