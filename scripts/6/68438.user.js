// ==UserScript==
// @name           Google Docs strikeout keyboard shortcut
// @description    Adds a keyboard shortcut for strikeout
// @namespace      http://userscripts.org/scripts/review/68438
// @include        http*://docs.google.com/*
// ==/UserScript==

(function() {

document.addEventListener('keydown', function(e){
		if(e.which == 113) {
			replaceSelection();
			return false;
		}
	}, true);
})();

function replaceSelection() {
	var t = window.getSelection().toString();
	if (t == '') { return false; }
	var range = window.getSelection().getRangeAt(0);
	range.deleteContents();
	var newNode = document.createElement("strike");
	newNode.appendChild(document.createTextNode(t));
	range.insertNode(newNode);
}

