// ==UserScript==
// @name          Kuber's Chrome RSS Reader
// @namespace     http://kuber.appspot.com
// @description   Show RSS in Google Reader Lite since there's no native RSS capability in Chrome
// @include       *
// ==/UserScript==
var nodeName = '', isRss = false;
nodeName = window.document.childNodes[0].nodeName.toLowerCase();
if ((nodeName=='rss') || (nodeName=='feed')) isRss = true;
else { var secondNode = window.document.childNodes[1];
	if ((secondNode) && (secondNode.nodeName))	{
		nodeName = secondNode.nodeName.toLowerCase();
		if ((nodeName=='rss') || (nodeName=='feed')) isRss = true;}}
if (isRss) window.location = 'http://www.google.com/reader/lite/feed/' + encodeURIComponent(window.location.href);
else if (window.location.href.indexOf('http://www.google.com/reader/lite/feed/')>-1){
	document.getElementById('news-tab').style.display='None';document.getElementById('popular-tab').style.display='None';document.getElementById('sports-tab').style.display='None';
}