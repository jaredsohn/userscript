// ==UserScript==
// @name        FILELIST
// @namespace   filelist
// @include     http://filelist.ro/*
// @include     http://*.filelist.ro/*
// @include     http://flro.org/*
// @include     http://*.flro.org/*
// @version     1
// @author      Lau @ FileList.ro
// ==/UserScript==

var lnk = 'browse.php?cat=';
var cauta = [2, 4, 6, 7, 9, 10, 12, 14, 15, 20, 21, 22, 23, 24];

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