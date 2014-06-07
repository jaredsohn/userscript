// ==UserScript==
// @name          Hi5 Picture Unlocker
// @namespace 
// @description	 This Script Help you to remove lock of Hi5. Now you can Right click on picture and save sa picture.
// @include       http://*hi5.com/friend/photos/*
// ==/UserScript==


var afx007 = document.getElementById('Photos-ViewPhoto-ClickOverlay');
if (afx007) {
	afx007.parentNode.removeChild(afx007);
}