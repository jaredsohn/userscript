// ==UserScript==
// @name         EXO Google
// @description  Paracoded from http://userscripts.org/scripts/show/81288
// @include      http://*.google.*/*
// @include      https://*.google.*/*

// ==/UserScript==

var loadingInstant = false;
var instantInterval = null;

function TPC() {
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
		GoogleLogo.innerHTML = '<img id="hplogo" src="http://static.tumblr.com/ihuhmuz/21smdnuo3/exo_logo.png" style="width:150px;height:150px;margin-top:70px;margin-left:1px" alt="" />';
	}

	if (searchLogo != null) {
		searchLogo.innerHTML = '<img id="gbqld" src="http://static.tumblr.com/ihuhmuz/21smdnuo3/exo_logo.png" width="48" margin-left:33px height="48" alt="">';
    }
}

window.addEventListener("hashchange", TwentyPercentCooler, false);
if (window.location.hash != "") {
	loadingInstant = true;
	instantInterval = setInterval(TwentyPercentCooler, 100);
}

TPC();