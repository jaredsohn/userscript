// ==UserScript==
// @name           Wordie IPA
// @namespace      wordie
// @description    Changes the phonetic spelling of Wordie to IPA
// @include        http://*.wordie.org/*
// ==/UserScript==
//

var j = document.getElementsByTagName('span');
j[0].innerHTML = "[ˈwɜr.diː]";
