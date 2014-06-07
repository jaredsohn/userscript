// ==UserScript==
// @name           Cookie Lifetime Extender
// @namespace      http://userscripts.org/users/23652
// @description    Extends cookies lifetimes
// @include        http://*
// @include        https://*
// @copyright      JoeSimmons & Greyg00
// ==/UserScript==

var cookies = document.cookie.split(";");
for(var x in cookies)
document.cookie = cookies[x] + ';expires=Thu, 01-Jan-2050 12:34:58 GMT;';