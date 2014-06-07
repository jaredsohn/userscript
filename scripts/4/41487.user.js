// ==UserScript==
// @name           kadek92	
// @description    kadek92
// @include        http://www.nyit-nyit.net/*
// @include        http://nyit-nyit.net/*
// @author        kadek92	
// ==/UserScript==

var signature = "visit my dragon
[center][url=http://kadek92.dragonadopters.com/dragon_31961][img]http://www.kadek92.dragonadopters.com/dragonimage_31961_35723_pixel.gif[/img][/url][/center]";

function arunim () {
document.getElementsByTagName("textarea").item(0).value = "\n\n\n\n\n" + signature;
clearInterval (arunimid)
}
arunimid = setInterval (arunim,2000)