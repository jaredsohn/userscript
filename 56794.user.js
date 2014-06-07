// ==UserScript==
// @name          Rutube Downloader
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   Version 3. Created by ZFail. Modified by Slider2k.
// @include       *rutube.ru/tracks/*
// ==/UserScript==

(function () {

var tdElement;
var refElement;
var textElement;
var thisElement;
var addr = document.getElementById('addr').value;
var trackName = addr.substring(addr.indexOf('=')+1);
var blAddr = 'http://bl.rutube.ru/' + trackName + '.iflv';

thisElement = document.getElementById('mn_menu').getElementsByTagName('tr')[0];
if (thisElement) {
	tdElement = document.createElement('td');
	refElement = document.createElement('a');
	textElement = document.createTextNode('Download');
	refElement.appendChild(textElement);
	refElement.setAttribute('href', blAddr);
	refElement.style.color="#ff0000";
	refElement.style.fontSize='larger';
	tdElement.appendChild(refElement);
	thisElement.appendChild(tdElement);
	}
})();