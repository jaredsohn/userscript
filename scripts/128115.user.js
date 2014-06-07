// NRK-NG user script 0.1
// based on NRK 0.06 Beta by Richard H. Tingstad
// Alexander Rødseth 2012
// 
// Provides a link to stream URL in NRK (Norwegian Broadcasting Corporation) web TV.
// Link is called "Spill i VLC" and placed under description, near "Tips/del video".
//
// Simplifies downloading/dumping the stream. For example, copy the URL and use:
// mplayer -dumpstream -dumpfile file.wmv URL
// Tip: Set your bandwidth high in settings to get highest quality.
//
// To use this script with Firefox, you need Greasemonkey. Works with Opera as well.
//
// ==UserScript==
// @name           NRK-NG
// @namespace      http://drop.by
// @description    Provides link to NRK (Norwegian Broadcasting Corporation) web TV stream URL.
// @include        http://www1.nrk.no/nett-tv/*
// @include        http://www.nrk.no/nett-tv/*
// ==/UserScript==
(function () {

var xmlhttp = new XMLHttpRequest();
var e = document.getElementById('ctl00_ucPlayer_Player');

var url = e.getAttribute('url');
if (url == null) {
	url = e.getElementsByTagName('param')[0].getAttribute('value');
}
url = url.substr(url.indexOf("://") + 3);
url = url.substr(url.indexOf("/"));

if (xmlhttp != null) {
	xmlhttp.onreadystatechange = stateChange;
	xmlhttp.open("GET", url, true);
	xmlhttp.send(null);
}

function stateChange() {
if (xmlhttp.readyState == 4) {
	if (xmlhttp.status == 200) {
		var s = xmlhttp.responseText.indexOf('mms://');
		var i = xmlhttp.responseText.substr(s, xmlhttp.responseText.length - s);
		s = i.indexOf('"');
		i = i.substring(0, s);

		var li = document.createElement('li');
		var largeText = document.createElement('h1');
		var newLink = document.createElement('a');
		var textNode = document.createTextNode('Spill i VLC');
		newLink.setAttribute('href', i);
		newLink.appendChild(textNode);
		largeText.appendChild(newLink)
		li.appendChild(largeText);
		li=largeText;
	}
	else {
		var li = document.createElement('li');
		var textNode = document.createTextNode('Status ' + xmlhttp.status);
		li.appendChild(textNode);
		li=textNode;
	}
	document.getElementById('share-desc').appendChild(li);
}
}


})();
