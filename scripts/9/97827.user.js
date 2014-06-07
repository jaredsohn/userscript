// ==UserScript==
// @name           adf.ly Bypass on Noelbay
// @namespace      http://userscripts.org/users/kakulukian
// @include        *adf.ly*
// ==/UserScript==
var url = document.URL; 
url = url.replace("http://adf.ly/77573/", "");
window.location = url;              
