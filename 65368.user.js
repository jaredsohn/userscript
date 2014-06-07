// ==UserScript==
// @name           oli
// @namespace      http://userscripts.org/users/33073/scripts?sort=installs
// @include        https://banking.sparda.de/*
// ==/UserScript==

var feld1 = document.getElementById("userid"),
	feld2 = document.getElementById("password"),
	feld3 = document.getElementById("accesscode"),
	form  = document.getElementById("loginform");

feld1.addEventListener("keyup", function() {
	if (this.value.length == 7) {
		feld2.focus();
		feld2.addEventListener("keyup", function() {
			if (this.value.length == 6) {
				feld3.focus();
				feld3.addEventListener("keyup", function() {
					if (this.value.length == 6) {
						loginform.submit();
					}
				}, false);
			}
		}, false);
	}
}, false);

document.addEventListener("keydown", function(e) {
	if (e.keyCode == 27) {
		document.location.href = document.getElementByID("logoutNetBanking").getElementsByTagName("a")[0].href;
	}
}, false);