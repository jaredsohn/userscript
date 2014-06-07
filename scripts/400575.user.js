// ==UserScript==
// @name          Bubblers 
// @namespace     http://localhost/
// @description   Google Logo mit beliebigem Bild ersetzen
// @include       http://*.bubblews.*/*
// @include       https://*.bubblews.*/*
// @version       2.0

// ==/UserScript==

var loadingInstant = false;
var instantInterval = null;

function changeLogo() {
	var GoogleLogo = document.getElementById("logo");
	var searchLogo = document.getElementById("gogo");
	if (loadingInstant) {
		if (document.getElementById("sfcnt") == null) {
			return;

		}
		clearInterval(instantInterval);
		loadingInstant = false;
	}

	if (GoogleLogo != null) {
		GoogleLogo.innerHTML = '<img id="logo" src="http://s9.postimg.org/b0xd0sqhr/logo.png" width="185" height="120" alt=""/>';
	}

	if (searchLogo != null) {
		searchLogo.innerHTML = '<img id="logo" src="http://i.imgur.com/nqkETKc.png" width="180" height="100" alt="">';
    
    }
}

window.addEventListener("hashchange", changeLogo, false);
if (window.location.hash != "") {
	loadingInstant = true;
    document.bgColor="181818"
    document.fgColor="181818"
    document.body.style.backgroundColor="181818";
	instantInterval = setInterval(changeLogo, 100);
    
}

changeLogo();