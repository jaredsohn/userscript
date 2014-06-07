// ==UserScript==
// @name        Google Easter
// @namespace   http://google-blows.me
// @description Replaces the Cesar Chavez google logo with one that's more appropriate for Easter.
// @include     https://*.google.*/*
// @include     http://*.google.*/*
// @version     1
// ==/UserScript==


var loadingInstant = false;
var instantInterval = null;

function FixGoogleLogo() {
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
		GoogleLogo.innerHTML = '<img id="hplogo" src="http://img801.imageshack.us/img801/2228/googleeastereggs.jpg" style="width:450px;height:200px;margin-top:20px;margin-left:-25px" alt="" />';
	}

	if (searchLogo != null) {
		searchLogo.innerHTML = '<img id="gbqld" src="http://img801.imageshack.us/img801/2228/googleeastereggs.jpg" width="100" height="40" alt="">';
    }
}

window.addEventListener("hashchange", FixGoogleLogo, false);
if (window.location.hash != "") {
	loadingInstant = true;
	instantInterval = setInterval(FixGoogleLogo, 100);
}

FixGoogleLogo();