// ==UserScript==
// @name           tudouautodown
// @namespace  http://twitter.com/minjun
// @include        http://www.tudou.com/albumplay/*.html
// @include		   http://www.tudou.com/listplay/*.html
// @include		   http://www.tudou.com/programs/view/*/
// ==/UserScript==

var currentURL = window.location;
currentURL = "http://www.tudouxia.com"+currentURL.pathname;
window.location.replace ( currentURL );