// ==UserScript==
// @name          Cleaner iGoogle with No Chat (3/15/2009)
// @namespace     http://userstyles.org
// @description   Cleans up iGoogle and hides iGoogle Chat box (designed especially for safari). Hides the footer and completely removes the Chat tab box. It also fades out the google search box and change themes links. 
// @author        eschultz
// @version       0.1 2009-03-15
// @include       http://www.google.com/ig*
// @include       https://www.google.com/ig*
// ==/UserScript==
(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml); #gbar, #guser, .gbh, #footerwrapinner, #signInBox, #talk_container, #tab_chat, #enable_chat { display: none!important;} #footerwrap { height: 25px; } #modules{ padding: 0 !important; width: 100% !important; } #guser { -moz-opacity: 0.25 !important; opacity: .25; font-size: 8pt !important; } .gb2 { -moz-opacity: 0.9 !important; opacity: .9; background-color: #FFFFFF !important; } .personalize_link { -moz-opacity: 0.25 !important; opacity: .25; font-size: 8pt !important; } .personalize_link:hover { -moz-opacity: 1 !important; opacity: 1; } .sandbox_msg { display:none !important; } #tabs { -moz-opacity: 0.25 !important; opacity: .25; } #tabs:hover { -moz-opacity: 1 !important; opacity: 1; } #gsea { -moz-opacity: 0.1 !important; opacity: .1; } #gsea:hover { -moz-opacity: .5 !important; opacity: .5; } .modbox { margin-top: 5px !important; margin-left: 4px !important; margin-right: 4px !important; margin-bottom: 4px !important;  } .modboxin { padding: 3px  !important; }";
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