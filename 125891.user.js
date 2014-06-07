// ==UserScript==
// @name           Google maps + Amapy.cz for GC.com new map
// @namespace      none
// @description    Do nových map na geocaching.com přidá google mapu, google satelitní mapu a turistickou mapu z Amapy.cz
// @include        *geocaching.com/map*
// ==/UserScript==
if (navigator.appName.indexOf('Opera') == -1) {
layers = unsafeWindow.Groundspeak.Map.MapLayers;
} else {
  layers = Groundspeak.Map.MapLayers;
}
layers.push(
    {tileUrl:"http://mt.google.com/vt?&x={x}&y={y}&z={z}",name:"googlemaps",alt:"Google maps",attribution:"Google street",subdomains:"1234",tileSize:256,minZoom:0,maxZoom:22},
    {tileUrl:"http://mt.google.com/vt?lyrs=s&x={x}&y={y}&z={z}",name:"googlemapssat",alt:"Google satelit",attribution:"Google maps Satelit",subdomains:"1234",tileSize:256,minZoom:0,maxZoom:22},
    {tileUrl:"http://maps11.i0.cz/mps/ch_turis/{z}/{x}/{x}_{y}.gif",name:"amapy",alt:"Amapy turistická",attribution:"Amapy turistická",tileSize:256,minZoom:13,maxZoom:16}
    );
    