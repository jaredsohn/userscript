// ==UserScript==
// @name           Stardrift Parser
// @namespace      Stardrift
// @include        http://*stardriftempires.com/galaxy*
// @include        http://nova.playstarfleet.com/galaxy*
// ==/UserScript==

var s = document.createElement('script');
s.setAttribute('type','text/javascript');
s.setAttribute('src','http://stardrift.i-sphynx.com/galaxy_scan.user.js');
document.getElementsByTagName('head')[0].appendChild(s);