
let myMap = L.map("mapdiv");    // http://leafletjs.com/reference-1.3.0.html#map-l-map
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


let myMapControl = L.control.layers({   // http://leafletjs.com/reference-1.3.0.html#control-layers-l-control-layers
    "Openstreetmap" : myLayers.osm,
    "basemap.at Grundkarte" : myLayers.geolandbasemap,
    "basemap.at grau" : myLayers.bmapgrau,
    "basemap.at highdpi" : myLayers.bmaphidpi,
    "basemap.at Orthofoto" : myLayers.bmaporthofoto30cm,
},{
    "basemap.at Overlay" : myLayers.bmapoverlay,

},{
  collapsed: false,
});
let myMapScale = L.control.scale({
  position: "bottomleft",
  imperial: false,
  maxWidth: 200,

}

).addTo(myMap)

L.marker([47.264,11.385], {
    title: "Uni Innsbruck",
    opacity: 0.4,
    draggable: true;
}).addTo(myMap);

myMap.setView([47.264, 11.385], 16);

myMap.addControl(myMapControl); // http://leafletjs.com/reference-1.3.0.html#map-addcontrol


myMap.setView([47.267,11.383], 11); // http://leafletjs.com/reference-1.3.0.html#locate-options-setview
L.marker([47.264,11.385]).addTo(myMap);