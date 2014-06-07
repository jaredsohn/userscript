// ==UserScript==
// @name           OneDDL Ad Remover
// @namespace      http://userscripts.org/users/kaotix
// @description    Removes ads from new OneDDL layout
// @include        *oneddl.com*
// ==/UserScript==

function removeAds() {

	var horiz_ads = document.getElementById('advertisment-horizontal');
	if (horiz_ads && horiz_ads.style.visibility != 'hidden') {
		horiz_ads.style.visibility = 'hidden';
	}
	
	var before1 = document.getElementById('before-content');
	before1.parentNode.removeChild(before1);
	if (before1 && before1.style.visibility != 'hidden') {
		before1.style.visibility = 'hidden';
	}
	
	var container = document.getElementById('container');
	container.style.marginTop = '10px';
	
	var secondary = document.getElementById('secondary');
	secondary.style.marginTop = '10px';
	
	var rightad = document.getElementById('advertisment-3');
	if (rightad && rightad.style.visibility != 'hidden') {
		rightad.style.visibility = 'hidden';
	}

}

document.addEventListener("DOMNodeInserted", removeAds, true);