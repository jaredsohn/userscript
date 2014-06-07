// ==UserScript==
// @name           Disable Textarea Keyboard Shortcuts
// @namespace      http://www.onfocus.com/
// @description    Disables the keyboard shortcuts in textareas.
// @include        http://*.metafilter.com*
// ==/UserScript==

(function(){
	var script = document.createElement("script");
	script.type = "application/javascript";
	script.innerHTML = "$(function(){$('#comment').unbind();});";
	document.body.appendChild(script);
})();