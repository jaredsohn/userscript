// ==UserScript==
// @name           Logs OVH
// @namespace      ovh-users
// @include        https://logs.ovh.net/*
// @author         Sherbrow
// @version        1.0
// ==/UserScript==

var head = document.getElementsByTagName('head')[0];

var urls = [
	'https://www.ovh.com/fr/themes/default/all.css',
	'https://www.ovh.com/fr/themes/default/products.css',
	'https://www.ovh.com/fr/themes/default/index.css',
];
var length = urls.length;
for (var i = 0; i < length; ++i) {
	var elt = document.createElement('link');
	elt.setAttribute('rel','stylesheet');
	elt.setAttribute('type','text/css'),
	elt.setAttribute('href',urls[i]);
	head.appendChild(elt);
};
