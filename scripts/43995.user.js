// NRK user script
// Richard H. Tingstad
//
// Provides a link to stream URL in NRK (Norwegian Broadcasting Corporation) web TV.
// Link is called "Straumpeikar" and placed after description under video.
//
// Allows opening of stream in other players. For example, copy the URL and run:
// mplayer URL
// Tip: Set your bandwidth high in settings to get highest quality.
//
// To use this script with Firefox, you need Greasemonkey. Works with Opera and
// Google Chrome as well.
//
// ==UserScript==
// @name           NRK
// @namespace      http://drop.by
// @description    Provides link to NRK (Norwegian Broadcasting Corporation) web TV stream URL.
// @version        1.0
// @include        http://www1.nrk.no/nett-tv/*
// @include        http://www.nrk.no/nett-tv/*
// @match          http://www1.nrk.no/nett-tv/*
// @match          http://www.nrk.no/nett-tv/*
// ==/UserScript==
(function () {

var xmlhttp = new XMLHttpRequest();
var e = document.getElementById('ctl00_ucPlayer_Player');
if(!e) return;
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
//		xmlhttp.responseXML.getElementsByTagName('ref')[0];
		var s = xmlhttp.responseText.indexOf('mms://');
		var i = xmlhttp.responseText.substr(s, xmlhttp.responseText.length - s);
		s = i.indexOf('"');
		i = i.substring(0, s);

		var newLink = document.createElement('a');
		var textNode = document.createTextNode('Straumpeikar');
		newLink.setAttribute('href', i);
		newLink.appendChild(textNode);
		write(newLink);
	}
	else {
		var textNode = document.createTextNode('Status ' + xmlhttp.status);
		write(textNode);
	}
}
}

function write(node){
	var o=document.getElementById('share-desc');
	if(o) o.appendChild(node);
	else e.parentNode.insertBefore(node,e.nextSibling);
}

})();
