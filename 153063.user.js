// ==UserScript==
// @name           iPhone icon grabber 
// @description    Allows you to download the iPhone icon of the corresponding app. Just click the size below the icon to download the requested size.
// @include        htt*://itunes.apple.com/*/app/*
// @include        htt*://itunes.apple.com/app/*
// @include        htt*://itunes.apple.com/*
// @author         K.M. de Haan
// @authorURL	   http://www.k-graphics.nl
// @downloadURL    https://userscripts.org/scripts/source/153063.user.js
// @updateURL      https://userscripts.org/scripts/source/153063.meta.js
// @icon	   http://i1229.photobucket.com/albums/ee462/joeralit/jempollike.png
// @version        1.3
// @license        GNU
// ==/UserScript==

var area = document.getElementById('left-stack').getElementsByTagName('div')[0];
var icon = area.getElementsByTagName('a')[0].getElementsByTagName('div')[0].getElementsByTagName('img')[0].src;
var div = document.createElement('div');
var sizes = [53, 100, 175, 512];
div.textContent = '| ';
for (var i in sizes) {
	var iconLink = document.createElement('a');
	iconLink.href = icon.replace('.175x175-75.jpg', '.' + sizes[i] + 'x' + sizes[i] + '-75.jpg');
	iconLink.target = '_blank';
	iconLink.textContent = sizes[i];
	div.appendChild(iconLink);
	div.appendChild(document.createTextNode(' | '));
}
area.insertBefore(div, area.getElementsByClassName('action view-in-itunes')[0]);