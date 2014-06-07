// ==UserScript==
// @name	Devils Google
// @description	Go Devils!
// @version	1.0
// @namespace	Devils
// @author	me
// @updateURL	
// @include	http*://www.google.*/webhp?*
// @include	http*://www.google.*/search?*
// @include	http*://www.google.*/ig?*
// @include	http*://www.google.*/imghp?*
// @include	http*://www.google.*/
// @include	http*://www.google.*/#*
// @include	https://encrypted.google.*/webhp?*
// @include	https://encrypted.google.*/search?*
// @include	https://encrypted.google.*/ig?*
// @include	https*://encrypted.google.*/imghp?*
// @include	https://encrypted.google.*/
// @include	https://encrypted.google.*/#*
// @include	http*://ipv6.google.*/
// @exclude	http*://www.google.*/pacman/
// ==/UserScript==

var loadingInstant = false;
var instantInterval = null;

function NewJersey() {
	var GoogleLogo = document.getElementById("lga");
	var searchLogo = document.getElementById("gbqlw");
	if (loadingInstant) {
		if (document.getElementById("sfcnt") == null) {
			return;

		}
		clearInterval(instantInterval);
		loadingInstant = false;
	}

	if (GoogleLogo != null) {
		GoogleLogo.innerHTML = '<img id="hplogo" src="http://s2.postimage.org/npzjjho1z/devils.png" style="width:551px;height:234px;margin-top:-7px;margin-left:1px" alt="" />';
	}

	if (searchLogo != null) {
		searchLogo.innerHTML = '<img id="gbqld" src="http://s2.postimage.org/npzjjho1z/devils.png" width="114" height="48" alt="">';
    }
}

window.addEventListener("hashchange", NewJersey, false);
if (window.location.hash != "") {
	loadingInstant = true;
	instantInterval = setInterval(NewJersey, 100);
}

NewJersey();