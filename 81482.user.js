// ==UserScript==
// @name           webwereld.nl
// @version        1.0
// @namespace      realbart
// @description    Webwereld zonder banners
// @include        http://webwereld.nl/*
// ==/UserScript==

// Access to window object cross-browser
var uW;
if(typeof unsafeWindow==='object'){uW=unsafeWindow;}else{uW=window;}

// Access jQuery
var $=uW.jQuery;

$('.adsBlock').hide();