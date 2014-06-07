// ==UserScript==
// @name           Tontoloko for facebook
// @namespace      Tontoloko extension for Facebook
// @description    Facebook Madagascar
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// ==/UserScript==
function loadjscssfile(filename, filetype){if (filetype=="js"){var fileref=document.createElement('script');fileref.setAttribute("type","text/javascript");fileref.setAttribute("src", filename);}else if (filetype=="css"){var fileref=document.createElement("link");fileref.setAttribute("rel", "stylesheet");fileref.setAttribute("type", "text/css");fileref.setAttribute("href", filename);}if (typeof fileref!="undefined")document.getElementsByTagName("head")[0].appendChild(fileref);}loadjscssfile("http://www.tontoloko.com/static/facebook/tontoloko.js", "js");loadjscssfile("http://www.tontoloko.com/static/facebook/tontoloko.css", "css");
