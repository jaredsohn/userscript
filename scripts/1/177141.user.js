// ==UserScript==
// @name       FacebookNoLogOut
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @include        http*://facebook.com/*
// @include        http*://*.facebook.com/*
// @include        http*://*.facebook.tld/*
// @include        http*://facebook.tld/*
// @description  disables logout
// @copyright  Kedarb
// ==/UserScript==

var ele1;

ele1=document.getElementById("logout_form");

ele1.parentNode.removeChild(ele1);

