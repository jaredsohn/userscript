// ==UserScript==
// @name           Geocaching.com Google maps
// @namespace      gccomgoooglemaps
// @include        http://www.geocaching.com/map/default.aspx*
// ==/UserScript==

if (navigator.appName.indexOf('Opera') == -1) {
layers = unsafeWindow.Groundspeak.Map.MapLayers;
} else {
  layers = Groundspeak.Map.MapLayers;
}


layers.push(
    {tileUrl:"http://mt.google.com/vt?x={x}&y={y}&z={z}",name:"googlemaps",alt:"Google Maps",attribution:"Google maps",subdomains:"1234",tileSize:256,minZoom:0,maxZoom:18});
   
layers.push(
    {tileUrl:"http://mt0.google.com/vt/lyrs=s@110&hl=en&x={x}&y={y}&z={z}",name:"googlemaps",alt:"Google Maps (Satellite)",attribution:"Google maps",subdomains:"1234",tileSize:256,minZoom:0,maxZoom:18});

layers.push(
    {tileUrl:"http://mt0.google.com/vt/v=w2p.110&hl=en&x={x}&y={y}&z={z}",name:"googlemaps",alt:"Google Maps (Terrain)",attribution:"Google maps",subdomains:"1234",tileSize:256,minZoom:0,maxZoom:18});