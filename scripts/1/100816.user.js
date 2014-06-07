// ==UserScript==
// @id             linkrevealerscript@userscripts.org
// @name           Link Revealer
// @version        0.6
// @release        2011-4-17
// @author         Benjamin Harris
// @license        Creative Commons Attribution-NonCommercial-NoDerivs 3.0 Unported License
// @namespace      linkrevealerscript@userscripts.org
// @updateURL      http://userscripts.org/scripts/source/100816.meta.js
// @description    Replaces annoying forum link rules (something(DOT)something, etc.) with the real link.
// @include        *
// ==/UserScript==

function cleanLinks() {
	var text = document.body.innerHTML;
	var pattern4 = /((http\:\/\/)?(www\(dot\))?([a-zA-Z0-9-]*?)\(dot\)){4}?[a-zA-Z]{2,3}/img;
	var pattern3 = /((http\:\/\/)?(www\(dot\))?([a-zA-Z0-9-]*?)\(dot\)){3}?[a-zA-Z]{2,3}/img;
	var pattern2 = /((http\:\/\/)?(www\(dot\))?([a-zA-Z0-9-]*?)\(dot\)){2}?[a-zA-Z]{2,3}/img;
	var pattern1 = /((http\:\/\/)?(www\(dot\))?([a-zA-Z0-9-]*?)\(dot\)){1}?[a-zA-Z]{2,3}/img;
	var matches4 = text.match(pattern4);
	var matches3 = text.match(pattern3);
	var matches2 = text.match(pattern2);
	var matches1 = text.match(pattern1);
	var i;
	var url;
	if (matches4 !== null) {
		for (i=0;i<matches4.length;i++) {
			url = matches4[i].replace(/\(dot\)/img, '.');
				if (url.slice(0, 7) !== 'http://') {
					url = 'http://' + url;
				}
			text = text.replace(matches4[i], '<a href="' + url + '" target="_blank" />' + url + '</a>');
		}
	}
	if (matches3 !== null) {
		for (i=0;i<matches3.length;i++) {
			url = matches3[i].replace(/\(dot\)/img, '.');
				if (url.slice(0, 7) !== 'http://') {
					url = 'http://' + url;
				}
			text = text.replace(matches3[i], '<a href="' + url + '" target="_blank" />' + url + '</a>');
		}
	}
	if (matches2 !== null) {
		for (i=0;i<matches2.length;i++) {
			url = matches2[i].replace(/\(dot\)/img, '.');
				if (url.slice(0, 7) !== 'http://') {
					url = 'http://' + url;
				}
			text = text.replace(matches2[i], '<a href="' + url + '" target="_blank" />' + url + '</a>');
		}
	}
	if (matches1 !== null) {
		for (i=0;i<matches1.length;i++) {
			url = matches1[i].replace(/\(dot\)/img, '.');
				if (url.slice(0, 7) !== 'http://') {
					url = 'http://' + url;
				}
			text = text.replace(matches1[i], '<a href="' + url + '" target="_blank" />' + url + '</a>');
		}
	}
	document.body.innerHTML = text;
}
cleanLinks();