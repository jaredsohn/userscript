// ==UserScript==
// @name           rpol UI enhancements
// @namespace      john@mort.net
// @description    Makes some changes to the rpol.net UI to take advantage of resolutions larger than 800x600
// @include        http://rpol.net/*
// ==/UserScript==


var textareas = document.getElementsByTagName("textarea");

for (var i = 0; i < textareas.length; i++) 

{
   textareas[i].cols = 150;
   textareas[i].rows = 30;

}