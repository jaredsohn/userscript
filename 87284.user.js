// ==UserScript==
// @name           Replace SSL
// @namespace      SSLreplace.js
// @description    Replace SSL - Changes includes to use SSL
// @include        http://www.google.com/
// ==/UserScript==

window.addEventListener("load",function(){



if(!top.location.href.match(/^https/i)){
document.location = "https" + top.location.href.substr(4);
}


},true)

