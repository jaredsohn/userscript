// ==UserScript==
// @name           Allow HTTPS Access to site
// @namespace      http://userscripts.org/users/141844
// @description    Forces all listed websites to go into secure (https) mode and allows access
// @include        https://*
// @include        http://*facebook.com
// @include        http://*facebook.*
// @include        http://www.facebook.*
// @include        http://*.facebook.com
// @include        http://*.facebook.*
// @include        http://*youtube.com
// @include        http://*youtube.*
// @include        http://www.youtube.*
// @include        http://*.youtube.com
// @include        http://*.youtube.*


// @copyright      Hayden Wilson
// @version        1.0.0
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