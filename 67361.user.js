// ==UserScript==
// @name           DisableSocialSharingMouseOverLinks
// @namespace      tchami
// @description    Disables social sharing mouseover links (only AddThis for now)
// @include        *
// ==/UserScript==

//Disable addthis
var script = document.createElement('script'); 
script.innerHTML = function addthis_open(a, b, c, d){};
document.getElementsByTagName('head')[0].appendChild(script);

//Disable addtoany
var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '.menu .GET { display: none }';
document.getElementsByTagName('head')[0].appendChild(style);