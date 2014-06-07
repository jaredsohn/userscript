// version 0.1
// 05/09/2009
// Copyright (c) 2009, Antoni Villalonga
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          MotoGP Language Quick Switch
// @namespace     http://www.motogp.com/
// @description   A script to change the links on "translation bar" pointing to same news/video/...
// @include       http://www.motogp.com/*
// ==/UserScript==

URL = window.location.pathname;
actual_lang = window.location.pathname.substring(0,3);
enURL = "http://www.motogp.com" + URL.replace(actual_lang, "/en");
esURL = "http://www.motogp.com" + URL.replace(actual_lang, "/es");
itURL = "http://www.motogp.com" + URL.replace(actual_lang, "/it");
jaURL = "http://www.motogp.com" + URL.replace(actual_lang, "/ja");
frURL = "http://www.motogp.com" + URL.replace(actual_lang, "/fr");
deURL = "http://www.motogp.com" + URL.replace(actual_lang, "/de");
ptURL = "http://www.motogp.com" + URL.replace(actual_lang, "/pt");

var mytransdiv = document.createElement("hacked");
mytransdiv.innerHTML = '<span>Lang: </span><ul>&nbsp;<li><a href="'+enURL+
  '">ENG</a></li>&nbsp;|&nbsp;<li><a href="'+esURL+
  '">ESP</a></li>&nbsp;|&nbsp;<li><a href="'+itURL+
  '">ITA</a></li>&nbsp;|&nbsp;<li><a href="'+jaURL+
  '">JAP</a></li>&nbsp;|&nbsp;<li><a href="'+frURL+
  '">FRA</a></li>&nbsp;|&nbsp;<li><a href="'+deURL+
  '">DEU</a></li>&nbsp;|&nbsp;<li><a href="'+ptURL+
  '">POR</a></li>&nbsp;|</ul>';

myDiv = document.getElementById("languages");
myDiv.removeChild(myDiv.lastChild);
myDiv.removeChild(myDiv.lastChild);
myDiv.removeChild(myDiv.lastChild);
myDiv.removeChild(myDiv.lastChild);

myDiv.insertBefore(mytransdiv,myDiv.firstChild);
