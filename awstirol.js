
let myMap = L.map("mapdiv");    // http://leafletjs.com/reference-1.3.0.html#map-l-map
let markerGroup = L.featureGroup();

let myLayers = {
    osm : L.tileLayer(  // http://leafletjs.com/reference-1.3.0.html#map-l-map
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
          subdomains : ["a", "b","c"],
          attribution : "Datenquelle: <a href = 'https://www.openstreetmap.org/'> Openstreetmap </a> Mitwirkende"
        }
    ),
    geolandbasemap : L.tileLayer(
        "https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
            subdomains : ["maps","maps1","maps2","maps3","maps4"],                          // http://leafletjs.com/reference-1.3.0.html#tilelayer-subdomains
            attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"    // http://leafletjs.com/reference-1.3.0.html#tilelayer-l-tilelayer
        }
    ),
    bmapoverlay : L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
            subdomains : ["maps","maps1","maps2","maps3","maps4"],
            attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),
    bmapgrau : L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
            subdomains : ["maps","maps1","maps2","maps3","maps4"],
            attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),
    bmaphidpi : L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
            subdomains : ["maps","maps1","maps2","maps3","maps4"],
            attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),
    bmaporthofoto30cm : L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
            subdomains : ["maps","maps1","maps2","maps3","maps4"],
            attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),
};
myMap.addLayer(myLayers.geolandbasemap);    // http://leafletjs.com/reference-1.3.0.html#layergroup-addlayer
myMap.addLayer(markerGroup)
let myMapControl = L.control.layers({   // http://leafletjs.com/reference-1.3.0.html#control-layers-l-control-layers
    //"Openstreetmap" : myLayers.osm,
    "basemap.at Grundkarte" : myLayers.geolandbasemap,
    //"basemap.at grau" : myLayers.bmapgrau,
    //"basemap.at highdpi" : myLayers.bmaphidpi,
    "basemap.at Orthofoto" : myLayers.bmaporthofoto30cm,
},{
    //"basemap.at Overlay" : myLayers.bmapoverlay,
    "Marker": markerGroup,

},{
  collapsed: false,
}).addTo(myMap);
let myMapScale = L.control.scale({
  position: "bottomleft",
  imperial: false,
  maxWidth: 200,

}

).addTo(myMap)

const uni = [47.264, 11.385];
const usi = [47.257, 11.356];
const technik = [47.263, 11.343];
const patscherkofel = [47.208, 11.460];
const igls = [47.230, 11.408];
const hafelekar = [47.312, 11.383];
const nassereitherAlm =[47.344, 10.850];
const roterSchroffen = [47.040, 10.718];

myMap.addLayer(markerGroup);
const markerOptions = {
    title: "Uni Innsbruck",
    opacity: 0.7,
    draggable: true,
};


//L.marker(uni, markerOptions).addTo(markerGroup);
//L.marker(usi, markerOptions).addTo(markerGroup);
//L.marker(technik, markerOptions).addTo(markerGroup);
//L.marker(patscherkofel, markerOptions).bindPopup("<p>Der schöne Patschi</p><img style='width:200px' style='height:200px' src='https://pixabay.com/get/eb34b20b2ffd053ed1534705fb0938c9bd22ffd41cb3154792f2c77ba1/igls-2134794_1920.jpg' alt='Patscher' />").openPopup().addTo(markerGroup);
//L.marker(igls, markerOptions).addTo(markerGroup);


L.marker(hafelekar, markerOptions).bindPopup("<h4>Station Hafelekar</h4> <p>Temperatur = 1,6°C </p> <p> Messdatum: 2018-04-26 10:10:00</p> <img style='width:200px' style='height:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/seegrube.png' alt='Hafelekar' />").openPopup().addTo(markerGroup);

L.marker(nassereitherAlm, markerOptions).bindPopup("<h4>Station Nassereither Alm</h4> <p>Temperatur = 4°C </p> <p> Messdatum: 2018-04-26 10:00:00</p> <img style='width:200px' style='height:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/nassereith.png' alt='Nassereither Alm' />").openPopup().addTo(markerGroup);

L.marker(roterSchroffen, markerOptions).bindPopup("<h4>Station Roter Schroffen Alm</h4> <p>Temperatur = -1°C </p> <p> Messdatum: 2018-04-26 10:00:00</p> <img style='width:200px' style='height:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/falkaunsalpe.png' alt='Roter Schroffen' />").openPopup().addTo(markerGroup);

myMap.fitBounds(markerGroup.getBounds());
