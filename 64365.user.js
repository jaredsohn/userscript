// ==UserScript==
// @name           Skip Lablebi
// @description    Skip Lablebi automatically
// @version	   v1 - By TwK
// @include        http://*.lablebi.net/*
// @include        http://*.jwejem.info/*
// ==/UserScript==

// Lablebi and Jewejem websites appears to be the same. The script is compatible for both.
 
var uri=window.location.href;
uri=uri.split("=");
window.location.replace(uri[1]);
