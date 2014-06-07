// ==UserScript==
// @name        Youtube HTTP to HTTPS redirect.
// @namespace   Youtube
// @description Redirects http protocol to https in Youtube. Helps if you are accessing Youtube by Google DNS method.
// @include     http://www.youtube.com/*
// @grant		GM_setValue
// @version     1
// ==/UserScript==

var URL = location.protocol;

if( URL == "http:")
{
//alert(URL);
//location.protocol = GM_setValue "https:";

URL = "https:" + "//" + "www.youtube.com" + location.pathname + location.search;
window.location = URL;
//alert(URL);

}