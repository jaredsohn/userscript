// ==UserScript==
// @name           gun_gun AutoRedirect 
// @namespace      http://userscripts.org/scripts/show/95898
// @include        http://m.kaskus.us/*
// @description    AutoRedirect Thread
// @author         gun_gun (http://userscripts.org/users/gun_gun)
// ==/UserScript==

var loc=document.location.href;
loc=loc.replace("m.kaskus.us","opera.kaskus.us");
document.location=loc;