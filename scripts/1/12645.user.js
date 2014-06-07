// ==UserScript==
// @name          Hide MySpace Home Page Switch Area
// @description      For the people that like the classic home page and don't want to look at the switch area every time they go home.
// @namespace     http://userscripts.org/users/34883
// @include       http://home.myspace.com/*=user
// @include       http://home.myspace.com/*=user&*
// ==/UserScript==

s= '#UserHomeSwitch {display:none;}\n';

GM_addStyle(s);