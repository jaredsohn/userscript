// ==UserScript==
// @name           unutulmazfilmler otomatik reklam gec
// @namespace      unutulmazfilmler_reklam_gec
// @description    Otomatik olarak unutulmazfilmler.com reklam geç linkine tiklar.
// @include        http://www.unutulmazfilmler.com/*
// @include        http://unutulmazfilmler.com/*
// ==/UserScript==
// nilux , 2014-01-19

var reklambtn= document.querySelector ("#reklami2>.hrad>.beyazorta2 a");
var clickEvent = document.createEvent ('MouseEvents');
clickEvent.initEvent ('click', true, true);
reklambtn.dispatchEvent (clickEvent);
