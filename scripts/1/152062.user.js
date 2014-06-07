// ==UserScript==
// @name           Stay Logged In
// @description    Extends cookies expirey date
// @include        https://smile.telkom.co.id/*
// @copyright      Original by JoeSimmons & Greyg00
// ==/UserScript==

var cookies = document.cookie.split(";");
for(var x in cookies)
document.cookie = cookies[x] + ';expires=Thu, 01-Jan-2050 12:34:58 GMT;';