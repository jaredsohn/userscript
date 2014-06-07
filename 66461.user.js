// ==UserScript==
// @name            Auto-FA-Annehmer/Ablehner
// @namespace       http://www.brainhacker.de
// @description     Nimmt Freundschaftseinladungen in den VZs automatisch an oder ab, wenn man auf der Bestätigungsseite auf den entsprechenden Link klickt.
// @author          Lukas Heblik
// @date            2010-1-14
// @include         http://www.schuelervz.net*
// @include         http://schuelervz.net*
// @include         https://www.schuelervz.net*
// @include         https://schuelervz.net*
// @include         https://secure.schuelervz.net*
// @include         http://www.studivz.net*
// @include         http://studivz.net*
// @include         https://www.studivz.net*
// @include         https://studivz.net*
// @include         https://secure.studivz.net*
// @include         http://www.meinvz.net*
// @include         http://meinvz.net*
// @include         https://www.meinvz.net*
// @include         https://meinvz.net*
// @include         https://secure.meinvz.net*
// ==/UserScript==

// Copyright by Lukas Heblik
// http://www.brainhacker.de

if (location.href.indexOf("Friends/ConfirmInvite") > -1) {

	function acceptAll () {
		if (confirm("Willst du wirklich alle Freundschaften automatisch annehmen lassen ?") == true) {
			GM_setValue("acceptAll_active", 1);
			location.reload();
		}
	}
	function denyAll () {
		if (confirm("Willst du wirklich alle Freundschaften automatisch ablehnen lassen ?") == true) {
			GM_setValue("denyAll_active", 1);
			location.reload();
		}
	}

	if(document.getElementsByName("confirm")[0]) {
		var box = document.getElementById("Mod-Friends-Confirm-Invite");
		var link = document.createElement("a");
		link.addEventListener("click", function(){acceptAll()}, true);
		link.href = "#";
		link.innerHTML = "Alle bestätigen ";
		box.getElementsByTagName("p")[0].appendChild(link);
		var text = document.createElement("span");
		text.innerHTML = " oder ";
		box.getElementsByTagName("p")[0].appendChild(text)
		var link2 = document.createElement("a");
		link2.addEventListener("click", function(){denyAll()}, true);
		link2.href = "#";
		link2.innerHTML = " Alle ablehnen";
		box.getElementsByTagName("p")[0].appendChild(link2);
	}
	if (GM_getValue("acceptAll_active") == 1) {
		if (!document.getElementsByName("confirm")[1]) {
				GM_setValue("acceptAll_active", 0);
		}
		document.getElementsByName("confirm")[0].click();
	}
	if (GM_getValue("denyAll_active") == 1) {
		if (!document.getElementsByName("decline")[1]) {
				GM_setValue("denyAll_active", 0);
		}
		document.getElementsByName("decline")[0].click();
	}
}