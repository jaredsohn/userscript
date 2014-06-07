// ==UserScript==
// @name          Hide XXX - FileList.ro
// @description   Hide porn torrents at FileList.ro
// @include       *filelist.ro/browse.php*
// @grant         none
// @author        EboLLa @ FileList.ro
// ==/UserScript==

var cauta = 'browse.php?cat=7';

var t = document.getElementsByClassName("visitedlinks");
var x = t[0].getElementsByTagName("tr");

for(var i=0; i < x.length; i++) {
	var y = x[i].getElementsByTagName("a");
	for (var j=0; j < y.length; j++) {
		if (y[j].getAttribute('href') == cauta)
		x[i].style.display = "none";
	}
}
