// ==UserScript==
// @name           Usuwator tła w kokpicie
// @namespace      blip.pl
// @include        http://*.blip.pl/dashboard
// @include        http://*.blip.pl/users/*/dashboard
// ==/UserScript==
css = "body { background-image:none !important; background-color:#333 !important";


var head = document.getElementsByTagName('head')[0];
var style= document.createElement('style');
style.type = "text/css";
style.innerHTML = css;
head.appendChild(style);