// ==UserScript==
// @name        sicurezzafvg skipper
// @namespace   DE8
// @description evita elevate rotture di coglioni
// @include     http://www.sicurezzascuolefvg.it/*
// @exclude     http://www.sicurezzascuolefvg.it/verificafinale*
// @version     1.1
// @grant       none
// @run-at 		document-end
// @require     http://code.jquery.com/jquery-1.10.1.min.js
// ==/UserScript==


unsafeWindow.timer=0;
unsafeWindow.showRemaining();

//alert($( "#countdown a" ).eq(0).attr("href"));
sito="http://www.sicurezzascuolefvg.it/"+$( "#countdown a" ).eq(0).attr("href");
//location.href=sito;
//$( "#countdown a" ).click();