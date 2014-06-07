// ==UserScript==
// @name          NetSuite Bigger Email Message Area (2012.2)
// @namespace     http://userstyles.org
// @description	  Enlarges area for composing email message:
// @author        BenjaminJ
// @homepage      http://userstyles.org/styles/30687
// @include       https://system.netsuite.com/app/crm/common/merge/emailtemplate.nl*
// @include       https://system.netsuite.com/app/crm/common/merge/mailmerge.nl*
// @include       https://system.netsuite.com/app/crm/common/*
// @run-at        document-start
// @grant         none
// ==/UserScript==
(function() {
var css = "";
if (false || (document.location.href.indexOf("https://system.netsuite.com/app/crm/common/merge/emailtemplate.nl") == 0))
	css += "div#contenten_US_main {width: 800px !important;}\ndiv#contenten_US_editor {height: 700px !important;}\niframe#contenten_US_html {height: 700px !important;}\ndiv#template_div {height: 959px !important;}";
if (false || (document.location.href.indexOf("https://system.netsuite.com/app/crm/common/merge/mailmerge.nl") == 0))
	css += "div#ext-gen14 {width: 780px !important; height: 500px;}\ndiv#ext-comp-1007 {width: 776px;}\niframe#ext-gen55 {width: 800px !important; height: 476px;}\n.x-hide-display {display: table-cell !important;}";
if (false || (document.location.href.indexOf("https://system.netsuite.com/app/crm/common/") == 0))
	css += "div#message_main {width: 800px !important;}\niframe#message_html {height: 700px !important;}";
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
