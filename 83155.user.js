// ==UserScript==
// @name           Mixpanel Funnel Property Trimmer
// @namespace      http://userscripts.org
// @description    Shortens really long property names in funnels on Mixpanel
// @include        http://mixpanel.com/report/*/funnels/detail/*
// ==/UserScript==

var props_dropdown = document.getElementById("props_dropdown");
var ul = props_dropdown.childNodes[3].childNodes[0].childNodes[1];

var MAX_LENGTH = 40;

setTimeout(trim, 100);
function trim() {
	for (i = 0; i < ul.childNodes.length; i++)
	{
		if (ul.childNodes[i].innerHTML.length > MAX_LENGTH)
			ul.childNodes[i].innerHTML = ul.childNodes[i].innerHTML.substring(0,MAX_LENGTH);
		
	}
}