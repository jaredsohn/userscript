// ==UserScript==
// @name           Google Cache Links
// @namespace      DrNick
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @include        https://www.google.com/search*
// @include        http://www.google.com/search*
// ==/UserScript==

var baseURL = "http://webcache.googleusercontent.com/search?ie=UTF-8&q=cache:";
var textOnly = "&strip=1";
var style = "color: #666fcc; padding-left: 0em";

$("#search li").each(function() {
	var a = $("a:first", this);
	a.removeAttr("onmousedown");
	a.unbind();
	
	var href = a.attr("href");
	
	var box = $("<span></span>");
	
	var cache = $("<a>Cached</a>").attr(
		{ href: baseURL + href, style: style }
	);
	
	box.append(" - ");
	box.append(cache);
	
	$("div.s > div:first", this).append(box);
});