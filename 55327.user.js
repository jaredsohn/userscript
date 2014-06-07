// ==UserScript==
// @name           BvS Arena Hotkeys
// @namespace      CampSoup1988
// @description    BvS Arena Hotkeys
// @include        http://*animecubed.com/billy/bvs/arena.*
// ==/UserScript==

function process_event(event) {
	if (event.keyCode==80){		//Purchase Fights
		document.forms.namedItem("buyfights").submit();		//Purchase Fights
	}

	if (event.keyCode==65)		//Attack a Ninja
		document.forms.namedItem("arenafight").submit();	//Attack a Ninja
	}

window.addEventListener("keyup", process_event, false);