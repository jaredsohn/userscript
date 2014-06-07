// ==UserScript==
// @name           B92 - Najnovije vesti
// @namespace      http://www.blic.rs
// @include        http://www.b92.net/sport/
// @author				 Aleksandar Stojsavljevic
// ==/UserScript==

var scroller = document.getElementById('ticker');
if(scroller != null){
	scroller.innerHTML = "";
}