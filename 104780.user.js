// ==UserScript==
// @name           Dilbert Index Number
// @namespace      http://userscripts.org/users/343879
// @description    Displays the Index Number of the strip next to the date.
// @include        http://dilbert.com/strips/comic/*
// ==/UserScript==

var str = document.getElementsByClassName("STR_Image")[0].childNodes[1].src.substring(82);
var date = document.getElementsByClassName("STR_DateStrip")[0].innerHTML;

document.getElementsByClassName("STR_DateStrip")[0].innerHTML = date + ' - ' + str.substring(0, str.indexOf('/'))

document.getElementsByClassName("STR_Search")[0].innerHTML = '';