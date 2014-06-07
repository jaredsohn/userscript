// ==UserScript==
// @name           BVS Spy Script
// @namespace      Crlaozwyn
// @description    BvS Spy Script
// @include       http://www.animecubed.com/billy/bvs/villagespy*
// ==/UserScript==

function process_event(event) {
	if (event.keyCode==83){		
		if(document.forms.namedItem("lookinto"))
			document.forms.namedItem("lookinto").wrappedJSObject.submit();
		else if(document.forms.namedItem("spyatt"))
			document.forms.namedItem("spyatt").wrappedJSObject.submit();
		else
			document.forms.namedItem("spy").wrappedJSObject.submit();
	}
}

window.addEventListener("keydown", process_event, false);