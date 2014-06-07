// ==UserScript==
// @name          Change Google Logo
// @namespace     http://codymkw.tk
// @description   Change Google's Logo 
// @include       http://*.google.*/*
// @include       https://*.google.*/*
// @version       1.0
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
		GoogleLogo.innerHTML = '<img id="hplogo" src="http://i1181.photobucket.com/albums/x429/codybb1/google%20logos/codyscustomgooglelogo_zps81836791.jpg" style="width:400px;height:110px;margin-top:95px;margin-left:-5px" alt="" />';
	}

	if (searchLogo != null) {
		logo11w.innerHTML = '<img id="logo11w" src="http://i1181.photobucket.com/albums/x429/codybb1/google%20logos/google_zps87dc41f9.png" width="100" height="42" alt="">';
    }
}

window.addEventListener("hashchange", changeLogo, false);
if (window.location.hash != "") {
	loadingInstant = true;
	instantInterval = setInterval(changeLogo, 100);
}

changeLogo();