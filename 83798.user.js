// ==UserScript==
// @name	         Leaner GMail
// @description	Brings the focus back to the inbox
// @author	      George Palmer (http://rowtheboat.com)
// @include	      http://mail.google.com/*
// @include	      https://mail.google.com/*
// @include	      http://*.mail.google.com/*
// @include	      https://*.mail.google.com/*
// ==/UserScript==

/*
Notes on CSS changed:
.CX                              Mail/Contacts
.T4                              Tasks
.T0                              Invite a friend and messenger
.J-Pm-I                          Select All/None tickbox
.ov .nH .mn                      Tips in page footer
.no .nn table tr td.bM > div:last-child   Search the web Button
table.iY > tr > td:last-child    Adverts
.q0CeU, .q0CeU .n                Make inbox area complete inside window rather than keep going to edge
*/

(function(){
var css = css = ".CX, .T0, .T4, .J-Pm-I, .ov .nH .mn, .no .nn table tr td.bM > div:last-child, table.iY > tr > td:last-child { display: none !important;} .q0CeU, .q0CeU .n {margin-right:5px;}";

if (typeof GM_addStyle != "undefined"){
	GM_addStyle(css);
} else if (typeof addStyle != "undefined"){
	addStyle(css);
} else{
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0){
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();