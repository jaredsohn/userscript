// ==UserScript==
// @name           School For Adventurers Navigator
// @namespace      SFA-Navigator
// @include        http://schoolforadventurers.com/*/*/*.html
// @include        http://www.schoolforadventurers.com/*/*/*.html
// ==/UserScript==
window.onload=main()

function main() {
	normalJS(preparePages)
	normalJS("preparePages()")
	normalJS(keyboardNavigation)
	document.body.setAttribute('onkeydown', "keyboardNavigation(event)")
}

function normalJS(theScript) {
	document.body.appendChild(document.createElement("SCRIPT")).innerHTML=theScript
}

function preparePages() {
	pageLink = new Array ()
	if (document.getElementById("Map2Map")==null) mapName = new String ("Map2")
	else mapName = new String("Map2Map")
	for (i=0; i<document.getElementById(mapName).getElementsByTagName("area").length; i++) {
		t=document.getElementById(mapName).getElementsByTagName("area")[i].coords.split(",")
		if ( ((t[0] > 0)  && (t[0] < 30)) && ((t[1] > 0) && (t[1] < 30)) && ((t[2] > 485)  && (t[2] < 510)) && ((t[3] > 670)  && (t[3] < 700)) ) {
			pageLink[0]=document.getElementById(mapName).getElementsByTagName("area")[i];
			break;
		}
	}
	for (i=0; i<document.getElementById(mapName).getElementsByTagName("area").length; i++) {
		t=document.getElementById(mapName).getElementsByTagName("area")[i].coords.split(",")
		if ( ((t[0] > 490)  && (t[0] < 510)) && ((t[1] > 0) && (t[1] < 30)) && ((t[2] > 960)  && (t[2] < 990)) && ((t[3] > 670)  && (t[3] < 700)) ) {
			pageLink[1]=document.getElementById(mapName).getElementsByTagName("area")[i];
			break;
		}
	}
}

function keyboardNavigation(event) {
	if (!event) event=window.event
	if (event.keyCode == 37) {
		if (pageLink[0] != undefined) {
			if (pageLink[0].href != "") window.location=pageLink[0].href
		}
		else history.go(-1)
	}
	else if (event.keyCode == 39) {
		if (pageLink[1] != undefined) if (pageLink[1].href != "") window.location=pageLink[1].href
	}
}