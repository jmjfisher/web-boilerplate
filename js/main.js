function initializeMap() {
    
    var OSM = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    
    var Imagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });
    
    var map = L.map('map', {
        layers: [OSM]
    });
    
    var baseMaps = {
        "Open Street Map": OSM,
        "Imagery": Imagery
    };
    
    L.control.layers(baseMaps).addTo(map);

    var tractStyle = {
        fillColor: "#C8102E",
        weight: 1.5,
        opacity: .8,
        color: 'white',
        dashArray: '4',
        fillOpacity: 0.4
    }
    
    $.getJSON("data/wi_tracts.geojson", function(data){
        
        var features = data.features;
        
        var tractsLayer = L.geoJSON(features, {
            style: tractStyle,
            onEachFeature: tractData
        }).addTo(map);
        
        map.fitBounds(tractsLayer.getBounds());
        
    });
    
}; // end initializeMap

function tractData(feature,layer){
    
    var popupContent = feature.properties.GEOID+"<br>"+feature.properties.STATEFP;
    
    layer.bindPopup(popupContent);
    
}; // end of tractData

$(document).ready(initializeMap);