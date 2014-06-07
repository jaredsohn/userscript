// ==UserScript==
// @name                Kaskus Signature
// @description         Auto Signature
// @include             http://www.kaskus.us/*
// @include             http://kaskus.us/*
// @author              AeArc
// ==/UserScript==

var signature = "[quote][CENTER][img]http://cdn-u.kaskus.us/43/dm4j6j5x.gif[/img][/CENTER][/quote]\n\n\n\n[right][img]http://cdn-u.kaskus.us/43/1gcflmxn.png[/img][/right]";

function arunim () {
document.getElementsByTagName("textarea").item(0).value = "" + signature; 
clearInterval (arunimid) 
}  

arunimid = setInterval (arunim,0)