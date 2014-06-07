// ==UserScript==
// @name           KoB FB link fix
// @namespace      http://kob.itch.com/
// @description    Changes KoB FB links in messages to regular KoB links
// @include        http://kob.itch.com/mcDetail.cfm*
// @developer      Hello71
// ==/UserScript==
/* === Config messages === */ {
var merror = "Fatal error converting KoB FB links: ";
var eerror = " Please report this to the developer.";
var nobind = merror + "Could not attach to window.onload event." + eerror;
/* === End config messages === */
}
/* === getElementsByClassName === */ {
/*
	Written by Jonathan Snook, http://www.snook.ca/jonathan
	Add-ons by Robert Nyman, http://www.robertnyman.com
*/

function getElementsByClassName(oElm, strTagName, strClassName){
	var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
	var arrReturnElements = new Array();
	strClassName = strClassName.replace(/\-/g, "\\-");
	var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
	var oElement;
	for(var i=0; i<arrElements.length; i++){
		oElement = arrElements[i];
		if(oRegExp.test(oElement.className)){
			arrReturnElements.push(oElement);
		}
	}
	return (arrReturnElements)
}
/* === End getElementsByClassName === */
}
function startReplace() {
	var elms = getElementsByClassName(document.body, "table", "messageOutline");
	var elm = elms[0];
	elm.innerHTML = elm.innerHTML.replace("http://kobfb.itch.com/", "http://kob.itch.com/");
}
if (window.addEventListener) { //Mozilla-based
	window.addEventListener("load", startReplace, false);
} else if (window.attachEvent) {
	window.attachEvent("load", startReplace);
} else {
	alert(nobind);
}