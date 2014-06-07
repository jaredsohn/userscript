// ==UserScript==
// @name           iGoogle
// @namespace      hack
// @description    change the default width of gadgets containers
// @include        http://www.google.com/ig
// ==/UserScript==
var $ = function (id) { return document.getElementById(id); };
$('c_3').style.width = "0%";
$('c_1').style.width = "55%";
$('c_2').style.width = "42%";
