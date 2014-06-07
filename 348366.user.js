// ==UserScript==
// @name          Change Google Logo Fixed
// @namespace     http://localhost/
// @include       http://*.google.*/*
// @include       https://*.google.*/*
// @version       0.1


// Open the script with Notepad
// Replace URL with URL of your own Picture.

// ==/UserScript==

var loadingInstant = false;
var instantInterval = null;

function changeLogo() {
	var GoogleLogo = document.getElementById("lga");
	var searchLogo = document.getElementById("gbq1");
	if (loadingInstant) {
		if (document.getElementById("sfcnt") == null) {
			return;

		}
		clearInterval(instantInterval);
		loadingInstant = false;
	}

	if (GoogleLogo != null) {
		GoogleLogo.innerHTML = '<img id="hplogo" src="http://upload.wikimedia.org/wikipedia/commons/a/aa/Logo_Google_2013_Official.svg" style="width:200px;height:200px;margin-top:0px;margin-left:-5px" alt="" />';
	}

	if (searchLogo != null) {
        searchLogo.innerHTML = '<img id="gb_oa" src="http://upload.wikimedia.org/wikipedia/commons/a/aa/Logo_Google_2013_Official.svg" style="width=:100px;height:42px;margin-top:7px;" alt="" />';
    }
}

window.addEventListener("hashchange", changeLogo, false);
if (window.location.hash != "") {
	loadingInstant = true;
	instantInterval = setInterval(changeLogo, 100);
}

changeLogo();