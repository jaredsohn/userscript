// ==UserScript==
// @name           tvtvClean
// @namespace      my.own
// @include        http://www.tvtv.de/tvtv/index.vm?*epgView*
// ==/UserScript==

var wrapper = document.getElementById('content-wrapper');
var mainright = document.getElementById('main_right');
var footer = document.getElementById('footer');

wrapper.removeChild(footer);
mainright.style.left = '0px';
mainright.style.top = '0px';
mainright.style.bottom = '0px';