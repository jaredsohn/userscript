// ==UserScript==
// @name        Geocaching Map show coords
// @description Displays the mouse coordinates on the title bar when holding down Ctrl key
// @namespace   JabezJones
// @include     http://www.geocaching.com/map/*
// @include     https://www.geocaching.com/map/*
// @version     0.1
// @grant       none
// ==/UserScript==

//http://www.geocaching.com/map/?ll=40.70,-73.43

var f1='L.LatLng.prototype.toDMString = function() {var ew=(this.lng>0?1:-1), ns=(this.lat>0?1:-1), dx=Math.abs(this.lng), dy=Math.abs(this.lat), mx=60*(dx%1), my=60*(dy%1); return "("+(ns*Math.floor(dy))+"*"+(my<10?"0":"")+my.toFixed(4)+", "+(ew*Math.floor(dx))+"*"+(mx<10?"0":"")+mx.toFixed(4)+")";}; ';
var f2='MapSettings.Map.on("mousemove", function(evt) {if(!evt.originalEvent.ctrlKey) return; MapSettings.Map._container.style.cursor="crosshair"; var z=evt.target._zoom, size0=156543.033928*256, sizeZ=size0*Math.pow(2,-z), output=evt.latlng.toDMString(); document.title=output+" err:"+(sizeZ/256).toFixed(2)+" m";}); ';
var f3='MapSettings.Map._layers["36"].options.maxZoom=20; console.log("GC_Coords loaded"); ';

unsafeWindow.setTimeout(f1+f2,5000);
