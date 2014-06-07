// ==UserScript==
// @name           no https on youtbe
// @namespace      http://userscripts.org/users/23652
// @description    Forces known sites to use a secure connection
// @include        https://*youtube.com/*
// ==/UserScript==

(function(){
var url = window.location.href;

if(url.indexOf("https://")==0) {
window.location.replace(location.href.replace(url.substring(0,7), "http://"));
}

})();