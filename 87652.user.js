// ==UserScript==
// @name          Reddit Comment Boxes [Fixed Version]
// @namespace url(http://www.w3.org/1999/xhtml);
// @description	  Updated version of Tiby312's Reddit Comment Boxes script
// @author        ytknows
// @include       http*://*reddit.com/*
// @run-at document-start
// ==/UserScript==
(function() {
var css = ".comment{"+
" 	-moz-border-radius:7px !important;"+
" 	-webkit-border-radius:7px !important;"+
"	margin: 0px 8px 4px 8px !important;"+
"	background-color:#ffffff !important;"+
"	border:1px solid #bbbcbf !important;"+
"	padding:5px 5px 0px 5px !important;"+
"}"+
".comment .comment{"+
"	margin-right:0px!important;"+
"	background-color:#F7F7F8 !important;"+	
"}"+
".comment .comment .comment{"+
"	background-color:#ffffff !important;"+	
"}"+
".comment .comment .comment .comment{"+
"	background-color:#F7F7F8 !important;"+	
"}"+
".comment .comment .comment .comment .comment{"+
"	background-color:#ffffff !important;"+	
"}"+
".comment .comment .comment .comment .comment .comment{"+
"	background-color:#F7F7F8 !important;"+	
"}"+
".comment .comment .comment .comment .comment .comment .comment{"+
"	background-color:#ffffff !important;"+	
"}"+
".comment .comment .comment .comment .comment .comment .comment .comment{"+
"	background-color:#F7F7F8 !important;"+	
"}"+
".comment .comment .comment .comment .comment .comment .comment .comment .comment{"+
"	background-color:#ffffff !important;"+	
"}"+
".comment .comment .comment .comment .comment .comment .comment .comment .comment .comment{"+
"	background-color:#F7F7F8 !important;"+	
"}"+
".commentarea, .link, .comment {"+
"	overflow:hidden; !important;"+
"}"+
".comment .child {"+
"	border:none; !important;"+
"}"+
"body > .content {"+
" padding-right:0px; !important;"+
"}"; 

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
