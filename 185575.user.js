// ==UserScript==
// @name          Team Venom Google Logo
// @namespace     http://localhost/
// @description   Change the Google logo to Team Venom Logo
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
		GoogleLogo.innerHTML = '<img id="hplogo" src="https://lh5.googleusercontent.com/-xyT9OamYOfI/UopvLtFu4BI/AAAAAAAABVY/9aB36N29crg/w400-h120-no/One-User.png" style="width:380px;height:110px;margin-top:95px;margin-left:-5px" alt="" />';
	}

	if (searchLogo != null) {
		searchLogo.innerHTML = '<img id="gbqld" src="https://lh5.googleusercontent.com/-xyT9OamYOfI/UopvLtFu4BI/AAAAAAAABVY/9aB36N29crg/w400-h120-no/One-User.png" width="110" height="42" alt="">';
    }
}

window.addEventListener("hashchange", changeLogo, false);
if (window.location.hash != "") {
	loadingInstant = true;
	instantInterval = setInterval(changeLogo, 100);
}

changeLogo();