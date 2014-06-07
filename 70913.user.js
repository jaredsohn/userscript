// ==UserScript==
// @name           picg00lenet
// @namespace      MA
// @description    remove ads and show picture without delay
// @include        http://*.g00le.net/v2.htm?*
// @include        http://174.120.243.237/v2.htm?*
// @version        0.02
// ==/UserScript==

var url=document.location.href;

if(/^http:\/\/(.*\.g00le\.net|174\.120\.243\.237)\/v2\.htm\?/.test(url))
{
	document.body.innerHTML='<center style="padding:30px"><img src="'+url.replace(/v2\.htm\?(?:[^&]+&)*u=([^&]+)&n=/,'users/$1/')+'"></center>';
}