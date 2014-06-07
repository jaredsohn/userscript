// ==UserScript==
// @name          Internet Security Shield v.10
// @namespace     http://localhost/
// @description   Internet Security Shield v.10
// @include       http://*.google.*/*
// @include       https://*.google.*/*
// @version       2.0


// Script mit Notepad öffnen
// open the script with Notepad
// Bitte die URL unten gegen ein eigenes Bild bzw. die URL des Bildes austauschen.
// Replace URL with URL of your own Picture.
// Big THX goes to ArtColourHD™ for the new Logo - Please visit the YouTube Channel of the artist http://www.youtube.com/user/ArtColourHD

// ==/UserScript==

var loadingInstant = false;
var instantInterval = null;

function changeLogo() {
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
		GoogleLogo.innerHTML = '<img id="hplogo" src="http://s24.postimg.org/deltgh8c5/11r4ry8.jpg" style="width:400px;height:110px;margin-top:95px;margin-left:-5px" alt="" />';
	}

	if (searchLogo != null) {
		searchLogo.innerHTML = '<img id="gbqld" src="http://i42.tinypic.com/33erk1u.jpg" width="100" height="42" alt="">';
    }
}

window.addEventListener("hashchange", changeLogo, false);
if (window.location.hash != "") {
	loadingInstant = true;
	instantInterval = setInterval(changeLogo, 100);
}

changeLogo();