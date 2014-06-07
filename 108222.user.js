// ==UserScript==
// @name           Tumblr Left Sidebar
// @version        0.3
// @description    A sua sidebar agora do lado esquerdo.
// @author         BioNinja.com
// @namespace      http://www.bioninja.com
// @include        http://www.tumblr.com/dashboard*
// @include        http://www.tumblr.com/tumblelog*
// @include        http://www.tumblr.com/tagged*
// @include        http://www.tumblr.com/likes*
// @include        http://www.tumblr.com/inbox*
// @include        http://www.tumblr.com/blog*
// @exclude        http://www.tumblr.com/blog/*/new/*
// @exclude        http://www.tumblr.com/tumblelog/*/new/*
// @exclude        http://www.tumblr.com/new/blog*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js
// ==/UserScript==
/*

(C) 2011 Johnnie Walking Dead

*/
function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}
function main(){
	jQuery.noConflict();
	var left = jQuery("#left_column");
	var right = jQuery("#right_column");
	var pgntn = jQuery("#pagination");
	var addremove = jQuery(".add_and_remove");
	left.css("float", "right");
	right.css("float", "left");
	pgntn.css("padding-right", "15px");
	addremove.attr('href','/following');
}
var uagent = navigator.userAgent.toLowerCase();
if (uagent.search("firefox") > -1) main();
else addJQuery(main);