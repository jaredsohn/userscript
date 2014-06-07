// Tv3 alacarta downloader user script
// version 0.2 BETA!
// 2009-11-25
// Copyright (c) 2009, Oriol Verdú
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Tv3 alacarta", and click Uninstall.
//
// --------------------------------------------------------------------
// ==UserScript==
// @name           Tv3 alacarta Downloader
// @namespace      http://www.tv3.cat/videos/
// @description    Downloader per a els videos de Tv3 alacarta. Afegeix un link per a descarregar el video al damunt mateix d'aquest.
// @include        http://www.tv3.cat/videos/*
// ==/UserScript==
var loc=window.location.href.replace("http://www.tv3.cat/videos/","");
var index=loc.indexOf('/');
if (index != -1){
 loc=loc.substring(0,index);
}

var newLocation="http://www.tv3.cat/su/tvc/tvcConditionalAccess.jsp?ID="+loc+"&QUALITY=H&FORMAT=FLV&rnd=481353"

GM_xmlhttpRequest({
	method: 'GET',
	url: newLocation,
	headers: {
		'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
		'Accept': 'application/atom+xml,application/xml,text/xml',
	},
	onload: function(responseDetails) {
		var parser = new DOMParser();
		var dom = parser.parseFromString(responseDetails.responseText,"application/xml");
		var entries = dom.getElementsByTagName('item');
		var media;
		for (var i = 0; i < entries.length; i++) {
			media = entries[i].getElementsByTagName('media')[0].textContent;
			media = media.replace("rtmp://","http://").replace("-str","").replace("ondemand/","");
			
			
			var main, newElement;
			main = document.getElementById('flashcontent');
			if (main) {
				newElement = document.createElement('div');
				newElement.innerHTML='<a href="'+media+'">Descarrega el video!</a>';
				main.parentNode.insertBefore(newElement, main);
			}
		}
	}
});