// ==UserScript==
// @name           Digg Ad Mover
// @namespace      http://www.trackwoot.com/
// @description    Moves the adspot down on digg.com
// @include        http*://*.digg.com*
// ==/UserScript==


theElement = document.getElementById('wrapper').childNodes[0].childNodes[4];
if (theElement)
{
	document.getElementById('wrapper').childNodes[0].removeChild(theElement)
	document.getElementById('wrapper').childNodes[0].appendChild(theElement)
}