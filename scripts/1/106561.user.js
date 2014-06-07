// ==UserScript==
// @name           Cuevana Stream 5.0
// @namespace      http://www.cuevana.com
// @description    Permite ver videos online alojados en diferentes servidores, a través de Cuevana

// @include http://www.180upload.com/*
// @include http://www.filebox.com/*
// @include http://www.uptobox.com/*
// @include http://www.uploadcore.com/*
// @include http://www.vidbull.com/*
// @include http://www.zalaa.com/*
// @include http://www.cramit.in/*
// @include http://www.cuevana.tv/*
// ==/UserScript==

var loc = (window.location.href.match(/cid=/i) && window.location.href.match(/ctipo=/i));
if (window.location.href.match(/^http:\/\/(www\.)?bayfiles\.com/i) && loc) {
	addScript('bayfiles');
} else if (window.location.href.match(/^http:\/\/(www\.)?180upload\.com/i) && loc) {
	addScript('180upload');
} else if (window.location.href.match(/^http:\/\/(www\.)?filebox\.com/i) && loc) {
	addScript('filebox');
} else if (window.location.href.match(/^http:\/\/(www\.)?uptobox\.com/i)) {
	addScript('uptobox');
} else if (window.location.href.match(/^http:\/\/(www\.)?uploadcore\.com/i) && loc) {
	addScript('uploadcore');
} else if (window.location.href.match(/^http:\/\/(www\.)?vidbull\.com/i) && loc) {
	addScript('vidbull');
} else if (window.location.href.match(/^http:\/\/(www\.)?zalaa\.com/i) && loc) {
	addScript('zalaa');
} else if (window.location.href.match(/^http:\/\/(www\.)?cramit\.in/i) && loc) {
	addScript('cramit');
} else if (window.location.href.match(/^http:\/\/(www\.|beta\.)?cuevana\.(com|co|tv|me)/i)) {
	var n = document.createElement('div');
	n.id = 'plugin_ok';
	n.setAttribute('data-version', '5');
	n.setAttribute('data-revision', '0');
	document.body.appendChild(n);
}
function addScript(id) { 
	var s = document.createElement('script');
	s.setAttribute('type','text/javascript');
	s.setAttribute('src', 'http://sc.cuevana.tv/player/scripts/5/'+id+'.js');
	document.getElementsByTagName('head')[0].appendChild(s);
}