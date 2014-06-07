// ==UserScript==
// @name           eMule Island Stop Popup
// @namespace      http://blog.kodono.info/wordpress/greasemonkey/
// @description    Empêche la popup de publicité quand on clique dans la zone de recherche
// @version        2009103100
// @include        http://www.emule-island.com/*
// ==/UserScript==


window.setCookie = function (name, value, expires, path, domain, secure) {
  var curCookie = name + "=" + escape(value) +
      ((expires) ? "; expires=" + expires.toGMTString() : "") +
      ((path) ? "; path=" + path : "") +
      ((domain) ? "; domain=" + domain : "") +
      ((secure) ? "; secure" : "");
   
  document.cookie = curCookie;
}

setCookie('popUnderEI','true');