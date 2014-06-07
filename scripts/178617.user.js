// ==UserScript==
// @name        OSMOnTweakers
// @namespace   http://tweakers.net/replaceGMaps
// @description Replace Google Maps on Tweakers
// @include     http://tweakers.net/aanbod/*
// @grant       none
// ==/UserScript==

function addCSS(script) {
    var t =document.getElementsByTagName("head")[0];
    var s = document.createElement('link');
    s.rel = "stylesheet";
    s.type = 'text/css';
    s.href = script;
    t.appendChild(s);
}
function addJavascript2(js,pos) {
    var t = document.getElementsByTagName(pos)[0];
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.text = js;
    t.appendChild(s);
}

addCSS("http://cdn.leafletjs.com/leaflet-0.6.4/leaflet.css");
var script="\
function loadScript(url, callback){ \
        var script = document.createElement('script'); \
        script.type = 'text/javascript'; \
        if (script.readyState){  \
            script.onreadystatechange = function(){ \
                if (script.readyState == 'loaded' || \
                        script.readyState == 'complete'){ \
                    script.onreadystatechange = null; \
                    callback(); \
                } \
            }; \
        } else { \
            script.onload = function(){ \
                callback(); \
            }; \
        } \
        script.src = url; \
        document.getElementsByTagName('head')[0].appendChild(script);\
}\
var locs=/LatLng\\(([0-9.]+), ([0-9.]+)\\)/.exec(window.buildGoogleMaps.toString()); \
window.buildGoogleMaps = function(){};\
var lat = locs[1];\
var lon = locs[2];\
loadScript('http://cdn.leafletjs.com/leaflet-0.6.4/leaflet.js', function() {\
    var map = L.map('gMapsField').setView([lat, lon], 13);\
    var mapquestUrl = 'http://{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png', \
    subDomains = ['otile1','otile2','otile3','otile4'], \
    mapquestAttrib = 'Data &copy; <a href=\"http://www.openstreetmap.org/\" target=\"_blank\">OpenStreetMap</a>, Tiles Courtesy of <a href=\"http://www.mapquest.com/\" target=\"_blank\">MapQuest</a> <img src=\"http://developer.mapquest.com/content/osm/mq_logo.png\">'; \
    var mapquest = new L.TileLayer(mapquestUrl, {maxZoom: 18, attribution: mapquestAttrib, subdomains: subDomains}); \
    mapquest.addTo(map); \
    var marker = L.marker([lat, lon]).addTo(map);\
});";
addJavascript2(script,"body");