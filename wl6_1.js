

let myMap = L.map("mapdiv");
const bikeGroup = L.markerClusterGroup().addTo(myMap);


let myLayers = {

    openstreetmap: L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    ),
    geolandbasemap: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
            subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),

    bmapoverlay: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
            subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),

    bmapgrau: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
            subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),

    bmaphidpi: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
            subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),

    bmaporthofoto30cm: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
            subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),
};

myMap.addLayer(myLayers.bmapgrau);

let myMapControl = L.control.layers({
    "Open Streetmap": myLayers.openstreetmap,
    "Geoland Basemap": myLayers.geolandbasemap,
    "Map Grau": myLayers.bmapgrau,
    "Map hochaufgeloest": myLayers.bmaphidpi,
    "Orthophoto 30cm": myLayers.bmaporthofoto30cm,
}, {
        "B Map Overlay": myLayers.bmapoverlay,
        "Stationen": bikeGroup,
    });

myMap.addControl(myMapControl)
myMap.setView([47.267, 11.383], 11);



async function addGeojson(url) {
    console.log("URL wird geladen:", url);
    const response = await fetch(url);
    console.log("Response:", response);
    const wienjson1 = await response.json();
    console.log("GeoJSON:", wienjson1);
    const geojson1 = L.geoJSON(wienjson1, {
        style: function (feature) {
            return { color: "#ff8452" };
        },
        pointToLayer: function (geoJSONPoint, latlng) {
            return L.marker(latlng);
        }
    });
    const hash = new L.Hash(myMap)
    myMap.addControl(new L.Control.Search({
        layer: bikeGroup,
        propertyName: 'STATION',
    }));
    bikeGroup.addLayer(geojson1);
    myMap.fitBounds(bikeGroup.getBounds())
}


const url = "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:CITYBIKEOGD&srsName=EPSG:4326&outputFormat=json"

addGeojson(url);
myMap.addLayer(bikeGroup);