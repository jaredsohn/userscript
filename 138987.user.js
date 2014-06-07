// ==UserScript==
// @name           Grepolis Redirection
// @namespace      Quack
// @description    Auto Redirect to link
// @include        http://*.grepolis.*/start/redirect*
// ==/UserScript==

// Original script and idea by Aqua of Kaos
// http://userscripts.org/scripts/show/102111
// I made a few adjustments to make it work for every language

var worldID=/:\/\/([^./]+)/.exec(window.location.href)[1];
var langID = worldID.substr(0,2);
var URLs;
var i=0;
var currentLocation =  document.location.href;

if (currentLocation.indexOf('http://'+langID+'.grepolis.com/start/redirect?url=h')!=-1)
{
i=1;
var newLocation = currentLocation.replace('http://'+langID+'.grepolis.com/start/redirect?url=h','h');
newLocation = unescape(newLocation);
document.location.href = newLocation;
}