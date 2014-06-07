// ==UserScript==
// @name       Freemap mapy pre Geocaching
// @namespace  http://www.freemap.sk/
// @version    0.2
// @description  Mapy Freemap.sk pre mapu kešiek na Geocaching.com
// @include        http://www.geocaching.com/map/*
// @include        https://www.geocaching.com/map/*
// @copyright  2014+, Martin Ždila (Freemap Slovakia)
// ==/UserScript==

function freemap() {
    $(".leaflet-control-layers-base").first().find("input").attr('checked', false);
    $(".leaflet-control-layers").first().remove();
    for (layerId in window.MapSettings.Map._layers) {
        if (window.MapSettings.Map._layers[layerId]._url.indexOf("http://otile{s}.mqcdn.com/tiles/") != -1) {
            window.MapSettings.Map.removeLayer(window.MapSettings.Map._layers[layerId]);
            break;
        }
    }
    var defaultLayer = window.L.tileLayer('http://t{s}.freemap.sk/T/{z}/{x}/{y}.jpeg', {
    	attribution:'Mapa &copy; <a href="http://www.freemap.sk/">Freemap Slovakia</a>, údaje &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> prispievatelia',
    	subdomains: "1234",
    	minZoom: 8,
    	maxZoom: 16
    });
    
    var bicycleLayer = window.L.tileLayer('http://t{s}.freemap.sk/C/{z}/{x}/{y}.jpeg', {
    	attribution:'Mapa &copy; <a href="http://www.freemap.sk/">Freemap Slovakia</a>, údaje &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> prispievatelia',
    	subdomains: "1234",
    	minZoom: 8,
    	maxZoom: 16
    });

    var carLayer = window.L.tileLayer('http://t{s}.freemap.sk/A/{z}/{x}/{y}.jpeg', {
    	attribution:'Mapa &copy; <a href="http://www.freemap.sk/">Freemap Slovakia</a>, údaje &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> prispievatelia',
    	subdomains: "1234",
    	minZoom: 8,
    	maxZoom: 16
    });
    
    window.L.control.layers({'Freemap Turistika': defaultLayer, 'Freemap Cyklo': bicycleLayer, 'Freemap Autoatlas': carLayer}).addTo(window.MapSettings.Map);
    
    window.MapSettings.Map.addLayer(defaultLayer);    
}

function freemap_init() {
    var script = document.createElement('script');
    script.textContent = '(' + freemap + ')()';
    (document.head||document.documentElement).appendChild(script);
    script.parentNode.removeChild(script);
}

setTimeout(freemap_init, 1000);

