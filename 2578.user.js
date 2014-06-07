// ==UserScript==
// @name          S'occuper des verrats!
// @namespace     http://www.kochonland.com/gereaff_verrat.php
// @description	  Choisir la nourriture BT et remplir l'abreuvoir de tous les verrats
// ==/UserScript==

window.addEventListener("load", function(e) {
	GM_registerMenuCommand( "Remplir les mangeoires", remplirMangeoires, "m", "shift");
	GM_registerMenuCommand( "Remplir les abreuvoirs", remplirAbreuvoirs, "a", "shift");
	GM_registerMenuCommand( "Remplir les litiÃ¨res", remplirLitieres, "l", "shift");
	GM_registerMenuCommand( "PrÃ©lever la semence", preleverSemence, "s", "shift");
}, false);

function remplirMangeoires() {
	oSelects = document.getElementsByTagName('select');
	for (var i in oSelects) {
		j=1;
		if (oSelects[i].name != undefined) {
			if (oSelects[i].name.substr(0,5) == "nour_") {
				oSelects[i].selectedIndex = 2;
				unsafeWindow.addchecktnour(oSelects[i],j);
				j++;
			}
		}
	}
}

function remplirAbreuvoirs() {
	oInputs = document.getElementsByTagName('input');
	for (var i in oInputs) {
		if (oInputs[i].name != undefined) {
			if (oInputs[i].name.substr(0,4) == "eau_") {
				oInputs[i].checked = true;
				unsafeWindow.addcheck(oInputs[i]);
			}
		}
	}
}

function remplirLitieres() {
	oSelects = document.getElementsByTagName('select');
	for (var i in oSelects) {
		j=1;
		if (oSelects[i].name != undefined) {
			if (oSelects[i].name.substr(0,5) == "tacc_") {
				oSelects[i].selectedIndex = 1;
				unsafeWindow.addchecktacc(oSelects[i],j);
				j++;
			}
		}
	}
}

function preleverSemence() {
	oInputs = document.getElementsByTagName('input');
	for (var i in oInputs) {
		if (oInputs[i].name != undefined) {
			if (oInputs[i].name.substr(0,5) == "prel_") {
				oInputs[i].checked = true;
				unsafeWindow.addcheck(oInputs[i]);
			}
		}
	}
}
