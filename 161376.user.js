// ==UserScript==
// @name        Filelist
// @namespace   filelist
// @include     http://filelist.ro/*
// @include     http://*.filelist.ro/*
// @include     http://flro.org/*
// @include     http://*.flro.org/*
// @version     1.01
// @author      CIGraphics @ FileList.ro
// @grant				none
// ==/UserScript==

var lnk = 'browse.php?cat=';
var cauta = [
						2, // Filme DVD
						3, // Filme DVD-RO
						4, // Filme HD
						5, // Filme VCD
						6, // Filme Vechi
						7, // XXX
						9, // Jocuri PC
						10, // Jocuri Console
						11, // Audio
						12, // Videoclip
						13, // Sport
						16, // Docs
						17, // Linux
						18, // Diverse
						19, // Filme HD-RO
						20, // Blu-ray
						22, // Mobile
						24 // Anime
						];

var t = document.getElementsByClassName("visitedlinks");
var x = t[0].getElementsByTagName("tr");

for(var i=0; i < x.length; i++) {
	var y = x[i].getElementsByTagName("a");
	for (var j=0; j < y.length; j++) {
		for ( var z = 0; z < cauta.length; z++ ) {
			if (y[j].getAttribute('href') == lnk + cauta[z]) {
				x[i].style.display = "none";
			}
		}
	}
}
