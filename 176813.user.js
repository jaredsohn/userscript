// ==UserScript==
// @name        SMF ignore hider
// @namespace   http://brunoaisserver.dtdns.net
// @description Completly hides posts that are in your ignore list
// @include     forum*/index.php?topic=*
// @version     1
// ==/UserScript==

var ignoresFind = /msg_([0-9]+)_ignored_link/gm
var string = document.body.innerHTML
var nextIgnore;
var element;

while((nextIgnore = ignoresFind.exec(string)) !== null){
	if(( element = document.getElementById('msg' + nextIgnore[1]) )){
		element.nextElementSibling.style.display = 'none';
	}
}
