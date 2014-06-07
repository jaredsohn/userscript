// ==UserScript==
// @name          Reddit pretty comment boxes
// @namespace url(http://www.w3.org/1999/xhtml);
// @description	  Modified version of kingping's "Reddit - Comment guide lines" (http://userstyles.org/styles/8804) 
// @author        Tiby312
// @include       http://reddit.com/*
// @include       https://reddit.com/*
// @include       http://*.reddit.com/*
// @include       https://*.reddit.com/*
// @run-at document-start
// ==/UserScript==
(function() {
var css = ".comment{"+
" 	 -moz-border-radius:7px !important;"+
" 	 -webkit-border-radius:7px !important;"+
"	margin-left:10px!important;"+
"	margin-right:310px!important;"+
"	margin-top:0px!important;"+
"	margin-bottom:8px!important;"+

"	background-color:#ffffff !important;"+
"	border:1px solid #bbbcbf !important;"+
"	padding-left:5px!important;"+
"	padding-top:5px!important;"+
"	padding-right:8px!important;"+
"	padding-bottom:0px!important;"+
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
"body > .content {"+ 
" padding-right:0px; !important;"; 
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
