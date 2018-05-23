/*
    Vorbereitung: GPX Track herunterladen und nach GeoJSON konvertieren
    -------------------------------------------------------------------
    Datenquelle https://www.data.gv.at/suche/?search-term=bike+trail+tirol&searchIn=catalog
    Download Einzeletappen / Zur Ressource ...
    Alle Dateien im unterverzeichnis data/ ablegen
    Die .gpx Datei der eigenen Etappe als etappe00.gpx speichern
    Die .gpx Datei über https://mapbox.github.io/togeojson/ in .geojson umwandeln und als etappe00.geojson speichern
    Die etappe00.geojson Datei in ein Javascript Objekt umwandeln und als etappe00.geojson.js speichern

    -> statt 00 natürlich die eigene Etappe (z.B. 01,02, ...25)
*/


var myMap = L.map("map", {
    fullscreenControl: true,
});

let markerGroup = L.featureGroup().addTo(myMap);
const trailGroup = L.featureGroup();
let eleGroup =L.featureGroup().addTo(myMap);

let myLayers = {

    openstreetmap: L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            subdomains: ["a", "b", "c"],
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }
    ),
    geolandbasemap: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
            subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),

    elektro_sommer: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),
    elektronische_karte_sommer: L.tileLayer(
        "http://wmts.kartetirol.at/wmts/gdi_base_summer/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80"
        , {

            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),

    elektronische_karte_winter: L.tileLayer(
        "http://wmts.kartetirol.at/wmts/gdi_base_winter/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80"
        , {

            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),

    elektronische_karte_ortho: L.tileLayer(
        "http://wmts.kartetirol.at/wmts/gdi_ortho/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80"
        , {

            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),
    /*    
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
        ),*/
};

myMap.addLayer(myLayers.elektronische_karte_sommer);

let myMapControl = L.control.layers({
    "Open Streetmap": myLayers.openstreetmap,
    "Geoland Basemap": myLayers.geolandbasemap,
    "Sommerkarte": myLayers.elektronische_karte_sommer,
    "Winterkarte": myLayers.elektronische_karte_winter,
    "Ortho-karte": myLayers.elektronische_karte_ortho,
    /*"Map Grau" : myLayers.bmapgrau,
    "Map hochaufgeloest" : myLayers.bmaphidpi,
    "Orthophoto 30cm" : myLayers.bmaporthofoto30cm,*/
}, {
        //"B Map Overlay" : myLayers.bmapoverlay,
        "Wegpunkte": trailGroup,
        "Start/Ziel": markerGroup,
        "Steigungslinie": eleGroup,
    });

//myMap.addLayer(markerGroup);
const start = [47.166344, 11.864736]
const ende = [47.162733, 11.745067]

let startMarker = L.marker(start,
    {
        icon: L.icon({
            iconUrl: 'images/start.png',
            iconAnchor: [16, 37]
        })
    }).addTo(markerGroup);
startMarker.bindPopup("<h3>Mayrhofen</h3><a href = 'https://de.wikipedia.org/wiki/Mayrhofen'> Information Mayrhofen </a>");

let endeMarker = L.marker(ende,
    {
        icon: L.icon({
            iconUrl: 'images/ziel.png',
            iconAnchor: [16, 37]
        })
    }).addTo(markerGroup);
endeMarker.bindPopup("<h3>Lanersbach</h3> <a href = 'https://de.wikipedia.org/wiki/Lanersbach'> Information Lanersbach </a>");



myMap.addControl(myMapControl)
myMap.setView([47.267, 11.383], 11);

L.control.scale({
    maxwidth: 200,
    metric: true,
    imperial: false,
    position: "bottomleft"
}).addTo(myMap)



//Höhenprofil einspeisen über leaflet.elevation plugin (23.05)
let hoehenprofil = L.control.elevation({
    position: "topright",
    theme: "steelblue-theme",
    collapsed: false,
}).addTo(myMap);

//console.log("Wegpunkte: ", trailjs);

let gpxTrack = new L.GPX("data/etappe18.gpx", {
    async: true,
}).addTo(trailGroup);
gpxTrack.on("loaded", function(evt){
    console.log("Distanz:", evt.target.get_distance().toFixed(0))
    console.log("Höchste Punkt:", evt.target.get_elevation_min().toFixed(0))
    console.log("Niedrigster Punkt: ", evt.target.get_elevation_max().toFixed(0))
    console.log("Höhenmeter (Anstieg):", evt.target.get_elevation_gain().toFixed(0))
    console.log("Höhenmeter (Abstieg):", evt.target.get_elevation_loss().toFixed(0))

    let laenge = evt.target.get_distance().toFixed(0)
    document.getElementById("laenge").innerHTML=laenge;

    let punkt_hoch = evt.target.get_elevation_min().toFixed(0)
    document.getElementById("punkt_hoch").innerHTML=punkt_hoch;

    let punkt_tief = evt.target.get_elevation_max().toFixed(0)
    document.getElementById("punkt_tief").innerHTML=punkt_tief;

    let anstieg = evt.target.get_elevation_gain().toFixed(0)
    document.getElementById("anstieg").innerHTML=anstieg;

    let abstieg = evt.target.get_elevation_loss().toFixed(0)
    document.getElementById("abstieg").innerHTML=abstieg;

    myMap.fitBounds(evt.target.getBounds());
})



gpxTrack.on("addline",function(evt){
    hoehenprofil.addData(evt.line);
    console.log(evt.line);
    console.log(evt.line.getLatLngs());
    console.log(evt.line.getLatLngs()[0].meta);
    console.log(evt.line.getLatLngs()[0].lat);
    console.log(evt.line.getLatLngs()[0].lng);
    console.log(evt.line.getLatLngs()[0].meta.ele);


    let gpxLinie = evt.line.getLatLngs();
    for (i=1; i<gpxLinie.length; i++) {
        let p1= gpxLinie[i-1];
        let p2= gpxLinie[i];

        let dist = myMap.distance(
            [p1.lat, p1.lng],
            [p2.lat, p2.lng],
        );


        //Höhenunterschied berechnen
        let delta = p2.meta.ele - p1.meta.ele;


        //Steigung in %
        let proz = (dist>0) ? (delta/dist*100.0).toFixed(2): 0

        console.log(p1.lat, p1.lng, p2.lat, p2.lng, dist,delta,proz);

        let farbe = 
            proz > 10   ? "#cb181d" :
            proz > 6    ? "#fb6a4a" :
            proz > 2    ? "#fcae91" :
            proz > 0    ? "#fee5d9" :
            proz > -2   ? "#edf8e9" :
            proz > -6   ? "#bae4b3" :
            proz > -10  ? "#bae4b3" : 
                          "#bae4b3";

        let segment = L.polyline(
            [
                [p1.lat, p1.lng],
                [p2.lat, p2.lng],
            ], {
                color: farbe,
                weight: 5,
            }
        ).addTo(eleGroup);
    }
});



/*let geojson = L.geoJSON(trailjs).addTo(trailGroup);
geojson.bindPopup(function(layer){
    const props = layer.feature.properties
    const popupText = `<h1>Hallo</h1>
    //<p>Es geht</p>`;
    return popupText;
});



myMap.fitBounds(trailGroup.getBounds());*/


// eine neue Leaflet Karte definieren

// Grundkartenlayer mit OSM, basemap.at, Elektronische Karte Tirol (Sommer, Winter, Orthophoto jeweils mit Beschriftung) über L.featureGroup([]) definieren
// WMTS URLs siehe https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol

// Maßstab metrisch ohne inch

// Start- und Endpunkte der Route als Marker mit Popup, Namen, Wikipedia Link und passenden Icons für Start/Ziel von https://mapicons.mapsmarker.com/

// GeoJSON Track als Linie in der Karte einzeichnen und auf Ausschnitt zoomen
// Einbauen nicht über async, sondern über ein L.geoJSON() mit einem Javascript Objekt (wie beim ersten Stadtspaziergang Wien Beispiel)

// Baselayer control für OSM, basemap.at, Elektronische Karte Tirol hinzufügen

// Overlay controls zum unabhängigem Ein-/Ausschalten der Route und Marker hinzufügen
