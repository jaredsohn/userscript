// ==UserScript==
// @name          Facebook - Avec Ton Fond d'écran
// @namespace     http://userscripts.org/users/146871
// @description	  Facebook themes
// @author        Anofsh
// @homepage      http://userscripts.org/users/146871
// @include       http://facebook.com/*
// @include       https://facebook.com/*
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// @exclude       http://ilike.com/*
// @exclude       https://ilike.com/*
// @exclude       http://*.ilike.com/*
// @exclude       https://*.ilike.com/*
// @exclude       http://fb.familylink.com/*
// @exclude       https://fb.familylink.com/*
// @exclude       http://*.fb.familylink.com/*
// @exclude       https://*.fb.familylink.com/*
// ==/UserScript==
(function() {
var css = "";
if (false || (document.domain == "facebook.com" || document.domain.substring(document.domain.indexOf(".facebook.com") + 1) == "facebook.com") || (document.domain == "ilike.com" || document.domain.substring(document.domain.indexOf(".ilike.com") + 1) == "ilike.com"))
	css += "html, body, .photo, #nonfooter, #booklet, #content, .UIFullPage_Container, .home, #facebook, .profile{ background: url(\"Lien direct de ton image hébergée\http://www.imagup.com/data/1289333800.html