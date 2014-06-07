// ==UserScript==
// @name           FB SSL Connection
// @namespace      http://userscripts.org/users/204131
// @description    Forces FB to use a SSL connection
// @include        http://www.facebook.com/*

// @version        1.0
// ==/UserScript==

(function(){
var url = window.location.href;

if(url.indexOf("http://www")==0) {
window.location.replace(location.href.replace(url.substring(0,10), "https://ssl"));
}


})();