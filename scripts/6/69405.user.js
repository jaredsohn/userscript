// ==UserScript==
// @name           Force Https for Google Profile Page
// @namespace      http://userscripts.org/users/133440
// @description    Forces Google Profile page to use a secure connection，modified from JoeSimmons's Secure connections on sites
// @include        http://www.google.com/profiles/*
// @include        https://*
// @copyright      Lucifr
// @version        0.1
// @license        Creative Commons Attribution-Noncommercial 3.0 License
// ==/UserScript==

(function(){
var url = window.location.href;

if(url.indexOf("http://")==0) {
window.location.replace(location.href.replace(url.substring(0,7), "https://"));
}

if(url.indexOf("https://")==0) {
for(var i=0,link; (link=document.links[i]); i++) {
if(link.href.indexOf("http://")==0) link.href = link.href.replace(link.href.substring(0,7), "https://");
}
}
})();