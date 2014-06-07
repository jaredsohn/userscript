// ==UserScript==
// @name           Blic - remove 'najnovije vesti'
// @namespace      http://www.blic.rs
// @description    Remove "NAJNOVIJE VESTI" (it uses lots of CPU)
// @include        http://www.blic.rs/*
// @author				 Aleksandar Stojsavljevic
// ==/UserScript==

var scroller = document.getElementById('tickdiv');
if(scroller != null){
	scroller.innerHTML = "";
}
