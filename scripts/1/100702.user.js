// ==UserScript==
// @name           Rediff India Connection
// @namespace      http://userscripts.org/users/204131
// @description    Forces rediff.com to open as in.rediff.com
// @include        http://www.rediff.com/*
// @include        https://www.rediff.com/*

// @version        1.0
// ==/UserScript==

(function(){
var url = window.location.href;

if(url.indexOf("http://www")==0) {
window.location.replace(location.href.replace(url.substring(0,10), "http://in"));
}


})();