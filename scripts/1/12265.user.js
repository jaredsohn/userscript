// ==UserScript==
// @name          Rutube Downloader
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   Version 2. Created by ZFail.
// @include       *rutube.ru/tracks/*
// ==/UserScript==

var tdElement;
var refElement;
var textElement;
var hrElem;
var thisElement;
var addr = window.location.href;
var trackName = addr.substring(addr.indexOf('=')+1);
var blAddr = 'http://bl.rutube.ru/' + trackName + '.iflv';
var drAddr = 'http://downloads.rutube.ru/source/'+trackName[0]+trackName[1]+'/'+trackName[2]+trackName[3]+'/'+trackName + '.avi';

thisElement = document.getElementsByTagName('H3')[0].parentNode.parentNode;
if (thisElement) 
{
	tdElement = document.createElement('tr');
    refElement = document.createElement('a');
    textElement = document.createTextNode('Download using bl.rutube');
    refElement.appendChild(textElement);
    refElement.setAttribute('href', blAddr);
    tdElement.appendChild(refElement);
    thisElement.parentNode.insertBefore(tdElement, thisElement);

	tdElement = document.createElement('tr');
    refElement = document.createElement('a');
    textElement = document.createTextNode('Download source avi');
    refElement.appendChild(textElement);
    refElement.setAttribute('href', drAddr);
    tdElement.appendChild(refElement);
    thisElement.parentNode.insertBefore(tdElement, thisElement);
}
