// ==UserScript== 
// @name instructables-allsteps
// @namespace http://userscripts.org/
// @description Autoload the all steps page on instructables
// @include http://www.instructables.com/id/* 
// @exclude http://www.instructables.com/id/*/*?ALLSTEPS
// ==/UserScript==

var a= location.href;
a = a.concat("?ALLSTEPS");
location.href=a;