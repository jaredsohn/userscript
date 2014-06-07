// ==UserScript==
// @name           Skip Jwejem
// @description    Skip Jwejem automatically
// @version	   v1 - By TwK
// @include        http://*.jwejem.info/*
// @include        http://*.lablebi.net/*
// ==/UserScript==

// Lablebi and Jewejem websites appears to be the same. The script is compatible for both.
 
var uri=window.location.href;
uri=uri.split("=");
window.location.replace(uri[1]);

// http://www.jwejem.info/index.php?d=http://...