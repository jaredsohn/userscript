// ==UserScript==
// @name           Stay Logged In - Filezonic, Warez-BB
// @description    Extends cookies expirey date, based off http://userscripts.org/users/23652
// @include        http://*.filesonic.com/*
// @include        http://*.warez-bb.org/*
// @copyright      Terry174 (Original by JoeSimmons & Greyg00)
// ==/UserScript==

var cookies = document.cookie.split(";");
for(var x in cookies)
document.cookie = cookies[x] + ';expires=Thu, 01-Jan-2050 12:34:58 GMT;';