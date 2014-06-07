// ==UserScript==
// @name       Reddit new tab
// @namespace  http://ineentho.com/
// @version    0.1
// @description  Open all reddit links in a new tab instead of current window.
// @match      *://www.reddit.com/*
// @copyright  2013+, Ineentho
// ==/UserScript==

window.unsafeWindow || (
	unsafeWindow = (function() {
		var el = document.createElement('p');
		el.setAttribute('onclick', 'return window;');
		return el.onclick();
	}())
);

var $ = unsafeWindow.jQuery;
$(function(){
	$(".title").attr("target", "_blank");
});