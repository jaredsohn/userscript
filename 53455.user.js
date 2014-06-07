// ==UserScript==
// @name           Link opener
// @namespace      #aVg
// @include        *
// @version        0.1
// ==/UserScript==
var trigger = "G";
document.addEventListener("keydown", function(e) {
	if(e.ctrlKey && e.keyCode == trigger.toUpperCase().charCodeAt(0)) {
		GM_openInTab(unsafeWindow.getSelection().focusNode.nodeValue.replace(/^\s+|\s+$/g,""));
		e.preventDefault();
}
}, false);