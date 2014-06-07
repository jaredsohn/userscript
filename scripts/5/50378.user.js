// ==UserScript==
// @name           Gonintendo Edit Button Fix
// @namespace      http://www.gonintendo.com
// @include        http:*gonintendo.com*
// @description	   Replaces raw html entities with proper sign
// ==/UserScript==

var body = document.getElementsByTagName("body").innerHTML;

var html_entities = new Array();

html_entities['double_quotes'] = /&amp;quot;/ig;
html_entities['gt'] = /&amp;gt;/ig;
html_entities['lt'] = /&amp;lt;/ig;
html_entities['amp'] = /&amp;amp;/ig;

document.body.innerHTML = document.body.innerHTML.replace(html_entities['double_quotes'], "\"");
document.body.innerHTML = document.body.innerHTML.replace(html_entities['gt'], ">");
document.body.innerHTML = document.body.innerHTML.replace(html_entities['lt'], "<");
document.body.innerHTML = document.body.innerHTML.replace(html_entities['amp'], "&");




