// ==UserScript==
// @name           reddit.com - expanddit
// Description     Enable expando buttons with collapsed view.
// @namespace      v1
// @include        http://www.reddit.com/*
// @include        https://www.reddit.com/*
// ==/UserScript==

var css = document.createElement('style');
css.type = "text/css";
css.textContent = '\
	.compressed .expando-button {display:inline;background:none!important;height:13px;width:23px;margin:0;cursor:pointer;color:#888} \
	.compressed .expando-button.collapsed:before{content:"[+]"} \
	.compressed .expando-button.expanded:before{content:"[-]"} \
	.compressed .expando-button:hover{color:#00f}';
document.head.appendChild( css );


