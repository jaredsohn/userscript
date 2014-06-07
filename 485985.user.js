// ==UserScript==
// @name        WebChat for TPT Website
// @description Adds a webchat embedded window on the TPT website
// @namespace   wolfy1339.tk
// @author      wolfy1339
// @include     http://powdertoy.co.uk/Conversations.html
// @version     1.1
// @match       http://userscripts.org/scripts/show/485985
// @updateURL   https://userscripts.org/scripts/source/485985.meta.js
// @downloadURL   https://userscripts.org/scripts/source/485985.user.js
// ==/UserScript==

var enabled = true;
var warning = "<div class=\"alert alert-danger\" style=\"margin: 30px 0 0;\"><strong>Heads Up!</strong> This feature is currently under development, it is lacking in some functionality</div>";
var frame = "<iframe src=\"http://webchat.freenode.net?channels=powder,powder-social&uio=d4\" width=\"100%\" height=\"400\"></iframe>";
var element = document.createElement("div");

var init = function() {
    if(checkboxEnable) {
        createCheckBox();
    }
    if(enabled) {
        updateWindow(true);
	}
};
var updateWindow = function(toWhat) {
	if(toWhat) {
		document.getElementById("isEnabled").innerHTML = "Changing to frame!";
		document.getElementsByClassName("Subpage")[0].innerHTML = warning + "<br />" + frame;
	}
	else if(!toWhat) {
		location.reload(true); // If you don't want, then refresh.
	}
};
init();