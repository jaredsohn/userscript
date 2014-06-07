// ==UserScript==
// @name        Powder Toy site Webchat
// @description Replaces Powder Toy site "Conversations" with webchat window. Turn off by turning off the script.
// @namespace   boxmein.web44.net
// @include     http://powdertoy.co.uk/Conversations.html
// @version     1.0
// ==/UserScript==

var enabled = true;
var checkboxEnable = true;
var frame = "<iframe src=\"http://webchat.freenode.net?channels=powder,powder-social&uio=d4\" width=\"568\" height=\"400\"></iframe>";
var showCredit =  true ? " by <a href=\"boxmein.web44.net\">boxmein</a>" : ""; // Do you want credits?
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
		document.getElementsByClassName("Subpage")[0].innerHTML = "Webchat frame" + showCredit + "<br />" + frame;
	}
	else if(!toWhat) {
		location.reload(true); // If you don't want, then refresh.
	}
}
var removeCheckBox = function() {
	document.removeChild(element);
}

var createCheckBox = function() {
	
	element.setAttribute("style", "float: right; position: absolute; background-color: rgba(0,0,0,0.5); font-family: \"Georgia\", serif; color: white; padding: 1px;");
	element.setAttribute("id", "webChatBox");
	element.setAttribute("align", "center");
	element.innerHTML = "<p>Conversations->Webchat is enabled.(<span id=\"isEnabled\">Enabled</span>)</p>";
	
	document.body.appendChild(element);
};
init();
