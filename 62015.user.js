// ==UserScript==
// @name           New/Close Window Alert
// @namespace      http://axisofevil.net/~xtina/
// @description    Changes the cursor if a link or button opens or closes a window.
// @include        *
// ==/UserScript==

// Set the arrows.
var theOpen = "cursor: ne-resize;";
var theClose = "cursor: nw-resize;";

// The three types of links I know.
checkLink("a");
checkLink("input");
checkLink("button");

// The function for setting the attribute.
function checkLink(elm) {
	var theLinks = document.getElementsByTagName(elm);
	for (var x = 0; x < theLinks.length; x++) {
		// For target=_blank.
		if (theLinks[x].getAttribute("target") == "_blank") {
			document.getElementsByTagName(elm)[x].setAttribute("style", theOpen);
		}
		// For onClick.
		if (theLinks[x].getAttribute("onClick")) {
			// If it's opening a new window JSically.
			if (theLinks[x].getAttribute("onClick").indexOf("window.open") > -1) {
				document.getElementsByTagName(elm)[x].setAttribute("style", theOpen);
			// If it's closing a new window JSically.
			} else if (theLinks[x].getAttribute("onClick").indexOf("window.close") > -1) {
				document.getElementsByTagName(elm)[x].setAttribute("style", theClose);
			}
		}
	}
}
