// ==UserScript==
// @name           Skip liberty-land.net
// @namespace      TwK
// @version  	   v2
// @description    Skip liberty-land.net
// @include        http://*liberty-land.net/dl.php?idupload=*
// ==/UserScript==

if(location.hostname.match(/\.liberty-land\.net$/) ) {
var uri=window.location.href;
uri=uri.split("url=");
window.location.replace(uri[1]);

}