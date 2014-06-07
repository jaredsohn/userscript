// ==UserScript==
// @name	Facebook: Clean Groups
// @description	Hide pointless stuff in Facebook groups (header, sidebar) and keep the search field always visible
// @version	1.14
// @match	*://*.facebook.com/*
// @namespace	http://userscripts.org/scripts/show/131762
// @downloadURL	https://userscripts.org/scripts/source/131762.user.js
// @run-at	document-start
//
// @date	2012-04-25
// @copyright	2012+, http://bfred.it
// @license	GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==
var css =
".groupsCoverPhoto,#facebook .groupJumpLayout #rightCol,.groupNotificationsSelector .uiButtonText,.groupsJumpSearchButton,.groupWideSearchBoxWrapper{	display: none !important;}#facebook form.groupsJumpHeaderSearch{	display: block !important;	position: static;}.groupJumpLayout.hasRightCol #contentArea,.groupJumpLayout .uiList{	width: auto !important; }.groupJumpLayout #headerArea{	padding-top: 0;}";
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