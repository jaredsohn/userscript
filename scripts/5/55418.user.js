// ==UserScript==
// @name          Un-Biased Forum Reader
// @namespace     Bungie.net
// @description	  Removes all "ranks" formatting and user avatars
// @author        x647
// @include       http://bungie.net/Forums/*
// @include       http://*.bungie.net/Forums/*
// ==/UserScript==
(function() {
var css = "ul.author_header_block li.title { visibility: hidden !important;}\ndiv.forumpost div.forumavatar img { visibility: hidden !important;  background-color:blue !important; width:0px !important;}\ndiv.forumpost div.post-actions ul li.date { visibility: hidden !important;}\ndiv.forumpost ul.author_header_block li.login { visibility: hidden !important;}\ndiv.forumpost ul.author_header_block li { visibility: hidden !important;}\ndiv.forumpost ul.author_header_block { background-color:grey !important; border:1px solid black !important; width:1000px !important; float: none !important; margin-left:0px !important;}\ndiv.forumpost p { color: grey !important; float:left !important; }\ndiv.forumpost div.postbody {float: left !important;  height:100% !important; width:500px !important; }";
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
