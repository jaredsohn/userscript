// ==UserScript==
// @name           Zend Framework 2.0 documents code highlight
// @namespace      eva
// @include        http://packages.zendframework.com/docs/latest/manual/en/*
// @require       http://code.jquery.com/jquery-latest.min.js
// @require       http://alexgorbatchev.com/pub/sh/current/scripts/shCore.js
// @require       http://alexgorbatchev.com/pub/sh/current/scripts/shAutoloader.js
// @require       http://alexgorbatchev.com/pub/sh/current/scripts/shBrushPhp.js
// ==/UserScript==

var loadcss = function() {
	var len = arguments.length;
	var head = document.getElementsByTagName("head")[0];
	var css = document.createElement('link');
	css.type = 'text/css';
	css.rel = "stylesheet";
	for(var i = 0; i < len; i++) {
		css.href = arguments[i];
		head.appendChild(css);
	}
};

loadcss("http://alexgorbatchev.com/pub/sh/current/styles/shCore.css", "http://alexgorbatchev.com/pub/sh/current/styles/shThemeDefault.css");
jQuery(document).ready(function () {
	$("pre").addClass("brush: php;");
	SyntaxHighlighter.all();
});
