// ==UserScript==
// @name            Billy Mission Hotkeys
// @namespace       Garyzx
// @include         http://*animecubed.com/billy/bvs/missions/mission*
// ==/UserScript==

function process_event(event) {
	if (event.keyCode==69){		//e
		var jutsu=document.forms.namedItem("attempt").elements;
		for(var i=0; i<jutsu.length; i++)
			if(jutsu[i].value==374)		//Escape jutsu
				jutsu[i].wrappedJSObject.click();
		document.forms.namedItem("attempt").wrappedJSObject.submit();	//Attempt mission
	}
	if (event.keyCode==77){		//m
		if(document.forms.namedItem("attempt"))
			document.forms.namedItem("attempt").wrappedJSObject.submit();	//Attempt mission
		else
			document.forms.namedItem("domission").wrappedJSObject.submit();	//New mission
	}
	if (event.keyCode==67)		//c
		document.forms.namedItem("chakra").wrappedJSObject.submit();	//Charge chakra
}

window.addEventListener("keyup", process_event, false);
