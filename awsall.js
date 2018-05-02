

let myMap = L.map("mapdiv");
const awsGroup = L.featureGroup();
let myLayers = {
    
    openstreetmap : L.tileLayer (
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    ),
    geolandbasemap : L.tileLayer (
        "https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
            subdomains : ["maps","maps1","maps2","maps3","maps4"],
            attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),

    bmapoverlay : L.tileLayer (
        "https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
            subdomains : ["maps","maps1","maps2","maps3","maps4"],
            attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),
    
    bmapgrau : L.tileLayer (
        "https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
            subdomains : ["maps","maps1","maps2","maps3","maps4"],
            attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),

    bmaphidpi : L.tileLayer (
        "https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
            subdomains : ["maps","maps1","maps2","maps3","maps4"],
            attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),

    bmaporthofoto30cm : L.tileLayer (
        "https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
            subdomains : ["maps","maps1","maps2","maps3","maps4"],
            attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),
};

myMap.addLayer (myLayers.bmapgrau);

let myMapControl = L.control.layers({
    "Open Streetmap" : myLayers.openstreetmap,
    "Geoland Basemap" : myLayers.geolandbasemap,
    "Map Grau" : myLayers.bmapgrau,
    "Map hochaufgeloest" : myLayers.bmaphidpi,
    "Orthophoto 30cm" : myLayers.bmaporthofoto30cm,
},{
    "B Map Overlay" : myLayers.bmapoverlay,
    "Wetterstationen": awsGroup,
});

myMap.addControl(myMapControl)
myMap.setView([47.267,11.383], 11);

console.log("Stationen: ", stationen);

let geojson = L.geoJSON(stationen).addTo(awsGroup);
geojson.bindPopup(function(layer){
    const props = layer.feature.properties
    const popupText = `<h1>${props.name}</h1>
    <p>Temperatur: ${props.LT} °C</p>`;
    return popupText;
});

myMap.fitBounds(awsGroup.getBounds());
