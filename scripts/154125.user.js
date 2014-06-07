// ==UserScript==
// @name        Hatena Bookmark Readability Script V3
// @namespace   HBRS
// @description はてなブックマークを読みやすくするスクリプト
// @include     http://b.hatena.ne.jp/entrylist?threshold*
// @version     1
// ==/UserScript==
(function () {
	var styles = new String();
	styles += "#total,#branding h1 img,#header-space,.box4{display: none;}";
	styles += ".top{display: block;}";	
	styles += "div#branding form{top:-32px;z-index:1100;left:0;}";
	styles += "div#branding {height: 5px;}";
	styles += "ul#navi-page{width: 100%;padding: 0; margin-bottom:5px;}";
	styles += "div#main{width:75%}";
	styles += "@media screen and (max-width: 960px){div#main{width:100%}}";
	styles += "div.box-wrap{width:100%;}";
	styles += "ul.entry-vertical-4{background-image:none;}";
	styles += "ul.entry-vertical-4 li.entry-unit, ul.entry-vertical-4 li.ad-unit{-moz-box-sizing:border-box;-webkit-box-sizing:border-box;width:100%;margin:0;padding:0 10px 2px;}";
	styles += "ul.entry-vertical-4 div.entry-contents h3{font-size:26px;line-height:1.3;}";
	styles += "ul.entry-vertical-4 div.entry-contents blockquote{font-size:15px;line-height:1.5;}";
	styles += "ul.entry-vertical-4 div.entry-contents h3{min-height:68px;}";

	var heads  = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(styles));
		heads[0].appendChild(node); 
	}
}) ();
