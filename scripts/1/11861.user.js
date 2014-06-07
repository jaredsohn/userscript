// ==UserScript==
// @name           Ligaki mobile mp3 ringtones and wallpaper downloader
// @version        1.0
// @namespace      http://tevaum.eti.br/ff/gmus
// @author         Estêvão Samuel Procópio
// @description    Download wallpapers and mp3 ringtones from ligaki.com.br
// @include        http://200.143.24.213/ligaki/crazytones.aspx*
// @include        http://200.143.24.213/ligaki/mp3tones.aspx*
// @include        http://200.143.24.213/ligaki/wp_content.aspx*
// ==/UserScript==

Array.prototype.contains = function (obj) {
	for (var i=0; i<this.length; i++) {
		if (this[i] == obj) return true;
	}
	return false;
}

document.getElementsByClassName = function (classname) {
	var arr = new Array();
	
	var els = this.getElementsByTagName('*');

	for(var i=0; i<els.length; i++) {
		var clsArray = els[i].className.split(' '); 
		if ( clsArray.contains (classname) ) arr.push(els[i]);
	}

	return arr;
}

function changeAudioLinks (div) {
	var baseURL = 'http://www.ligaki.com.br/xml/preview/';
	var mp3 = div.childNodes[0].getAttribute ('href').match (/PlayMusic\('(.*?)',/)[1];
	
	div.childNodes[0].setAttribute ('href', baseURL + mp3);
}

function changeImageLinks (span) {
	var img = span.childNodes[0].childNodes[0].getAttribute('src').replace (/ex\./, '');
	span.childNodes[0].childNodes[0].setAttribute('src', img);
}

var divs = document.getElementsByClassName('content_previewpoly_TT');
for (var i = 0; i < divs.length; i++ ) changeAudioLinks ( divs[i] );

var spans = document.getElementsByClassName('image_preview_WP');
for (var i = 0; i < spans.length; i++ ) changeImageLinks ( spans[i] );