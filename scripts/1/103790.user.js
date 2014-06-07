// ==UserScript==
// @name          Hide jenkins crap
// @namespace     ORP
// @description	  Another approach to include the jQuery library.
// @author        
// @homepage      
// @include       http://ecsbldrc01d-v01d.drc:8888/*
// ==/UserScript==

var hide = ["top-nav", "top-panel", "side-panel"];

for(var i = 0; i < hide.length; i++) {
	document.querySelector("#" + hide[i]).style.display = "none";
}
