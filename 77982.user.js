// ==UserScript==
// @name           Lablebi and Jwejem remover
// @description    Skips Lablebi and Jwejem ad filters
// @version	   v1 - By TwK
// @include        http://*.lablebi.net/*
// @include        http://*.jwejem.info/*
// ==/UserScript==

// Lablebi and Jewejem websites appears to be the same. The script is compatible for both.
// Creation of a new one isn't so useful, but...
 
var uri=window.location.href;
uri=uri.split("=");
window.location.replace(uri[1]);
