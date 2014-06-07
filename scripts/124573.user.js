// ==UserScript==
// @name           Funpic Hide Header
// @namespace      utilitats
// @description    Hides the header bar at funpic.hu
// @include        http://*.funpic.hu/*
// ==/UserScript==

function hideElement (sId){
	var el = document.getElementById (sId);
	if (el){
			el.style.display="none";
	}
}

hideElement("header");