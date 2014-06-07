// ==UserScript==
// @name          TwitterSidebar
// @namespace     http://userstyles.org
// @description	  How to... 
// @author        HannibalSmith
// @homepage      http://userstyles.org/styles/12893
// @include       http://twitter.com/home?small
// ==/UserScript==
(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml); h1#header, #navigation, .content-bubble-arrow, #side, table.get-started-steps, #footer, .bottom_nav { display: none !important; visibility: hidden !important;} #container, #content, #doingForm textarea, div.direct-message-box fieldset, .doing, #currently, .hentry td.status-body div, div#profilebox, div#profiletext { width: 190px !important; padding: 0 !important; margin: 0 !important;} #loader, #content.wide, ul#tabMenu li { width: 25% !important; padding: 0 !important; margin: 0 !important;} .wrapper { padding: 0 !important; margin: 0 !important;} #currently { margin: 10px !important; margin-bottom: -10px !important;}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
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
