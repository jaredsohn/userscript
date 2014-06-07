// ==UserScript==
// @name           Probicetina16564
// @namespace      Probicetina16564
// @description    probicetina154914651 465456
// @include        http://xat.com/*
// ==/UserScript==

var logo = document.evaluate("//img[contains(@src, 'http://xat.com/images/tdoodle.png')]", document, null, 9, null).singleNodeValue;

if(logo) {
logo.src = "http://xat.com/images/tplayer.png"}