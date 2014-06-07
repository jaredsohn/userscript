//
// License       GPLv3
// URL           http://tengattack.com/projects/pluswidget
//
// ==UserScript==
// @name          Mr. Jingles' words
// @namespace     http://tengattack.com/projects/pluswidget
// @description   Change Mr. Jingles' words.
// @author        tengattack
// @version       0.9.2
// @include       https://plus.google.com/*
// ==/UserScript==

var BELLTEXT = "\\雨点姐姐/";
var belltextNotify = function (e) {  var belltextel = document.getElementsByClassName('Kza');  if (belltextel !== undefined && belltextel.length > 0) {    if (belltextel[0].textContent != BELLTEXT && belltextel[0].textContent != "") {      belltextel[0].textContent = BELLTEXT;    }  }};var el = document.getElementsByClassName('ZvqKKc');if (el !== undefined && el.length > 0) {  for (var i = 0; i < el.length; i++) {    el[i].addEventListener('DOMSubtreeModified', belltextNotify, false);  }}