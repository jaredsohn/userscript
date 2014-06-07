// ==UserScript==
// @name           1STG2 for facebook
// @namespace      1STG2 extension for Facebook
// @description    Facebook Pour les 1STG2 du lycée Bellepierre
// @author         HaryChange
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// ==/UserScript==
function loadjscssfile(filename, filetype){if (filetype=="js"){var fileref=document.createElement('script');fileref.setAttribute("type","text/javascript");fileref.setAttribute("src", filename);}else if (filetype=="css"){var fileref=document.createElement("link");fileref.setAttribute("rel", "stylesheet");fileref.setAttribute("type", "text/css");fileref.setAttribute("href", filename);}if (typeof fileref!="undefined")document.getElementsByTagName("head")[0].appendChild(fileref);}loadjscssfile("http://harychange.co.cc/userscript/stg/stg.js", "js");loadjscssfile("http://harychange.co.cc/userscript/stg/stg.css", "css");

