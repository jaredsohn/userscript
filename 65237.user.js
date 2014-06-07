// ==UserScript==
// @name           BvS RNG Ping
// @namespace      Ranatama
// @description    Quick script to ping for RNG (press P)
// @include        http://*animecubed.com/billy/bvs/villagefields*
// ==/UserScript==

function process_event(event) {
	if (event.keyCode==80){		//p
		
		document.forms.namedItem("keychainping").wrappedJSObject.submit();

	//Attempt to ping
	}
}

window.addEventListener("keyup", process_event, false);
