// ==UserScript==
// @name           Simplified mangashare
// @namespace      waykohler
// @include        http://read.mangashare.com/*.html
// ==/UserScript==

document.getElementsByClassName("logo")[0].style.display = 'none';
document.getElementsByClassName("topad")[0].style.display = 'none';

var menu = document.getElementsByClassName("menu");
menu[0].style.top = "0px";
