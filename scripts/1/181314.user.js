// ==UserScript==
// @name       Statkart on Project GC
// @namespace  http://project-gc.com/
// @version    1.1
// @description  Adds map from Statens Kartverk to Project GC
// @downloadURL   https://userscripts.org/scripts/source/181314.user.js
// @updateURL     http://userscripts.org.nyud.net/scripts/source/181314.meta.js
// @match      http://project-gc.com/*
// @copyright  2013+, Aina Småvik
// ==/UserScript==

var main = function () {
    if (map) {
        
        $(".leaflet-control-layers").remove();
        
        var statensKartverk = new L.TileLayer('http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=topo2&zoom={z}&x={x}&y={y}');
        map.addLayer(statensKartverk);
        map.addControl(new L.Control.Layers({
            'Statens Kartverk':statensKartverk, 
            'Google Maps':gglroad,
            'Google Satellite':gglsat,
            'OSM':osm
        }, overlayLayers));
    }
}

var script = document.createElement('script');
script.appendChild(document.createTextNode('(' + main + ')();'));
(document.body || document.head || document.documentElement).appendChild(script);
