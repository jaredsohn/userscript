// ==UserScript==
// @name          web.de nologout-skipper
// @description   script to skip the nologout page from web.de
// @include       https://*.web.de/*/nologout*
// @author 	  Tproc
// ==/UserScript==


var url = document.location.href;
var free = url.substring(url.indexOf("freemailing", free), url.indexOf(".web.de", free));
var session = url.substring(url.indexOf("?si", session), url.length);
window.location.href =  free +".web.de/online/frame.htm" + session;



