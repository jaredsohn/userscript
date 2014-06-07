// ==UserScript==
// @name           Fix Slashdot April 1st 2007
// @namespace      none
// @description    Slashdot has a digg-like counter up for April fools day. Remove it.
// @include        http://slashdot.com/*
// @include        http://www.slashdot.com/*
// @include        http://slashdot.org/*
// @include        http://www.slashdot.com/*
// ==/UserScript==

var vecDivs = document.getElementsByTagName('div');
for (indx=0; indx<vecDivs.length; indx++) {
	if (vecDivs[indx].className == 'intro') {
		var vecNodes = vecDivs[indx].childNodes;
		for (node=0; node<vecNodes.length; node++) {
			if (vecNodes[node].nodeName == 'TABLE') {
				vecNodes[node].innerHTML = '';
				break;
			}
		}
	}
}
