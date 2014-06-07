// ==UserScript==
// @name           Jira new comment mover
// @namespace      http://lieschke.net/projects/greasemonkey
// @description    Moves the new comment field on Jira issues so it appears at the top of the comment list instead of at the bottom.
// @include        http*://jira/browse/*
// ==/UserScript==

(function () {
	document.getElementById('description-closed').parentNode.insertBefore(document.getElementById('commentDiv'), document.getElementById('description-closed'));
	document.getElementById('description-closed').parentNode.insertBefore(document.createElement('p'), document.getElementById('commentDiv'));
})();