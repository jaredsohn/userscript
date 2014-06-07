// ==UserScript==
// @name           BoyCj.com remove overlay
// @namespace      http://userscripts.org/users/429518
// @description    removes "down for maintenance" overlay from BoyCj.com
// @include        *boycj.com*
// ==/UserScript==


function Remove_boycj_overlay() {

	var overlayBoyCJ = document.getElementById('displaybox');
	if (overlayBoyCJ && overlayBoyCJ.style.visibility != 'hidden') { //Prevents the visibility from being set multiple times unnecessarily
		overlayBoyCJ.style.visibility = 'hidden';
	}

}

document.addEventListener("DOMNodeInserted", Remove_boycj_overlay, true);

