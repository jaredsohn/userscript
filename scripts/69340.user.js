// ==UserScript==
// @name           iPhone icon grabber
// @description    Gets the source artwork for iPhone apps
// @version        1.2
// @include        http://itunes.apple.com/*/app/*
// @include        http://itunes.apple.com/app/*
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