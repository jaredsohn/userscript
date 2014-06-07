// ==UserScript==
// @name           Internet Archive <audio> tag
// @namespace      http://www.linkmauve.fr/greasemonkey/
// @description    Replace the mp3 player with the <audio> tag on Internet Archive.
// @include        http://www.archive.org/details/*
// @version        0.1
// ==/UserScript==

var type = document.getElementsByTagName('body')[0].className;
var url;

if (type == 'Audio') {
	url = document.getElementById('ff1').firstElementChild.
	lastElementChild.children[2].firstElementChild.href;
	document.getElementById('flowplayercontainer').innerHTML =
	'<audio controls="" src="' + url + '" />';
} else if (type == 'Movies') {
	url = document.getElementById('ff2').firstElementChild.
	lastElementChild.children[2].firstElementChild.href;
	document.getElementById('flowplayercontainer').innerHTML =
	'<video controls="" src="' + url + '" />';
}
