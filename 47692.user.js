// ==UserScript==

// @name           Facebook Remove People You Might Know 
// @namespace      http://userscripts.org
// @include        *facebook.com*

// @author	   Anette
// ==/UserScript==

function Remove_People_You_Might_Know() {

	var People_You_Might_Know = document.getElementById('pymk_hp_box');
	if (People_You_Might_Know) {
		People_You_Might_Know.parentNode.removeChild(People_You_Might_Know);
	}
}

document.addEventListener("DOMNodeInserted", Remove_People_You_Might_Know, true);