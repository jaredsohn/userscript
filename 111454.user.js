// ==UserScript==
// @name           Google Improvements
// @namespace      http://userscripts.org/users/125059
// @description    Includes a variety of styling improvements for Google sites
// @include        http://*google.com/*
// @include        https://*google.com/*
// ==/UserScript==
(function() {

//default larger G-Chat box in Gmail
var largerGoogleChatBox = "html body div.dw div div.nH div.nH div.no div.nn:not(:empty) { width:400px !important; margin-right:5px; }"
		+ "html body div.dw div div.nH div.nH div.no div.nH div.no div.nH div.AD div.nH div.nH div.nH div.nH div.ko { min-height:250px !important; }";

//get rid of Google search when results are clicked
var disableSearchPopup = "#cnt.vsh #ires div.vsc:hover > .vspi, #ires div.vso > .vspi, #cnt.vsh #rhs div.vsc:hover > .vspi, #rhs div.vso > .vspi {"
		+ "background: none !important; border: none !important; }"
		+ "#botstuff { display: none !important; }"
		+ ".vspib { background-position: -19px -213px !important; }";

// the nav bar in Google image search was overlaying WSP
var googleSearchBar = ".tphdr { z-index: 100 !important; }";

//style the GV text box so I know how close I am to a full text (160 chars)
var googleVoiceTextBox = ".gc-message-sms-reply textarea { width: 1115px !important; font-family: monospace !important; }";

var css = largerGoogleChatBox + disableSearchPopup + googleSearchBar + googleVoiceTextBox;

if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();